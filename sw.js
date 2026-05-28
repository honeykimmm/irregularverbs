const CACHE = 'verb-master-v3';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache =>
      cache.add('./index.html')  // index.html만 캐시 (이미지 전부 인라인이라 이것만 있으면 됨)
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // index.html 요청은 항상 캐시 우선
  if (e.request.url.includes('index.html') || e.request.mode === 'navigate') {
    e.respondWith(
      caches.match('./index.html').then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(cache => cache.put('./index.html', clone));
          return res;
        });
      })
    );
    return;
  }
  // 나머지는 네트워크 우선, 실패하면 캐시
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
