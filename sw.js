const CACHE = 'mmga-v1';

const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/styles.css',
  './assets/js/storage.js',
  './assets/js/format.js',
  './assets/js/parse.js',
  './assets/js/counter.js',
  './assets/js/sound.js',
  './assets/js/history.js',
  './assets/js/rules.js',
  './pages/jouer.html',
  './pages/history.html',
  './pages/regles.html',
  './pages/share.html',
  './rules/en.md',
  './rules/fr.md',
  './rules/es.md',
  './public/icon.png',
  './public/icon-192.png',
  './public/icon-512.png',
  './public/mmga.png',
  './public/qr-code.png',
  './public/cashout.mp3'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});