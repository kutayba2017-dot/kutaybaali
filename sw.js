// CREVA service worker: keeps the site installable and shows push notifications.
// It does not cache anything: pages always load live data.
self.addEventListener('install',function(){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim())});
self.addEventListener('fetch',function(){});

self.addEventListener('push',function(e){
  var d={};
  try{d=e.data.json()}catch(x){d={title:'CREVA',body:e.data?e.data.text():''}}
  e.waitUntil(self.registration.showNotification(d.title||'CREVA',{
    body:d.body||'',
    icon:'/icon-192.png',
    tag:d.tag||undefined,
    renotify:!!d.tag,
    dir:'rtl',
    lang:'ar',
    data:{url:d.url||'/'}
  }));
});

self.addEventListener('notificationclick',function(e){
  e.notification.close();
  var u=new URL((e.notification.data&&e.notification.data.url)||'/',self.location.origin).href;
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(function(l){
    for(var i=0;i<l.length;i++){
      var c=l[i];
      if(c.url.split('#')[0]==u.split('#')[0]&&'focus' in c){
        if('navigate' in c){try{c.navigate(u)}catch(x){}}
        return c.focus();
      }
    }
    return self.clients.openWindow(u);
  }));
});
