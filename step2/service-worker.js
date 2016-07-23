
var log = console.log.bind(console);
var err = console.error.bind(console);

self.addEventListener('install', (e)=>{ log('Service Worker: Installed'); });
self.addEventListener('activate',(e)=>{ log('Service Worker: Active'); });
self.addEventListener('fetch',   (e)=>{ log('Service Worker: Fetch'); });
