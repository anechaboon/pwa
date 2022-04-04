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

var cacheName = 'video-storage';
var filesToCache = [
    '/index.html',
    '/index.js',
    '/style.css',
    'images/bp1.jpeg',
    'images/bp2.jpeg',
    'images/bp3.jpeg',
    'images/bp4.jpeg'
];
// add cache
self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(filesToCache);
        })
    );
});
// check version 
self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
    caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
        }
        }));
    })
    );
    return self.clients.claim();
});
// call cache
self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});

