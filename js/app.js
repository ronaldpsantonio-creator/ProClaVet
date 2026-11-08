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
// No se generan geometrías ficticias: el visor solo muestra modelos anatómicos GLB/GLTF verificados.
// ---- Carga de datos y estructuras
const loader=new THREE.GLTFLoader();
fetch("data/equino.json").then(r=>r.json()).then(build).catch(()=>{$("warn").textContent="No se pudo leer data/equino.json. Abre la app desde un servidor (GitHub Pages), no desde el archivo local."});
function build(d){
 d.structures.forEach(s=>{
  const g=new THREE.Group();g.userData.id=s.id;sc.add(g);
  const c=new THREE.Vector3(0,0,0),lb=document.createElement("div");lb.className="lb";lb.textContent=s.es+" · "+s.la;vw.appendChild(lb);
  S.items[s.id]={s,g,model:null,c,lb,has:false,vis:true,state:"pendiente",dir:new THREE.Vector3(0,0,0)};
 });
 buildSystems();layerPanel();list();ficha();refresh();
 $("warn").textContent="Los modelos anatómicos 3D verificados se mostrarán cuando estén disponibles. No se usan figuras geométricas como sustitutos.";
 loadAll();
}
function mats(it){const a=[];it.g.traverse(m=>{if(m.isMesh)a.push(m.material)});return a}
function setModel(it,root){
 it.has=true;
 if(it.model)it.g.remove(it.model);
 it.model=root;it.g.add(root);
 root.traverse(m=>{if(m.isMesh){m.material=m.material.clone();m.material.transparent=true}});
 it.g.position.set(0,0,0);it.g.updateMatrixWorld(true);
 new THREE.Box3().setFromObject(root).getCenter(it.c);
 it.dir=it.c.clone().setY(it.c.y-.3).normalize();it.state="cargado";refresh();list();ficha();
}
async function loadAll(){ // carga progresiva, con error individual por estructura
 const q=Object.values(S.items).filter(i=>i.s.model),total=q.length;let done=0;
 if(!total){$("bar").classList.add("hid");$("warn").textContent="No hay rutas de modelos 3D registradas. Las estructuras permanecen identificadas, pero sin geometría anatómica.";list();return;}
 const worker=async()=>{while(q.length){const it=q.shift();
  await new Promise(resolve=>loader.load(it.s.model,g=>{try{setModel(it,g.scene)}catch(e){it.state="error";console.error("Error al preparar modelo:",it.s.id,e)}resolve()},undefined,error=>{it.state="no disponible";console.warn("Modelo 3D no disponible:",it.s.id,it.s.model,error);list();if(S.sel===it.s.id)ficha();resolve()}));
  done++;$("bi").style.width=(done/total*100)+"%";}};
 await Promise.all([worker(),worker()]);
 const n=Object.values(S.items).filter(i=>i.state==="cargado").length;
 $("warn").textContent=n?("Modelos anatómicos cargados: "+n+". Las demás estructuras no tienen un archivo 3D disponible."):"No se encontró ningún modelo 3D en las rutas registradas. No se mostrarán figuras sustitutas.";
 setTimeout(()=>$("bar").classList.add("hid"),800);list();if(S.sel)ficha();
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
 <p class="${it.state==="cargado"?"mu":"pend"}" style="font-size:13px">Modelo 3D: ${it.state==="cargado"?"cargado. Licencia: "+(s.licencia||"sin documentar"):(it.state==="no disponible"?"archivo 3D no encontrado o no pudo cargarse.":"sin modelo 3D disponible; no se muestra una figura sustituta.")}</p>`+
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
