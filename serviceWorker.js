const CACHE_NAME = "portfolio-cache";
const urlsToCache =
    [
        "/index.html",
        "/_next",
        "/favicons",
        "/fonts",
        "/images",
    ];
const cacheAllowlist = ['portfolio-v2-3'];

self.addEventListener("install", event => {
    const preLoaded = caches.open(CACHE_NAME)
        .then(cache => cache.addAll(urlsToCache));
    event.waitUntil(preLoaded);
});

self.addEventListener("fetch", event => {
    const response = caches.match(event.request)
        .then(match => match
            || fetch(event.request).then(response => {
                if (!response
                    || response.status !== 200
                    || response.type !== 'basic') {
                    return response;
                }
                const responseToCache = response.clone();

                caches
                    .open(CACHE_NAME)
                    .then(function (cache) {
                        cache.put(event.request, responseToCache);
                    });

                return response;
            })
        );

    event.respondWith(response);
});

self.addEventListener('activate', event => {

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