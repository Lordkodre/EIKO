
"use strict";

const MATERIALS = {
  PEEK:   {no:"PEEK", en:"PEEK", density:1.30, priceKg:880, flow:24, machineRate:1090, setup:1850, heat:1.35, waste:.13, risk:.15},
  PEKK:   {no:"PEKK", en:"PEKK", density:1.28, priceKg:980, flow:22, machineRate:1120, setup:1950, heat:1.38, waste:.14, risk:.17},
  PEI:    {no:"PEI / ULTEM™", en:"PEI / ULTEM™", density:1.27, priceKg:720, flow:27, machineRate:1020, setup:1700, heat:1.25, waste:.12, risk:.13},
  PPS:    {no:"PPS", en:"PPS", density:1.35, priceKg:510, flow:30, machineRate:970, setup:1550, heat:1.20, waste:.11, risk:.12},
  PSU:    {no:"PSU", en:"PSU", density:1.24, priceKg:430, flow:32, machineRate:930, setup:1450, heat:1.16, waste:.10, risk:.10},
  PA6CF:  {no:"PA6-CF", en:"PA6-CF", density:1.18, priceKg:260, flow:38, machineRate:850, setup:1200, heat:1.08, waste:.09, risk:.08},
  ABS:    {no:"ABS", en:"ABS", density:1.04, priceKg:95, flow:46, machineRate:720, setup:850, heat:1.02, waste:.07, risk:.06},
  PETG:   {no:"PETG", en:"PETG", density:1.27, priceKg:105, flow:44, machineRate:700, setup:800, heat:1.00, waste:.06, risk:.05},
  ASA:    {no:"ASA", en:"ASA", density:1.07, priceKg:120, flow:43, machineRate:730, setup:900, heat:1.03, waste:.07, risk:.06},
  PLA:    {no:"PLA", en:"PLA", density:1.24, priceKg:85, flow:50, machineRate:670, setup:750, heat:.96, waste:.05, risk:.04}
};

const I18N = {
  no:{
    nav_home:"Hjem",header_cta:"Send forespørsel",nav_services:"Produkter & Tjenester",nav_materials:"Materialer",nav_process:"Prosess",nav_estimates:"Estimater",nav_contact:"Kontakt",
    kicker:"Hurtigestimat",title:"Last opp STL og få et prisestimat",intro:"STL-filen analyseres lokalt i nettleseren. Estimatet er uforpliktende og må verifiseres før bestilling.",privacy:"Filen forlater ikke nettleseren",
    drop_title:"Dra STL-filen hit",drop_sub:"eller klikk for å velge fil",no_file:"Ingen fil valgt",material:"Materiale",nozzle:"Dysestørrelse",layer:"Laghøyde",infill:"Fyllgrad",walls:"Vegglinjer / perimetere",topBottom:"Massive topp-/bunnlag",quantity:"Antall",quality:"Produksjonsprofil",quality_fast:"Rask / grov, ±1,0 mm",quality_standard:"Standard, ±0,6 mm",quality_precision:"Presisjon, ±0,2 mm",calculate:"Beregn hurtigestimat",
    result_kicker:"Estimert produksjon",ex_vat:"eks. mva.",dimensions:"Ytre mål",model_volume:"STL-volum",material_use:"Estimert komponentvekt",print_time:"Printtid",layers:"Antall lag",confidence:"Estimatmargin",breakdown:"Kostnadsfordeling",material_cost:"Materiale og svinn",machine_cost:"Maskintid",setup_cost:"Oppsett og kvalitet",risk_cost:"Prosess-/geometripåslag",
    disclaimer:"Estimatoren analyserer geometri, volum, overflate, vegger, massive lag, fyllgrad, materialflyt, oppvarming, oppsett og prosessrisiko. Support, orientering, CNC og spesielle toleranser inngår ikke automatisk.",request_quote:"Be om verifisert tilbud",
    method_kicker:"PrusaSlicer-light",method_title:"Hva beregningen tar hensyn til",m1t:"Geometri",m1:"STL-volum, overflateareal, ytre mål, trekantantall og formkompleksitet.",m2t:"Ekstrudert volum",m2:"Skall, massive topp-/bunnlag og innvendig fyll beregnes separat.",m3t:"Produksjonstid",m3:"Materialavhengig volumstrøm, lagantall, bevegelser, oppvarming og håndtering.",m4t:"Pris og risiko",m4:"Materialpris, maskinsats, energibruk, svinn, geometri og minsteordre.",
    invalid_file:"Velg en gyldig binær eller ASCII STL-fil.",need_file:"Last opp en STL-fil først.",layer_nozzle:"Laghøyden bør normalt ikke overstige 80 % av dysediameteren.",parsed:"analysert",triangles:"trekanter",margin:"± {n} %"
  },
  en:{
    nav_home:"Home",header_cta:"Send inquiry",nav_services:"Products & Services",nav_materials:"Materials",nav_process:"Process",nav_estimates:"Estimates",nav_contact:"Contact",
    kicker:"Quick estimate",title:"Upload an STL and get a price estimate",intro:"The STL is analysed locally in your browser. The estimate is non-binding and must be verified before ordering.",privacy:"The file never leaves your browser",
    drop_title:"Drop your STL file here",drop_sub:"or click to choose a file",no_file:"No file selected",material:"Material",nozzle:"Nozzle diameter",layer:"Layer height",infill:"Infill",walls:"Wall lines / perimeters",topBottom:"Solid top/bottom layers",quantity:"Quantity",quality:"Production profile",quality_fast:"Fast / coarse, ±1.0 mm",quality_standard:"Standard, ±0.6 mm",quality_precision:"Precision, ±0.2 mm",calculate:"Calculate quick estimate",
    result_kicker:"Estimated production",ex_vat:"excl. VAT",dimensions:"Outer dimensions",model_volume:"STL volume",material_use:"Estimated component weight",print_time:"Print time",layers:"Layer count",confidence:"Estimate range",breakdown:"Cost breakdown",material_cost:"Material and waste",machine_cost:"Machine time",setup_cost:"Setup and quality",risk_cost:"Process/geometry allowance",
    disclaimer:"The estimator considers geometry, volume, surface area, walls, solid layers, infill, material flow, heating, setup and process risk. Supports, orientation, CNC and special tolerances are not automatically included.",request_quote:"Request verified quote",
    method_kicker:"PrusaSlicer-light",method_title:"What the calculation considers",m1t:"Geometry",m1:"STL volume, surface area, outer dimensions, triangle count and shape complexity.",m2t:"Extruded volume",m2:"Shells, solid top/bottom layers and internal infill are calculated separately.",m3t:"Production time",m3:"Material-dependent flow, layer count, movements, heating and handling.",m4t:"Price and risk",m4:"Material price, machine rate, energy, waste, geometry and minimum order.",
    invalid_file:"Choose a valid binary or ASCII STL file.",need_file:"Upload an STL file first.",layer_nozzle:"Layer height should normally not exceed 80% of nozzle diameter.",parsed:"analysed",triangles:"triangles",margin:"± {n}%"
  }
};

let language = localStorage.getItem("eiko_lang")==="en" ? "en" : "no";
let geometry = null;
let fileName = "";

const $ = id => document.getElementById(id);
const fmt = (n,d=0) => new Intl.NumberFormat(language==="en"?"en-GB":"nb-NO",{maximumFractionDigits:d,minimumFractionDigits:d}).format(n);
const nok = n => new Intl.NumberFormat(language==="en"?"en-GB":"nb-NO",{style:"currency",currency:"NOK",maximumFractionDigits:0}).format(n);

function setLanguage(lang){
  language=lang; localStorage.setItem("eiko_lang",lang); document.documentElement.lang=lang;
  document.querySelectorAll("[data-i18n]").forEach(el=>{const k=el.dataset.i18n;if(I18N[lang][k]) el.textContent=I18N[lang][k]});
  document.querySelectorAll("[data-i18n-option]").forEach(el=>{const k=el.dataset.i18nOption;if(I18N[lang][k]) el.textContent=I18N[lang][k]});
  $("btn-no").classList.toggle("active",lang==="no"); $("btn-en").classList.toggle("active",lang==="en");
  populateMaterials();
  if(geometry) showFileStatus();
  calculate(false);
}

function populateMaterials(){
  const old=$("material").value||"PEEK"; $("material").innerHTML="";
  Object.entries(MATERIALS).forEach(([key,m])=>{const o=document.createElement("option");o.value=key;o.textContent=m[language];$("material").appendChild(o)});
  $("material").value=MATERIALS[old]?old:"PEEK";
}

function showFileStatus(){
  $("fileStatus").textContent = `${fileName} · ${fmt(geometry.triangles)} ${I18N[language].triangles} · ${I18N[language].parsed}`;
}

function parseSTL(buffer){
  const dv=new DataView(buffer);
  const bytes=new Uint8Array(buffer);
  const binary = buffer.byteLength>=84 && (84 + dv.getUint32(80,true)*50 === buffer.byteLength);
  let tris=[];
  if(binary){
    const count=dv.getUint32(80,true); let o=84;
    for(let i=0;i<count;i++,o+=50){
      tris.push([
        [dv.getFloat32(o+12,true),dv.getFloat32(o+16,true),dv.getFloat32(o+20,true)],
        [dv.getFloat32(o+24,true),dv.getFloat32(o+28,true),dv.getFloat32(o+32,true)],
        [dv.getFloat32(o+36,true),dv.getFloat32(o+40,true),dv.getFloat32(o+44,true)]
      ]);
    }
  } else {
    const text=new TextDecoder().decode(bytes);
    const vals=[...text.matchAll(/vertex\s+([+\-.\deE]+)\s+([+\-.\deE]+)\s+([+\-.\deE]+)/g)].map(m=>[+m[1],+m[2],+m[3]]);
    if(vals.length<3 || vals.length%3) throw new Error("Invalid STL");
    for(let i=0;i<vals.length;i+=3) tris.push([vals[i],vals[i+1],vals[i+2]]);
  }
  let min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity],signed=0,area=0;
  for(const [a,b,c] of tris){
    for(const p of [a,b,c]) for(let k=0;k<3;k++){min[k]=Math.min(min[k],p[k]);max[k]=Math.max(max[k],p[k])}
    const ab=[b[0]-a[0],b[1]-a[1],b[2]-a[2]], ac=[c[0]-a[0],c[1]-a[1],c[2]-a[2]];
    const cross=[ab[1]*ac[2]-ab[2]*ac[1],ab[2]*ac[0]-ab[0]*ac[2],ab[0]*ac[1]-ab[1]*ac[0]];
    area += .5*Math.hypot(...cross);
    signed += (a[0]*(b[1]*c[2]-b[2]*c[1])-a[1]*(b[0]*c[2]-b[2]*c[0])+a[2]*(b[0]*c[1]-b[1]*c[0]))/6;
  }
  const size=max.map((v,i)=>v-min[i]), volume=Math.abs(signed);
  if(!Number.isFinite(volume)||volume<=0||area<=0) throw new Error("Invalid geometry");
  return {triangles:tris.length,min,max,size,volume,area};
}

function validate(){
  const nozzle=+$("nozzle").value,layer=+$("layer").value;
  let msg="";
  if(layer>nozzle*.8) msg=I18N[language].layer_nozzle;
  $("validation").textContent=msg;
  return !msg;
}

function estimate(){
  const g=geometry,m=MATERIALS[$("material").value];
  const nozzle=+$("nozzle").value, layer=+$("layer").value, infill=+$("infill").value/100;
  const walls=+$("walls").value, solidLayers=+$("topBottom").value, qty=+$("quantity").value;
  const profile=$("quality").value;
  const profileFactor={fast:.84,standard:1,precision:1.28}[profile];
  const wallThickness=nozzle*walls;
  const shellVolume=Math.min(g.volume*.78, g.area*wallThickness*.52);
  const footprint=Math.max(1,g.size[0]*g.size[1]);
  const solidVolume=Math.min(Math.max(0,g.volume-shellVolume), footprint*solidLayers*layer*1.10);
  const internal=Math.max(0,g.volume-shellVolume-solidVolume);
  const extruded=Math.min(g.volume, shellVolume+solidVolume+internal*infill);
  const supportAllowance = 1 + Math.min(.16, (g.area/Math.pow(g.volume,2/3)-4.84)*.018);
  const productionVolume=extruded*Math.max(1,supportAllowance);
  const massKg=productionVolume/1e6*m.density;
  const layers=Math.max(1,Math.ceil(g.size[2]/layer));
  const beadArea=Math.max(.1,nozzle*layer*.93);
  const nominalFlow=m.flow*Math.pow(nozzle/3,.55)*Math.pow(layer/1.5,.20)/profileFactor;
  const extrusionHours=productionVolume/Math.max(1,nominalFlow*1000*60);
  const complexity=Math.max(1,Math.min(2.2,(g.triangles/50000)*.18 + g.area/Math.pow(g.volume,2/3)/7));
  const layerMovesHours=layers*(0.0022+complexity*.0009);
  const heatHours=(.55*m.heat)+(Math.max(...g.size)>800?.35:0);
  const handlingHours=.45 + Math.log10(Math.max(10,g.triangles))*.035;
  const timeHours=(extrusionHours+layerMovesHours)*profileFactor+heatHours+handlingHours;
  const materialCost=massKg*m.priceKg*(1+m.waste);
  const machineCost=timeHours*m.machineRate;
  const setupCost=m.setup*(1+(profile==="precision"?.22:profile==="fast"?-.08:0));
  const geometryRisk=Math.min(.28, Math.max(0,(complexity-1)*.11 + (supportAllowance-1)*.8));
  const riskCost=(materialCost+machineCost+setupCost)*(m.risk+geometryRisk);
  const first=materialCost+machineCost+setupCost+riskCost;
  const repeatDiscount=qty>1 ? .94 : 1;
  const total=Math.max(2500, first + Math.max(0,qty-1)*(materialCost+machineCost*.92+riskCost*.72)*repeatDiscount);
  const rounded=Math.ceil(total/50)*50;
  const margin=Math.round(Math.min(35,Math.max(14,16+geometryRisk*55+(g.triangles<500?7:0))));
  return {m,qty,extruded,massKg,layers,timeHours,materialCost:materialCost*qty,machineCost:machineCost*qty,setupCost,riskCost:riskCost*qty,total:rounded,margin};
}

function calculate(requireFile=true){
  validate();
  if(!geometry){ if(requireFile)$("validation").textContent=I18N[language].need_file; return; }
  const e=estimate(),g=geometry;
  $("price").textContent=nok(e.total);
  $("dimensions").textContent=`${fmt(g.size[0],1)} × ${fmt(g.size[1],1)} × ${fmt(g.size[2],1)} mm`;
  $("mass").textContent=e.massKg*e.qty>=1?`${fmt(e.massKg*e.qty,2)} kg`:`${fmt(e.massKg*e.qty*1000,0)} g`;
}

function updateOutputs(){
  $("nozzleOut").textContent=`${fmt(+$("nozzle").value,2).replace(/([,.]00)$/,"")} mm`;
  $("layerOut").textContent=`${fmt(+$("layer").value,1)} mm`;
  $("infillOut").textContent=`${$("infill").value} %`;
  validate();
  calculate(false);
}

async function handleFile(file){
  if(!file || !file.name.toLowerCase().endsWith(".stl")){$("validation").textContent=I18N[language].invalid_file;return}
  try{
    geometry=parseSTL(await file.arrayBuffer()); fileName=file.name; showFileStatus(); $("validation").textContent=""; calculate(false);
  }catch(e){geometry=null;$("validation").textContent=I18N[language].invalid_file}
}

document.addEventListener("DOMContentLoaded",()=>{
  $("year").textContent=new Date().getFullYear();
  populateMaterials(); setLanguage(language); updateOutputs();
  $("btn-no").onclick=()=>setLanguage("no"); $("btn-en").onclick=()=>setLanguage("en");
  const dz=$("dropZone"),fi=$("stlFile");
  dz.onclick=()=>fi.click(); dz.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();fi.click()}};
  fi.onchange=()=>handleFile(fi.files[0]);
  ["dragenter","dragover"].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.add("dragover")}));
  ["dragleave","drop"].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.remove("dragover")}));
  dz.addEventListener("drop",e=>handleFile(e.dataTransfer.files[0]));
  ["nozzle","layer","infill","walls","topBottom","quantity","quality","material"].forEach(id=>$(id).addEventListener("input",updateOutputs));
  $("calculate").onclick=()=>calculate(true);
});
