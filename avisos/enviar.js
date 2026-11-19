// Envía al móvil los avisos de Mi Agenda. Lo ejecuta GitHub Actions cada 10 minutos (.github/workflows/avisos.yml).
// La app prepara la lista de avisos (users/<tú>/private/pushPlan); aquí solo se envía cada uno a su hora, una sola vez.
// El repositorio es público y sus registros también: no se escribe en ellos nada de tu agenda.
const admin = require('firebase-admin');
const webpush = require('web-push');

const VAPID_PUBLIC = 'BPk4Y2G_EssfIHo-tZOb2UlaFjN0VR5h6aFy-UiWE-Xo-H1-m3elCdkLiMDRqYKNLUMcDnrb136j2L8PsjdodfE';
const SITE = 'https://maiquesabacucc.github.io/mi-agenda/';
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
  const until = Date.now() + WINDOW, handled = new Set();
  let sent = 0;

  for (;;) {
    // Se vuelve a leer en cada vuelta: si cambias algo en la app, el aviso cambia o desaparece
    const items = (await user.collection('private').doc('pushPlan').get()).get('items') || [];
    const now = Date.now();
    for (const it of items.filter(x => !handled.has(x.id) && x.at <= now && x.exp > now)) {
      handled.add(it.id);
      if (await sendOnce(user, it)) sent++;
    }
    const next = items.filter(x => !handled.has(x.id) && x.at > now && x.exp > now).map(x => x.at).sort((a, b) => a - b)[0];
    if (!next || next > until) break;
    await sleep(Math.min(next - Date.now(), 60e3));
  }
  await cleanup(user);
  console.log(`Avisos enviados en esta ejecución: ${sent}`);
}

// Cada aviso deja una marca; si otra ejecución ya lo envió, la marca existe y no se repite
async function sendOnce(user, it) {
  try { await user.collection('pushLog').doc(it.id).create({ at: it.at, sent: Date.now() }); }
  catch { return false; }
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

// Las marcas de más de 3 días ya no sirven
async function cleanup(user) {
  const old = await user.collection('pushLog').where('at', '<', Date.now() - 3 * 86400e3).limit(100).get();
  await Promise.all(old.docs.map(d => d.ref.delete()));
}

main().catch(e => { console.log('Error al enviar los avisos:', e.code || e.message); process.exitCode = 1; });
