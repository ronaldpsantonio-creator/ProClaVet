// ProClaVet - Service Worker sincronizado
// v20: incluye las fichas de Costillas 7 a 18.
const C="vetanatomy-v21-rib18-direct";
const CORE=["./","index.html","css/styles.css","js/app.js","data/equino.json","data/fichas_costillas_7.json","data/fichas_costillas_8.json","data/fichas_costillas_9.json","data/fichas_costillas_10.json","data/fichas_costillas_11.json","data/fichas_costillas_12.json","data/fichas_costillas_13.json","data/fichas_costillas_14.json","data/fichas_costillas_15.json","data/fichas_costillas_16.json","data/fichas_costillas_17.json","data/fichas_costillas_18.json","manifest.webmanifest","assets/laminas/atlas-equino-c1.svg","assets/laminas/axis-equino-c2.svg"];

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
 const fresh=["/data/equino.json","/js/app.js","/index.html"].some(p=>url.pathname.endsWith(p))||url.pathname.includes("/data/fichas_costillas_");
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
