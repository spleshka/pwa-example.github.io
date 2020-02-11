self.addEventListener('fetch', event => {
  event.respondWith(async function () {

    const response = fetch(event.request.url);

    event.waitUntil(async function () {
      const cache = await caches.open('v1');
      const responseClone = await response.then(r => r.clone());
      await cache.put(event.request.url, responseClone);
    }())

    return (await caches.match(event.request.url)) || response;
  }());
});
