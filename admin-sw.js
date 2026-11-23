// Minimal service worker so the admin panel can be installed as an app.
// It does not cache anything: the panel always loads live data.
self.addEventListener('install',function(){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim())});
self.addEventListener('fetch',function(){});
