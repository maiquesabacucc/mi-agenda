// Envía al móvil los avisos de Mi Agenda y enciende el despertador de luz. Lo ejecuta GitHub Actions
// cada 10 minutos (.github/workflows/avisos.yml).
// La app prepara la lista (users/<tú>/private/pushPlan); aquí solo se hace cada cosa a su hora, una sola vez.
// El repositorio es público y sus registros también: no se escribe en ellos nada de tu agenda.
const admin = require('firebase-admin');
const webpush = require('web-push');

const VAPID_PUBLIC = 'BPk4Y2G_EssfIHo-tZOb2UlaFjN0VR5h6aFy-UiWE-Xo-H1-m3elCdkLiMDRqYKNLUMcDnrb136j2L8PsjdodfE';
const SITE = 'https://maiquesabacucc.github.io/mi-agenda/';
const GOVEE = 'https://openapi.api.govee.com/router/api/v1';
const WINDOW = 13 * 60e3;          // cada ejecución se encarga de los próximos 13 minutos
const sleep = ms => new Promise(r => setTimeout(r, Math.max(0, ms)));

async function main() {
  const sa = process.env.FIREBASE_SERVICE_ACCOUNT, priv = process.env.VAPID_PRIVATE_KEY;
  if (!sa || !priv) { console.log('::warning::Faltan los secretos FIREBASE_SERVICE_ACCOUNT o VAPID_PRIVATE_KEY: no se envía nada.'); return; }
  admin.initializeApp({ credential: admin.credential.cert(JSON.parse(sa)) });
  webpush.setVapidDetails(SITE, VAPID_PUBLIC, priv.trim());
  const db = admin.firestore();

  const owner = (await db.doc('config/owner').get()).get('uid');
  if (!owner) { console.log('La agenda aún no tiene cuenta.'); return; }
  const user = db.collection('users').doc(owner);
  if (!goveeKey) goveeKey = String((await user.collection('private').doc('govee').get()).get('key') || '').trim();
  const until = Date.now() + WINDOW, handled = new Set();
  let sent = 0;

  for (;;) {
    // Se vuelve a leer en cada vuelta: si cambias algo en la app, el aviso cambia o desaparece
    const items = (await user.collection('private').doc('pushPlan').get()).get('items') || [];
    const now = Date.now();
    const pushes = items.filter(x => x.kind !== 'luz'), lights = items.filter(x => x.kind === 'luz');
    // La alarma real de esta noche (la pone el atajo al acostarte): el resumen de la mañana sale a esa hora
    // y, con la bombilla conectada, el amanecer acaba justo entonces
    const alarms = await realAlarms(user);
    const sun = (await user.collection('private').doc('sunrise').get()).data() || {};
    for (const [day, ms] of Object.entries(alarms)) {
      const m = pushes.find(x => x.id === `m-${day}`);
      if (m) { m.at = ms; m.exp = ms + 2 * 3600e3; }
      if (sun.on) lights.push({ id: `luz-${day}`, kind: 'luz', at: ms - (Number(sun.minutes) || 30) * 60e3, end: ms, exp: ms + 20 * 60e3 });
    }

    for (const it of pushes.filter(x => !handled.has(x.id) && x.at <= now && x.exp > now)) {
      handled.add(it.id);
      if (await sendOnce(user, it)) sent++;
    }
    const lit = lights.filter(x => x.at <= now && now < x.exp);
    for (const l of lit) await sunriseStep(user, l, now);

    if (Date.now() > until) break;
    const next = [...pushes.filter(x => !handled.has(x.id) && x.at > now && x.exp > now), ...lights.filter(x => x.at > now)]
      .map(x => x.at).sort((a, b) => a - b)[0];
    if (!lit.length && (!next || next > until)) break;
    await sleep(lit.length ? 60e3 : Math.min(next - Date.now(), 60e3));
  }
  await cleanup(user);
  console.log(`Avisos enviados en esta ejecución: ${sent}`);
}

// Cada cosa hecha deja una marca; si otra ejecución ya la hizo, la marca existe y no se repite
async function markOnce(user, id, at) {
  try { await user.collection('pushLog').doc(id).create({ at, sent: Date.now() }); return true; }
  catch { return false; }
}

async function sendOnce(user, it) {
  if (!await markOnce(user, it.id, it.at)) return false;
  const subs = await user.collection('push').get();
  const payload = JSON.stringify({ title: it.title, body: it.body, url: it.url || './', tag: it.id });
  let ok = false;
  await Promise.all(subs.docs.map(async d => {
    const s = d.data();
    try {
      await webpush.sendNotification({ endpoint: s.endpoint, keys: s.keys }, payload, { TTL: 3600, urgency: 'high' });
      ok = true;
    } catch (e) {
      // El dispositivo ya no acepta avisos (app borrada o permiso quitado): se olvida
      if (e.statusCode === 404 || e.statusCode === 410) await d.ref.delete();
      else console.log('Un dispositivo no ha aceptado el aviso. Código:', e.statusCode || e.code || 'desconocido');
    }
  }));
  return ok;
}

/* ---------- la alarma real de cada noche ---------- */
// El atajo «Me voy a dormir» deja "clave|dormir|<fecha ISO con su zona horaria>|HH:MM" en el buzón;
// si la app ya lo ha recogido, está en "sleep/<día en que te levantas>". Se devuelve { día: momento de la alarma }.
const pad2 = n => String(n).padStart(2, '0');
function alarmMoment(bedIso, hhmm) {
  const m = String(bedIso || '').match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):\d{2}(?::\d{2}(?:\.\d+)?)?(Z|[+-]\d{2}:?\d{2})$/);
  const t = String(hhmm || '').match(/(\d{1,2}):(\d{2})/);
  if (!m || !t) return null;
  const zone = m[5] === 'Z' ? 'Z' : m[5].replace(/^([+-]\d{2})(\d{2})$/, '$1:$2');
  const base = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]) + (Number(m[4]) >= 12 ? 1 : 0)));
  const day = `${base.getUTCFullYear()}-${pad2(base.getUTCMonth() + 1)}-${pad2(base.getUTCDate())}`;
  const ms = Date.parse(`${day}T${pad2(t[1])}:${t[2]}:00${zone}`);
  return isNaN(ms) ? null : { day, ms };
}
async function realAlarms(user) {
  const out = {}, now = Date.now();
  // Las pruebas del atajo («Probar el atajo ahora» en la app) no son noches de verdad
  const test = Number((await user.collection('private').doc('sunrise').get()).get('testShortcut')) || 0;
  const add = (bed, alarm) => {
    const b = Date.parse(bed);
    if (test && b > test - 60e3 && b < test + 20 * 60e3) return;
    const a = alarmMoment(bed, alarm);
    if (a && a.ms > now - 6 * 3600e3 && a.ms < now + 20 * 3600e3) out[a.day] = a.ms;
  };
  (await user.collection('inbox').get()).docs.forEach(d => {
    const p = String(d.get('raw') || '').split('|');
    if (p[1] === 'dormir') add(p[2], p[3]);
  });
  // La app guarda la fecha en UTC: se le pone la zona de la propia alarma con la hora de Madrid como referencia
  (await user.collection('sleep').get()).docs.forEach(d => {
    const bed = d.get('bed'), alarm = d.get('alarm');
    if (out[d.id] || !bed || !alarm) return;
    const local = new Date(bed).toLocaleString('sv-SE', { timeZone: 'Europe/Madrid' }).replace(' ', 'T');
    const offset = madridOffset(new Date(bed));
    add(`${local}${offset}`, alarm);
  });
  return out;
}
function madridOffset(date) {
  const p = new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Madrid', timeZoneName: 'longOffset' }).formatToParts(date).find(x => x.type === 'timeZoneName');
  const m = p && p.value.match(/GMT([+-]\d{2}):?(\d{2})?/);
  return m ? `${m[1]}:${m[2] || '00'}` : '+01:00';
}

/* ---------- despertador de luz (bombilla Govee) ---------- */
let goveeLamp;   // la bombilla, buscada una vez por ejecución
let goveeKey = (process.env.GOVEE_API_KEY || '').trim();   // o la que pegaste en la app (private/govee)
async function govee(path, body) {
  const key = goveeKey;
  const res = await fetch(GOVEE + path, {
    method: body ? 'POST' : 'GET',
    headers: { 'Govee-API-Key': key, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || (json.code && json.code !== 200)) throw new Error(`Govee respondió ${res.status} ${json.code || ''}`.trim());
  return json;
}
async function findLamp() {
  if (goveeLamp !== undefined) return goveeLamp;
  goveeLamp = null;
  if (!goveeKey) { console.log('No hay ninguna bombilla conectada: el amanecer no se enciende.'); return null; }
  const list = (await govee('/user/devices')).data || [];
  const cap = (d, inst) => (d.capabilities || []).find(c => c.instance === inst);
  const d = list.find(x => cap(x, 'brightness') && cap(x, 'colorTemperatureK'));
  if (!d) { console.log('No se ha encontrado ninguna bombilla con luz blanca regulable en la cuenta de Govee.'); return null; }
  const range = (cap(d, 'colorTemperatureK').parameters || {}).range || {};
  goveeLamp = { sku: d.sku, device: d.device, kMin: Math.max(range.min || 2700, 2000), kMax: range.max || 6500 };
  return goveeLamp;
}
const control = (lamp, type, instance, value) =>
  govee('/device/control', { requestId: `${Date.now()}-${instance}`, payload: { sku: lamp.sku, device: lamp.device, capability: { type, instance, value } } });
async function lampIsOn(lamp) {
  const st = await govee('/device/state', { requestId: `${Date.now()}-state`, payload: { sku: lamp.sku, device: lamp.device } });
  const p = ((st.payload || {}).capabilities || []).find(c => c.instance === 'powerSwitch');
  return !p || !p.state || p.state.value !== 0;
}
// Un paso del amanecer: del 1 % muy cálido al 100 % neutro, subiendo despacio al principio como el sol
async function sunriseStep(user, l, now) {
  try {
    const lamp = await findLamp();
    if (!lamp) return;
    const log = user.collection('pushLog');
    if ((await log.doc(l.id + '-fin').get()).exists) return;
    const p = Math.min(1, Math.max(0, (now - l.at) / (l.end - l.at)));
    const kEnd = Math.min(4000, lamp.kMax);
    const bright = Math.max(1, Math.round(1 + 99 * Math.pow(p, 1.7)));
    const kelvin = Math.round(lamp.kMin + (kEnd - lamp.kMin) * p);
    if (await markOnce(user, l.id + '-on', l.at)) {
      await control(lamp, 'devices.capabilities.range', 'brightness', 1);
      await control(lamp, 'devices.capabilities.color_setting', 'colorTemperatureK', lamp.kMin);
      await control(lamp, 'devices.capabilities.on_off', 'powerSwitch', 1);
      console.log('Amanecer: empieza');
      return;
    }
    // Si la has apagado a mano, ya estás despierto: se deja apagada
    if (!await lampIsOn(lamp)) { await markOnce(user, l.id + '-fin', l.at); console.log('Amanecer: la bombilla está apagada, se termina'); return; }
    await control(lamp, 'devices.capabilities.color_setting', 'colorTemperatureK', kelvin);
    await control(lamp, 'devices.capabilities.range', 'brightness', bright);
    console.log(`Amanecer: ${Math.round(p * 100)} %`);
    if (p >= 1) await markOnce(user, l.id + '-fin', l.at);
  } catch (e) {
    console.log('Despertador de luz:', e.message);
  }
}

// Las marcas de más de 3 días ya no sirven
async function cleanup(user) {
  const old = await user.collection('pushLog').where('at', '<', Date.now() - 3 * 86400e3).limit(100).get();
  await Promise.all(old.docs.map(d => d.ref.delete()));
}

main().catch(e => { console.log('Error al enviar los avisos:', e.code || e.message); process.exitCode = 1; });
