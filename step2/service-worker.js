//
// var log = console.log.bind(console);
// var err = console.error.bind(console);
//
// self.addEventListener('install', (e)=>{ log('Service Worker: Installed'); });
// self.addEventListener('activate',(e)=>{ log('Service Worker: Active'); });
// self.addEventListener('fetch',   (e)=>{ log('Service Worker: Fetch'); });

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
