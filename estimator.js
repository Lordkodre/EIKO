
"use strict";

const MATERIALS = {
  // priceKg is NOK/kg. Filament2Print pellet prices converted at 1 EUR = 10.8445 NOK.
  // Materials not listed there are conservative market estimates.
  PEEK:  {no:"PEEK", en:"PEEK", density:1.30, priceKg:2550, hpp:true,  smallFlow:0.65, lfamFlow:24, smallRate:190, lfamRate:545, setupSmall:550, setupLFAM:1450, heat:1.35, waste:.15, risk:.15},
  PEKK:  {no:"PEKK-CF", en:"PEKK-CF", density:1.28, priceKg:3700, hpp:true, smallFlow:0.60, lfamFlow:22, smallRate:195, lfamRate:560, setupSmall:375, setupLFAM:1550, heat:1.38, waste:.15, risk:.17},
  PEI:   {no:"PEI / ULTEM™", en:"PEI / ULTEM™", density:1.27, priceKg:1490, hpp:true, smallFlow:0.72, lfamFlow:27, smallRate:185, lfamRate:510, setupSmall:525, setupLFAM:1350, heat:1.25, waste:.15, risk:.13},
  PPS:   {no:"PPS", en:"PPS", density:1.35, priceKg:780, hpp:true, smallFlow:0.78, lfamFlow:30, smallRate:180, lfamRate:485, setupSmall:500, setupLFAM:1250, heat:1.20, waste:.15, risk:.12},
  PSU:   {no:"PSU", en:"PSU", density:1.24, priceKg:690, hpp:true, smallFlow:0.82, lfamFlow:32, smallRate:175, lfamRate:465, setupSmall:375, setupLFAM:1150, heat:1.16, waste:.15, risk:.10},
  PA6CF: {no:"PA6-CF", en:"PA6-CF", density:1.18, priceKg:540, hpp:false, smallFlow:0.88, lfamFlow:38, smallRate:165, lfamRate:425, setupSmall:325, setupLFAM:1000, heat:1.08, waste:.15, risk:.08},
  ABS:   {no:"ABS", en:"ABS", density:1.04, priceKg:110, hpp:false, smallFlow:1.00, lfamFlow:46, smallRate:155, lfamRate:360, setupSmall:350, setupLFAM:700, heat:1.02, waste:.15, risk:.06},
  PETG:  {no:"PETG", en:"PETG", density:1.27, priceKg:145, hpp:false, smallFlow:0.90, lfamFlow:44, smallRate:110, lfamRate:350, setupSmall:600, setupLFAM:650, heat:1.00, waste:.15, risk:.05},
  ASA:   {no:"ASA", en:"ASA", density:1.07, priceKg:155, hpp:false, smallFlow:0.92, lfamFlow:43, smallRate:165, lfamRate:365, setupSmall:375, setupLFAM:725, heat:1.03, waste:.15, risk:.06},
  PLA:   {no:"PLA", en:"PLA", density:1.24, priceKg:115, hpp:false, smallFlow:1.05, lfamFlow:50, smallRate:145, lfamRate:335, setupSmall:325, setupLFAM:600, heat:.96, waste:.15, risk:.04}
};

const PROFIT_MARGIN = 0.20;
const MAX_RISK_RESERVE = 1500;

const I18N = {
  no:{
    nav_home:"Hjem",header_cta:"Send forespørsel",nav_services:"Produkter & Tjenester",nav_materials:"Materialer",nav_process:"Prosess",nav_estimates:"Estimater",nav_contact:"Kontakt",
    kicker:"Hurtigestimat",title:"Last opp STL og få et prisestimat",intro:"STL-filen analyseres lokalt i nettleseren. Estimatet er uforpliktende og må verifiseres før bestilling.",privacy:"Filen forlater ikke nettleseren",
    drop_title:"Dra STL-filen hit",drop_sub:"eller klikk for å velge fil",no_file:"Ingen fil valgt",material:"Materiale",nozzle:"Dysestørrelse",layer:"Laghøyde",infill:"Fyllgrad",walls:"Vegglinjer / perimetere",topBottom:"Massive topp-/bunnlag",quantity:"Antall",postprocess:"Etterbearbeiding",post_none:"Ingen etterbearbeiding",post_cleanup:"Standard rensk – support og kanter",post_inspect:"Rensk og kontroll – support, kanter og måling",calculate:"Beregn hurtigestimat",
    result_kicker:"Estimert produksjon",ex_vat:"eks. mva.",dimensions:"Ytre mål",model_volume:"STL-volum",material_use:"Estimert komponentvekt",print_time:"Printtid",layers:"Antall lag",confidence:"Estimatmargin",breakdown:"Kostnadsfordeling",material_cost:"Materiale og svinn",machine_cost:"Maskintid",setup_cost:"Oppsett og etterbearbeiding",risk_cost:"Risikoreserve",profit_cost:"Fortjeneste (20 %)",
    disclaimer:"Estimatoren er kun veiledende og viser ikke endelig pris. Endelig tilbud gis etter en teknisk vurdering.",request_quote:"Be om verifisert tilbud",
    method_kicker:"PrusaSlicer-light",method_title:"Hva beregningen tar hensyn til",m1t:"Geometri",m1:"STL-volum, overflateareal, ytre mål, trekantantall og formkompleksitet.",m2t:"Ekstrudert volum",m2:"Skall, massive topp-/bunnlag og innvendig fyll beregnes separat.",m3t:"Produksjonstid",m3:"Materialavhengig volumstrøm, lagantall, bevegelser, oppvarming og håndtering.",m4t:"Pris og risiko",m4:"Materialpris, maskinsats, energibruk, svinn, geometri og minsteordre.",
    invalid_file:"Velg en gyldig binær eller ASCII STL-fil.",need_file:"Last opp en STL-fil først.",layer_nozzle:"Laghøyden bør normalt ikke overstige 80 % av dysediameteren.",parsed:"analysert",triangles:"trekanter",margin:"± {n} %"
  },
  en:{
    nav_home:"Home",header_cta:"Send inquiry",nav_services:"Products & Services",nav_materials:"Materials",nav_process:"Process",nav_estimates:"Estimates",nav_contact:"Contact",
    kicker:"Quick estimate",title:"Upload an STL and get a price estimate",intro:"The STL is analysed locally in your browser. The estimate is non-binding and must be verified before ordering.",privacy:"The file never leaves your browser",
    drop_title:"Drop your STL file here",drop_sub:"or click to choose a file",no_file:"No file selected",material:"Material",nozzle:"Nozzle diameter",layer:"Layer height",infill:"Infill",walls:"Wall lines / perimeters",topBottom:"Solid top/bottom layers",quantity:"Quantity",postprocess:"Post-processing",post_none:"No post-processing",post_cleanup:"Standard cleanup – supports and edges",post_inspect:"Cleanup and inspection – supports, edges and measurement",calculate:"Calculate quick estimate",
    result_kicker:"Estimated production",ex_vat:"excl. VAT",dimensions:"Outer dimensions",model_volume:"STL volume",material_use:"Estimated component weight",print_time:"Print time",layers:"Layer count",confidence:"Estimate range",breakdown:"Cost breakdown",material_cost:"Material and waste",machine_cost:"Machine time",setup_cost:"Setup and post-processing",risk_cost:"Risk reserve",profit_cost:"Profit (20%)",
    disclaimer:"The estimate is for guidance only and is not a final price. A final quotation is provided after a technical review.",request_quote:"Request verified quote",
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
  const walls=Math.max(1,+$("walls").value), solidLayers=Math.max(1,+$("topBottom").value);
  const qty=Math.max(1,Math.floor(+$("quantity").value||1));
  const postprocess=$("postprocess").value;
  const isLFAM=m.hpp || g.size.some(v=>v>400);

  const wallThickness=nozzle*walls;
  const shellVolume=Math.min(g.volume*.78,g.area*wallThickness*.52);
  const footprint=Math.max(1,g.size[0]*g.size[1]);
  const solidVolume=Math.min(Math.max(0,g.volume-shellVolume),footprint*solidLayers*layer*1.10);
  const internal=Math.max(0,g.volume-shellVolume-solidVolume);
  const extruded=infill>=.999 ? g.volume : Math.min(g.volume,shellVolume+solidVolume+internal*infill);

  const shapeIndex=g.area/Math.max(1,Math.pow(g.volume,2/3));
  const supportAllowance=1+Math.max(0,Math.min(.14,(shapeIndex-5.2)*.015));
  const productionVolume=extruded*supportAllowance;
  const massKg=productionVolume/1e6*m.density;
  const layers=Math.max(1,Math.ceil(g.size[2]/layer));

  const baseFlow=isLFAM?m.lfamFlow:m.smallFlow;
  const referenceNozzle=isLFAM?3:.6;
  const referenceLayer=isLFAM?1.5:.3;
  const nominalFlow=baseFlow*Math.pow(nozzle/referenceNozzle,.55)*Math.pow(layer/referenceLayer,.20);
  const extrusionHours=productionVolume/Math.max(1,nominalFlow*1000*60);
  const complexity=Math.max(1,Math.min(2.0,(g.triangles/60000)*.15+shapeIndex/7.5));
  const layerMovesHours=layers*((isLFAM?.0012:.00075)+complexity*(isLFAM?.00045:.00028));
  const heatHours=(isLFAM?.35:.12)*m.heat+(Math.max(...g.size)>800?.25:0);
  const handlingHours=isLFAM ? .28+Math.log10(Math.max(10,g.triangles))*.025 : .10;
  const unitTimeHours=Math.max(isLFAM?.25:.10,extrusionHours+layerMovesHours+heatHours+handlingHours);

  // Repeated small parts are normally printed in batches; LFAM parts are treated sequentially.
  const batchEfficiency=isLFAM ? 1 : Math.max(.72,1-Math.min(qty-1,20)*.014);
  const totalTimeHours=unitTimeHours*qty*batchEfficiency;
  const machineRate=isLFAM?m.lfamRate:m.smallRate;
  const materialCost=massKg*m.priceKg*(1+m.waste)*qty;
  const machineCost=totalTimeHours*machineRate;
  const setupCost=isLFAM?m.setupLFAM:m.setupSmall;

  const postRates={none:{base:0,each:0},cleanup:{base:250,each:35},inspect:{base:450,each:75}};
  const post=postRates[postprocess]||postRates.none;
  const postCost=post.base+post.each*qty;
  const geometryRisk=Math.max(0,Math.min(.18,(complexity-1)*.08+(supportAllowance-1)*.65));
  const riskBase=materialCost+machineCost+setupCost+postCost;
  const riskCost=Math.min(MAX_RISK_RESERVE,riskBase*(m.risk+geometryRisk));
  const costBeforeProfit=materialCost+machineCost+setupCost+postCost+riskCost;
  const profitCost=costBeforeProfit*PROFIT_MARGIN;
  const total=Math.max(isLFAM?2500:750,costBeforeProfit+profitCost);
  const rounded=Math.ceil(total/50)*50;
  const margin=Math.round(Math.min(32,Math.max(12,14+geometryRisk*60+(g.triangles<500?5:0))));
  return {m,qty,isLFAM,extruded,massKg,layers,unitTimeHours,totalTimeHours,materialCost,machineCost,setupCost:setupCost+postCost,riskCost,profitCost,total:rounded,margin};
}
function calculate(requireFile=true){
  validate();
  if(!geometry){if(requireFile)$('validation').textContent=I18N[language].need_file;return;}
  const e=estimate(),g=geometry;
  $('price').textContent=nok(e.total);
  $('dimensions').textContent=`${fmt(g.size[0],1)} × ${fmt(g.size[1],1)} × ${fmt(g.size[2],1)} mm`;
  $('mass').textContent=e.massKg*e.qty>=1?`${fmt(e.massKg*e.qty,2)} kg`:`${fmt(e.massKg*e.qty*1000,0)} g`;
}
function updateOutputs(){
  $("nozzleOut").textContent=`${fmt(+$("nozzle").value,2).replace(/([,.]00)$/,"")} mm`;
  $("layerOut").textContent=`${fmt(+$("layer").value,2).replace(/([,.]00)$/,"")} mm`;
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
  ["nozzle","layer","infill","walls","topBottom","quantity","postprocess","material"].forEach(id=>$(id).addEventListener("input",updateOutputs));
  $("calculate").onclick=()=>calculate(true);
});
