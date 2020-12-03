const CACHE_NAME = "portfolio-cache";
const urlsToCache =
    [
        "/",
    ];
const cacheAllowlist = ['portfolio-v2-3'];

self.addEventListener("install", event => {
    const preLoaded = caches.open(CACHE_NAME)
        .then(cache => cache.addAll(urlsToCache));
    event.waitUntil(preLoaded);
});

self.addEventListener("fetch", event => {
    const response = caches.match(event.request)
        .then(match => match || fetch(event.request));
    event.respondWith(response);
});

self.addEventListener("activate", event => {

    const activates = caches.keys().then(cacheNames =>
        Promise.all(
            cacheNames.map(cacheName => {
                if (cacheAllowlist.indexOf(cacheName) === -1) {
                    return caches.delete(cacheName);
                }
            })
        )
    );

    event.waitUntil(activates);
});