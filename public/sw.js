// Service Worker : for keep file to cache

self.addEventListener('install', function(e) {
    e.waitUntil(
        // video-storage : as cache name
        caches.open('video-storage').then(function(cache) {
            return cache.addAll([
                '/index.html',
                '/index.js',
                '/style.css',
                'images/bp1.jpeg',
                'images/bp2.jpeg',
                'images/bp3.jpeg',
                'images/bp4.jpeg'
            ])
        })
    )
})

self.addEventListener('fetch', function(e) {
    console.log(e.request.url)
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});

