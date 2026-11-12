// VETANATOMY 3D - Service Worker
// Para publicar una actualización: sube los archivos nuevos y cambia SOLO este número.
const VERSION = 'v3';
const CACHE = 'vetanatomy-' + VERSION;

self.addEventListener('install', (event) => {
  // Activa la versión nueva sin esperar a que se cierren las pestañas
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((k) => k.startsWith('vetanatomy-') && k !== CACHE)
          .map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Red primero (siempre intenta traer lo más nuevo); si no hay internet, usa la caché.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(req, { cache: 'no-cache' })
      .then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req).then((hit) => hit || caches.match('./index.html')))
  );
});
