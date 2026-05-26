const CACHE = 'verb-master-v1';
const FILES = [
  './index.html',
  './intermediate.html',
  './advanced.html',
  './icon-beginner-192.png',
  './icon-beginner-512.png',
  './icon-beginner-180.png',
  './manifest-beginner.json'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
