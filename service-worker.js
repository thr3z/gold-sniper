const CACHE_NAME = 'gold-sniper';
const urlsToCache = [
  './index.html',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  // For API calls (Gemini/CurrencyAPI), go to network first, don't cache
  if (event.request.url.includes('api') || event.request.url.includes('generativelanguage')) {
      return; 
  }
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cache if found, otherwise fetch from network
        return response || fetch(event.request);
      })
  );
});
