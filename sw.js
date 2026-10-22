const CACHE='titans-tackle-v1.6';
const STATIC=['./icon-192.png','./icon-512.png','./manifest.webmanifest'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(STATIC)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
const r=e.request;
if(r.method!=='GET'||new URL(r.url).origin!==self.location.origin)return;
if(r.mode==='navigate'||r.destination==='document'){e.respondWith(fetch(r).catch(()=>caches.match(r)));return;}
e.respondWith(fetch(r).then(response=>response).catch(()=>caches.match(r)));
});