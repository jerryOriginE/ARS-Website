// src/serviceWorker.js
const CACHE_NAME = "ars-cache-v1";
const urlsToCache = ["/", "/index.html", "/manifest.json"];

// Install service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Activate and clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.map((name) => name !== CACHE_NAME && caches.delete(name)))
    )
  );
  self.clients.claim();
});

// Serve from cache if available
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
