"use strict";
const $=i=>document.getElementById(i);
const SYSTEMS=[["ske","Esquelético"],["mus","Muscular"],["dig","Digestivo"],["res","Respiratorio"],["car","Cardiovascular"],["ner","Nervioso"],["uri","Urinario"],["rep","Reproductor"],["teg","Tegumentario"]];
const LAYERS=[["pel","Piel y tejido subcutáneo"],["fas","Fascias"],["msu","Músculos superficiales"],["mpr","Músculos profundos"],["oss","Sistema óseo"],["art","Articulaciones y ligamentos"],["vas","Sistema vascular"],["ner","Sistema nervioso"],["org","Órganos internos"],["cav","Cavidades y estructuras profundas"]];
const FIELDS=[["ubicacion","Ubicación anatómica"],["descripcion","Descripción morfológica"],["relaciones","Relaciones anatómicas"],["accidentes","Accidentes anatómicos"],["articulaciones","Articulaciones"],["inserciones","Inserciones musculares"],["irrigacion","Irrigación"],["inervacion","Inervación"],["funcion","Función"],["especie","Particularidades de la especie"],["clinica","Importancia clínica"],["referencias","Referencias bibliográficas"]];
const S={items:{},sel:null,q:"",L:{},sys:{},fav:{},notes:{}};
LAYERS.forEach(([k])=>S.L[k]={on:true,op:100});
try{S.fav=JSON.parse(localStorage.getItem("va_fav")||"{}");S.notes=JSON.parse(localStorage.getItem("va_notes")||"{}")}catch(e){}
const persist=()=>{try{localStorage.setItem("va_fav",JSON.stringify(S.fav));localStorage.setItem("va_notes",JSON.stringify(S.notes))}catch(e){}};
// ---- Visor
const vw=$("vw"),sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(45,1,.1,100),ren=new THREE.WebGLRenderer({antialias:true,alpha:true});
ren.setPixelRatio(Math.min(devicePixelRatio,2));vw.prepend(ren.domElement);
const ctl=new THREE.OrbitControls(cam,ren.domElement);ctl.enableDamping=true;
sc.add(new THREE.HemisphereLight(0xffffff,0x445566,.9));
const dl=new THREE.DirectionalLight(0xffffff,.8);dl.position.set(3,5,4);sc.add(dl);
const grid=new THREE.GridHelper(10,10,0x888888,0x888888);grid.position.y=-1.5;grid.material.transparent=true;grid.material.opacity=.25;sc.add(grid);
const VIEWS={l:[0.5,1.2,9],d:[0,10,0.01],f:[10,1,0]};
function view(v){cam.position.set(...v);ctl.target.set(0,0,0)}view(VIEWS.l);
function size(){const w=vw.clientWidth,h=vw.clientHeight;ren.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()}
addEventListener("resize",size);size();
// ---- Esqueleto ESQUEMÁTICO provisional: formas simplificadas generadas por código. NO son anatomía real.
const V3=(x,y,z)=>new THREE.Vector3(x,y,z);
function schem(s){
 const m=s.id.match(/^equ\.ske\.(\w+)\.(\d+)(?:-([id]))?$/);if(!m||s.layer!=="oss")return null;
 const r=m[1],n=+m[2],sd=m[3]==="d"?1:-1,z=.28*sd,K=Math.sin;
 const seg=(a,b,w,zz)=>({k:"seg",a:[a[0],a[1],zz===undefined?z:zz],b:[b[0],b[1],zz===undefined?z:zz],w,col:r});
 const blk=(x,y,zz,w)=>({k:"blk",p:[x,y,zz],w,col:r});
 if(r==="cra"){const T={1:[2.28,1.78,0,.1],2:[2.42,1.5,0,.08],3:[2.52,1.5,0,.07],4:[2.65,1.62,0,.08],5:[2.33,1.88,0,.07],6:[2.4,1.84,.1,.08],7:[2.58,1.82,.1,.1],8:[2.4,1.66,.2,.1],10:[2.72,1.72,.16,.05],11:[2.62,1.58,.2,.06],12:[2.92,1.52,.13,.12],13:[3.12,1.42,.07,.07],14:[2.78,1.46,.06,.06],15:[2.55,1.44,.07,.05],16:[2.92,1.52,0,.05]};
  if(n===9)return seg([2.7,1.86],[3.05,1.62],.05,.05*sd);if(n===17)return seg([2.4,1.32],[3.1,1.26],.08,.09*sd);
  if(n===18)return seg([2.42,1.48],[2.72,1.48],.09,.02*sd);
  const t=T[n];return t&&blk(t[0],t[1],t[2]*sd,t[3])}
 if(r==="hyo"){
  if(n===1)return seg([2.28,1.04],[2.62,1.04],.10,0);
  if(n===2)return seg([2.43,.99],[2.22,.78],.075,z);
  if(n===3)return seg([2.34,1.10],[2.29,1.19],.065,z);
  if(n===4)return seg([2.29,1.20],[2.39,1.51],.085,z);
  if(n===5)return seg([2.29,1.19],[2.27,1.25],.045,z);
 }
 if(r==="oid")return blk(2.38+.02*n,1.66,.21*sd,.03);
 if(r==="cer"){const P=t=>[2.28-.98*t,1.72-.5*t],t=(n-1)/6;return seg(P(t-.06),P(t+.06),.12,0)}
 if(r==="tor"){const x=1.2-(n-1)*.11,y=1.1+.08*K(Math.PI*(n-1)/17);return seg([x+.04,y],[x-.04,y],.1,0)}
 if(r==="lum"){const x=-.8-(n-1)*.14;return seg([x+.06,1.1],[x-.06,1.1],.1,0)}
 if(r==="sac"){const x=-1.7-(n-1)*.09,y=1-(n-1)*.01;return seg([x+.04,y],[x-.04,y],.09,0)}
 if(r==="cau"){const x=-2.15-(n-1)*.04,y=.95-(n-1)*.035;return seg([x,y],[x-.035,y-.03],Math.max(.025,.08-n*.003),0)}
 if(r==="cos"){const x=1.2-(n-1)*.11,y=1.1+.08*K(Math.PI*(n-1)/17),d=.75+.25*K(Math.PI*(n-1)/17);
  return {k:"rib",pts:[[x,y-.05,.06*sd],[x-.04,y-.2*d,.3*sd],[x-.08,y-.55*d,.38*sd],[x-.12,y-.85*d,.26*sd],[x-.14,y-d,.08*sd]],col:r}}
 if(r==="ste")return seg([1.3,.1],[0,.06],.14,0);
 const o=.045*sd,q=.04*sd;
 if(r==="mto"){const L={1:()=>seg([1.65,1.05],[1.4,.45],.1),2:()=>seg([1.4,.45],[1,.05],.11),3:()=>seg([1,.05],[1.1,-.8],.08),4:()=>seg([.95,.12],[1.03,-.4],.04),5:()=>blk(1.1,-.83,z-o,.07),6:()=>blk(1.1,-.83,z,.07),7:()=>blk(1.1,-.83,z+o,.07),8:()=>blk(1.03,-.83,z,.06),9:()=>blk(1.1,-.91,z-o,.06),10:()=>blk(1.1,-.91,z,.07),11:()=>blk(1.1,-.91,z+o,.06),12:()=>seg([1.1,-.95],[1.1,-1.15],.06),13:()=>seg([1.1,-.97],[1.1,-1.1],.025,z-q),14:()=>seg([1.1,-.97],[1.1,-1.1],.025,z+q),15:()=>seg([1.1,-1.17],[1.15,-1.3],.06),16:()=>seg([1.15,-1.3],[1.18,-1.4],.06),17:()=>seg([1.18,-1.4],[1.3,-1.5],.1),18:()=>blk(1.07,-1.17,z-.03*sd,.035),19:()=>blk(1.07,-1.17,z+.03*sd,.035),20:()=>blk(1.19,-1.4,z,.04)};return L[n]&&L[n]()}
 if(r==="mpe"){const L={1:()=>seg([-1.3,.95],[-2.05,.65],.15),2:()=>seg([-1.8,.55],[-1.45,-.25],.1),3:()=>blk(-1.4,-.2,z,.07),4:()=>seg([-1.45,-.25],[-1.95,-.75],.09),5:()=>seg([-1.5,-.3],[-1.9,-.7],.03,z+.03*sd),6:()=>blk(-1.92,-.82,z,.08),7:()=>seg([-2,-.65],[-1.98,-.82],.06),8:()=>blk(-1.92,-.9,z,.06),9:()=>blk(-1.92,-.95,z-q,.06),10:()=>blk(-1.92,-.95,z,.06),11:()=>blk(-1.92,-.95,z+q,.06),12:()=>seg([-1.92,-.98],[-1.9,-1.15],.06),13:()=>seg([-1.92,-1],[-1.9,-1.12],.025,z-q),14:()=>seg([-1.92,-1],[-1.9,-1.12],.025,z+q),15:()=>seg([-1.9,-1.18],[-1.85,-1.3],.06),16:()=>seg([-1.85,-1.3],[-1.83,-1.4],.06),17:()=>seg([-1.83,-1.4],[-1.72,-1.5],.1),18:()=>blk(-1.9,-1.17,z-.03*sd,.035),19:()=>blk(-1.9,-1.17,z+.03*sd,.035),20:()=>blk(-1.84,-1.4,z,.04)};return L[n]&&L[n]()}
 return null}
const BONE={cra:0xe6dcc0,hyo:0xd8c49a,oid:0xcfc3a0,cer:0xd9cca8,tor:0xd9cca8,lum:0xd9cca8,sac:0xd9cca8,cau:0xd9cca8,cos:0xefe7d2,ste:0xefe7d2,mto:0xe2d6b4,mpe:0xe2d6b4};
function makeMesh(P){
 const mat=new THREE.MeshStandardMaterial({color:BONE[P.col]||0xdddddd,transparent:true});let m;
 if(P.k==="seg"){const a=V3(...P.a),b=V3(...P.b),d=b.clone().sub(a),L=d.length();
  m=new THREE.Mesh(new THREE.BoxGeometry(P.w,L,P.w*.8),mat);m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(V3(0,1,0),d.normalize())}
 else if(P.k==="rib")m=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(P.pts.map(q=>V3(...q))),12,.018,5),mat);
 else{m=new THREE.Mesh(new THREE.BoxGeometry(P.w,P.w,P.w),mat);m.position.set(...P.p)}
 return m}
function centerOf(P){return P.k==="seg"?V3(...P.a).add(V3(...P.b)).multiplyScalar(.5):P.k==="rib"?V3(...P.pts[2]):V3(...P.p)}
// ---- Carga de datos y estructuras
const loader=new THREE.GLTFLoader();
fetch("data/equino.json").then(r=>r.json()).then(build).catch(()=>{$("warn").textContent="No se pudo leer data/equino.json. Abre la app desde un servidor (GitHub Pages), no desde el archivo local."});
function build(d){
 d.structures.filter(s=>!s.id.startsWith("equ.prv.ske.")).forEach(s=>{
  const g=new THREE.Group(),P0=s.ph,E=P0?null:schem(s),P=P0||E,ph=P0?new THREE.Mesh(new THREE.BoxGeometry(...P0.s),new THREE.MeshStandardMaterial({color:P0.c,transparent:true})):E?makeMesh(E):null;
  if(P0)ph.position.set(...P0.p);if(ph)g.add(ph);g.userData.id=s.id;sc.add(g);
  const c=P0?V3(...P0.p):E?centerOf(E):V3(0,0,0),lb=document.createElement("div");lb.className="lb";lb.textContent=s.es+" · "+s.la;vw.appendChild(lb);
  S.items[s.id]={s,g,ph,c,lb,has:!!P,esq:!!E,vis:true,state:E?"esquemático":"pendiente",dir:c.clone().setY(c.y-.3).normalize()};
 });
 buildSystems();layerPanel();list();ficha();refresh();
 $("warn").textContent="Esqueleto esquemático provisional: formas simplificadas, no son anatomía real. Cada hueso espera su modelo GLB verificado.";
 loadAll();
}
function mats(it){const a=[];it.g.traverse(m=>{if(m.isMesh)a.push(m.material)});return a}
function setModel(it,root){
 if(it.ph&&it.ph.parent){it.g.remove(it.ph);it.ph.geometry.dispose()}it.has=true;it.esq=false;
 if(it.model)it.g.remove(it.model);
 it.model=root;it.g.add(root);
 root.traverse(m=>{if(m.isMesh){m.material=m.material.clone();m.material.transparent=true}});
 it.g.position.set(0,0,0);it.g.updateMatrixWorld(true);
 new THREE.Box3().setFromObject(root).getCenter(it.c);
 it.dir=it.c.clone().setY(it.c.y-.3).normalize();it.state="cargado";refresh();list();ficha();
}
async function loadAll(){ // carga progresiva: 2 modelos en paralelo, sin bloquear el visor
 const q=Object.values(S.items).filter(i=>i.s.model),total=q.length;let done=0;
 const worker=async()=>{while(q.length){const it=q.shift();
  await new Promise(r=>loader.load(it.s.model,g=>{setModel(it,g.scene);r()},null,()=>r()));
  done++;$("bi").style.width=(done/total*100)+"%";}};
 await Promise.all([worker(),worker()]);
 const n=Object.values(S.items).filter(i=>i.state==="cargado").length;
 if(!n)$("warn").textContent+=" Aún no hay modelos GLB en la carpeta models/.";
 setTimeout(()=>$("bar").classList.add("hid"),800);list();
}
// ---- Estado visual
function refresh(){
 const ex=$("ex").value/100,li=k=>LAYERS.findIndex(l=>l[0]===k);
 Object.values(S.items).forEach(it=>{
  const L=S.L[it.s.layer],o=L.op/100;
  it.g.visible=L.on&&it.vis&&S.sys[it.s.sys]!==false;
  it.g.position.copy(it.dir).multiplyScalar(ex*1.2);it.g.position.z+=(li(it.s.layer)-4.5)*ex*.25;
  mats(it).forEach(m=>{m.opacity=o;if(m.emissive){m.emissive.setHex(S.sel===it.s.id?0x2dd4bf:0);m.emissiveIntensity=.55}});
 });
}
// Etiquetas inteligentes: el hueso seleccionado siempre muestra su nombre;
// al acercar el zoom aparecen los nombres de las 4 estructuras más cercanas al centro y no tapadas.
const rayO=new THREE.Raycaster();let lastOcc=0;const occ={};const ZOOM_NEAR=5.5,MAX_AUTO=4;
function updateOcc(){
 const vis=Object.values(S.items).filter(i=>i.g.visible&&i.has),objs=vis.map(i=>i.g);
 vis.map(it=>[it.c.clone().add(it.g.position).project(cam),it]).map(([v,it])=>[Math.hypot(v.x,v.y),it]).sort((a,b)=>a[0]-b[0]).slice(0,12).map(a=>a[1]).forEach(it=>{const d=it.c.clone().add(it.g.position).sub(cam.position),dist=d.length();
  rayO.set(cam.position,d.normalize());const h=rayO.intersectObjects(objs,true)[0];
  let o=h&&h.object;while(o&&!o.userData.id)o=o.parent;
  occ[it.s.id]=!(o&&o.userData.id!==it.s.id&&h.distance<dist-0.05)});
}
function loop(){requestAnimationFrame(loop);ctl.update();
 const w=vw.clientWidth,h=vw.clientHeight,blind=$("blind").checked,auto=$("lab").checked,now=performance.now();
 if(now-lastOcc>200){lastOcc=now;updateOcc()}
 const zoomed=cam.position.distanceTo(ctl.target)<ZOOM_NEAR,cand=[],all=Object.values(S.items);
 all.forEach(it=>{const v=it.c.clone().add(it.g.position).project(cam);it.pv=v;it.show=false;
  if(blind||!it.has||!it.g.visible||v.z>=1)return;
  if(S.sel===it.s.id)it.show=true;
  else if(auto&&zoomed&&occ[it.s.id]!==false&&Math.abs(v.x)<1&&Math.abs(v.y)<1)cand.push([Math.hypot(v.x,v.y),it])});
 cand.sort((a,b)=>a[0]-b[0]).slice(0,MAX_AUTO).forEach(c=>c[1].show=true);
 all.forEach(it=>{const l=it.lb;if(!it.show){l.style.display="none";return}
  const sel=S.sel===it.s.id;l.style.display="block";
  l.style.left=(it.pv.x+1)/2*w+"px";l.style.top=(1-it.pv.y)/2*h+"px";
  l.style.background=sel?"rgba(15,118,110,.95)":"rgba(0,0,0,.65)";l.style.fontWeight=sel?"600":"400";l.style.zIndex=sel?2:1});
 ren.render(sc,cam);
}loop();
// ---- Selección
const ray=new THREE.Raycaster(),pt=new THREE.Vector2();let down=null;
ren.domElement.addEventListener("pointerdown",e=>down=[e.clientX,e.clientY]);
ren.domElement.addEventListener("pointerup",e=>{
 if(!down||Math.hypot(e.clientX-down[0],e.clientY-down[1])>5)return;
 const r=ren.domElement.getBoundingClientRect();pt.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);
 ray.setFromCamera(pt,cam);
 const h=ray.intersectObjects(Object.values(S.items).filter(i=>i.g.visible).map(i=>i.g),true)[0];
 if(h){let o=h.object;while(o&&!o.userData.id)o=o.parent;if(o)pick(o.userData.id)}else if(S.sel){S.sel=null;list();refresh();ficha()}
});
function pick(id){S.sel=id;list();refresh();ficha();tab("f")}
// ---- Paneles
function buildSystems(){
 $("sp").innerHTML=[["Equino",1],["Bovino (Fase 6)",0],["Porcino (Fase 7)",0]].map(([n,a])=>`<button class="${a?"on":""}" ${a?"":"disabled"}>${n}</button>`).join("");
 const have=new Set(Object.values(S.items).map(i=>i.s.sys));
 $("sy").innerHTML=SYSTEMS.map(([k,n])=>`<button data-s="${k}" class="${have.has(k)?"on":""}" ${have.has(k)?"":"disabled title=\"Pendiente de desarrollo\""}>${n}</button>`).join("");
 $("sy").onclick=e=>{const k=e.target.dataset.s;if(!k||e.target.disabled)return;S.sys[k]=S.sys[k]===false;e.target.classList.toggle("on",S.sys[k]);refresh()};
}
function layerPanel(){
 const cnt={};Object.values(S.items).forEach(i=>cnt[i.s.layer]=(cnt[i.s.layer]||0)+1);
 $("lyr").innerHTML=LAYERS.map(([k,n],i)=>`<div class="ly"><label><input type="checkbox" data-l="${k}" checked> <b>${i+1}. ${n}</b> <span class="mu">${cnt[k]?cnt[k]+" estr.":"pendiente"}</span></label><label class="mu">Opacidad <input type="range" data-o="${k}" min="5" max="100" value="100"></label></div>`).join("");
 $("lyr").oninput=e=>{const l=e.target.dataset.l,o=e.target.dataset.o;if(l)S.L[l].on=e.target.checked;if(o)S.L[o].op=+e.target.value;refresh()};
}
function list(){
 const q=S.q.toLowerCase(),blind=$("blind").checked;
 $("ls").innerHTML=Object.values(S.items).filter(i=>(i.s.es+i.s.la).toLowerCase().includes(q)).map(i=>{const s=i.s;
 return `<div class="item ${S.sel===s.id?"sel":""}" data-id="${s.id}"><b>${blind?s.id:s.es}<br><i>${blind?"nombre oculto":s.la+" · modelo "+i.state}</i></b><button data-fav="${s.id}" title="Favorito">${S.fav[s.id]?"★":"☆"}</button><button data-vis="${s.id}" title="Mostrar u ocultar">${i.vis?"👁":"✕"}</button></div>`}).join("")||"<p>Sin resultados.</p>";
}
$("ls").onclick=e=>{const f=e.target.dataset.fav,v=e.target.dataset.vis;
 if(f){S.fav[f]=!S.fav[f];persist()}else if(v){S.items[v].vis=!S.items[v].vis}else{const it=e.target.closest(".item");if(it)return pick(it.dataset.id)}
 list();refresh()};
function ficha(){
 const it=S.items[S.sel];if(!it){$("tf").innerHTML="<p>Selecciona una estructura en el visor o en la lista.</p>";return}
 const s=it.s,F=s.ficha||{},blind=$("blind").checked;
 $("tf").innerHTML=`<h3 style="margin:0">${blind?s.id:s.es}</h3><div class="mu">${blind?"":s.la+" (NAV) · "}${s.id}</div>
 <p class="${it.state==="cargado"?"mu":"pend"}" style="font-size:13px">Modelo 3D: ${it.state==="cargado"?"cargado. Licencia: "+(s.licencia||"sin documentar"):(it.esq?"esquemático provisional (forma simplificada, no es anatomía real); pendiente del modelo verificado.":s.ph?"marcador provisional, pendiente de desarrollo.":"sin modelo 3D, pendiente de desarrollo.")}</p>`+
 FIELDS.map(([k,n])=>`<div class="f"><span>${n}</span>${F[k]?F[k]:'<span class="pend">Pendiente: sin información verificada</span>'}</div>`).join("")+
 `<div class="f"><span>Notas personales</span><textarea id="nt" rows="3" style="width:100%;box-sizing:border-box">${S.notes[s.id]||""}</textarea></div>`;
 $("nt").oninput=e=>{S.notes[s.id]=e.target.value;persist()};
}
function tab(t){["e","c","v","f"].forEach(k=>{$("t"+k).classList.toggle("hid",k!==t);document.querySelector(`[data-t=${k}]`).classList.toggle("on",k===t)})}
document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>tab(b.dataset.t));
$("q").oninput=e=>{S.q=e.target.value;list()};
["ex"].forEach(i=>$(i).oninput=refresh);
["lab","blind"].forEach(i=>$(i).onchange=()=>{list();ficha()});
document.querySelectorAll("[data-v]").forEach(b=>b.onclick=()=>view(VIEWS[b.dataset.v]));
$("rs").onclick=()=>view(VIEWS.l);
$("iso").onclick=()=>{if(!S.sel)return;Object.values(S.items).forEach(i=>i.vis=i.s.id===S.sel);list();refresh()};
$("all").onclick=()=>{Object.values(S.items).forEach(i=>i.vis=true);LAYERS.forEach(([k])=>S.L[k].on=true);document.querySelectorAll("[data-l]").forEach(c=>c.checked=true);list();refresh()};
$("ld").onclick=()=>{if(!S.sel)return alert("Primero selecciona una estructura.");$("fl").click()};
$("fl").onchange=e=>{const f=e.target.files[0],it=S.items[S.sel];if(!f||!it)return;const u=URL.createObjectURL(f);
 loader.load(u,g=>{setModel(it,g.scene);URL.revokeObjectURL(u)},null,()=>alert("No se pudo leer el archivo GLB."));e.target.value=""};
