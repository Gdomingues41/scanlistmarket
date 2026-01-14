const CACHE_NAME = 'scanlist-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/login.html',
  '/app.html',
  '/history.html',
  '/manifest.json',
  '/logo-white.png'
];

// Instala o service worker e armazena os arquivos no cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Faz o app carregar mais rápido buscando primeiro no cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});