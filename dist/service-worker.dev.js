"use strict";

var cacheName = 'cache-v1';
var precacheResources = ['/', 'index.html' // 'styles/main.css',
// 'images/space1.jpg',
// 'images/space2.jpg',
// 'images/space3.jpg'
];
self.addEventListener('install', function (event) {
  console.log('Service worker install event!');
  event.waitUntil(caches.open(cacheName).then(function (cache) {
    return cache.addAll(precacheResources);
  }));
});
self.addEventListener('activate', function (event) {
  console.log('Service worker activate event!');
});
self.addEventListener('fetch', function (event) {
  console.log('Fetch intercepted for:', event.request.url);
  event.respondWith(caches.match(event.request).then(function (cachedResponse) {
    if (cachedResponse) {
      return cachedResponse;
    }

    return fetch(event.request);
  }));
});