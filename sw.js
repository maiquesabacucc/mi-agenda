// Mi Agenda: guarda la app en el móvil para que se abra al momento y sin conexión.
// Los datos no pasan por aquí: Firebase los guarda por su cuenta.
// Al cambiar algo de la app, sube el número de VERSION para que los móviles cojan la nueva.
const VERSION = 'v1';
const CACHE = 'mi-agenda-' + VERSION;
const SHELL = ['./', 'index.html', 'firebase-config.js', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith('mi-agenda-') && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Lo que puede guardarse: la propia app, las librerías de Firebase y las fuentes
const cacheable = url =>
  url.origin === self.location.origin ||
  (url.hostname === 'www.gstatic.com' && url.pathname.startsWith('/firebasejs/')) ||
  url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com' ||
  url.hostname === 'cdn.jsdelivr.net';

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (!cacheable(url)) return;

  // La página y la configuración: primero la versión nueva; sin conexión, la guardada
  if (req.mode === 'navigate' || (url.origin === self.location.origin && /\/(index\.html|firebase-config\.js)?$/.test(url.pathname))) {
    e.respondWith(fetch(req)
      .then(res => { if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req.mode === 'navigate' ? 'index.html' : req, copy)); } return res; })
      .catch(() => caches.match(req.mode === 'navigate' ? 'index.html' : req, { ignoreSearch: true })));
    return;
  }

  // Todo lo demás: lo guardado al momento y se actualiza por detrás
  e.respondWith(caches.open(CACHE).then(async c => {
    const hit = await c.match(req);
    const net = fetch(req).then(res => { if (res.ok || res.type === 'opaque') c.put(req, res.clone()); return res; }).catch(() => hit);
    return hit || net;
  }));
});
