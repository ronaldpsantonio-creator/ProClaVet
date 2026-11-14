// ProClaVet - Service Worker sincronizado
// v6: incluye las láminas individuales del atlas y axis equinos.
const C="vetanatomy-v6-c1-c2-plates";
const CORE=["./","index.html","css/styles.css","js/app.js","data/equino.json","manifest.webmanifest","assets/laminas/atlas-equino-c1.svg","assets/laminas/axis-equino-c2.svg"];

self.addEventListener("install",e=>{
 e.waitUntil(caches.open(C).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",e=>{
 e.waitUntil(caches.keys()
  .then(keys=>Promise.all(keys.filter(k=>k.startsWith("vetanatomy-")&&k!==C).map(k=>caches.delete(k))))
  .then(()=>self.clients.claim()));
});
self.addEventListener("fetch",e=>{
 const req=e.request;
 if(req.method!=="GET")return;
 const url=new URL(req.url);
 if(url.origin!==self.location.origin)return;
 const fresh=["/data/equino.json","/js/app.js","/index.html"].some(p=>url.pathname.endsWith(p));
 e.respondWith(caches.open(C).then(async cache=>{
  const hit=await cache.match(req);
  if(fresh){
   try{
    const res=await fetch(req,{cache:"no-store"});
    if(res.ok)cache.put(req,res.clone());
    return res;
   }catch(err){if(hit)return hit;const fallback=await cache.match("./index.html");if(fallback)return fallback;throw err;}
  }
  if(hit)return hit;
  const res=await fetch(req);
  if(res.ok||res.type==="opaque")cache.put(req,res.clone());
  return res;
 }));
});
