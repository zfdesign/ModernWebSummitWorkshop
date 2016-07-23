//
// var log = console.log.bind(console);
// var err = console.error.bind(console);
//
// self.addEventListener('install', (e)=>{ log('Service Worker: Installed'); });
// self.addEventListener('activate',(e)=>{ log('Service Worker: Active'); });
//self.addEventListener('fetch',   (e)=>{ log('Service Worker: Fetch', e); });

var version = '1';
var cacheName = 'weatherPWA-v' + version;
var appShellFilesToCache = [
  './',
  './index.html',
  './scripts/app.js',
  './styles/inline.css',
  './images/icons/icon-256x256.png',
  './images/ic_notifications_white_24px.svg'
];


self.addEventListener('install', (e) => {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('[ServiceWorker] Caching App Shell');
      return cache.addAll(appShellFilesToCache);
    })
  );
});


// Clear cach on Activate
self.addEventListener('activate', (e) => {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        console.log('[ServiceWorker] Removing old cache', key);
        if (key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
});


// // Fetch
// self.addEventListener('fetch', (e) => {
//   console.log('[ServiceWorker] Fetch', e.request.url);
//   e.respondWith(
//     caches.match(e.request).then((response) => {
//       return response || fetch(e.request);
//     })
//   );
// });


// Programming Caching Strategies
// var dataCacheName = 'weatherData-v' + version;
// self.addEventListener('fetch', (e) => {
//   console.log('[ServiceWorker] Fetch', e.request.url);
//   // Match requests for data and handle them separately
//   if (e.request.url.indexOf('data/') != -1) {
//
//     e.respondWith(
//       fetch(e.request)
//         .then((response) => {
//           return caches.open(dataCacheName).then((cache) => {
//             cache.put(e.request.url, response.clone());
//             console.log('[ServiceWorker] Fetched & Cached', e.request.url);
//             return response.clone();
//           });
//         })
//     );
//   } else {
//     // The code we saw earlier
//     e.respondWith(
//       caches.match(e.request).then((response) => {
//         return response || fetch(e.request);
//       })
//     );
//   }
// });


// Read-through cache-first variant
// The cache-first version
self.addEventListener('fetch', (e) => {
  console.log('[ServiceWorker] Fetch', e.request.url);
  // Match requests for data and handle them separately
  if (e.request.url.indexOf('data/') != -1) {
    e.respondWith(
      caches.match(e.request.clone()).then((response) => {
        return response || fetch(e.request.clone()).then((r2) => {
          return caches.open(dataCacheName).then((cache) => {
            console.log('[ServiceWorker] Fetched & Cached', e.request.url);
            cache.put(e.request.url, r2.clone());
            return  r2.clone();
          });
        });
      })
    );
  } else {
    // The code we saw earlier
    e.respondWith(
      caches.match(e.request).then((response) => {
        return response || fetch(e.request);
      })
    );
  }
});
