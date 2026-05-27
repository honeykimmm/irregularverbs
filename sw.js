const CACHE = 'verb-master-v2';
const FILES = [
  './index.html',
  './icon-192.png',
  './icon-512.png',
  './icon-180.png',
  './manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
