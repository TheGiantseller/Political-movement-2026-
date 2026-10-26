import fs from "node:fs";
const sourcePath="content/source/Blueprint_Romania_2026_2030_Victor_v1.json";
if(!fs.existsSync(sourcePath)){
 const p=JSON.parse(fs.readFileSync("content/normalized/public-content.json","utf8"));
 const expected={reforms:50,laws:10,quarters:16,sources:32,constitutionalItems:11};
 for(const [k,v] of Object.entries(expected))if(p.inventory[k]!==v)throw new Error(`${k}: ${p.inventory[k]}, expected ${v}`);
 if(p.reforms.length!==49||p.sources.length!==30||p.reforms.some(x=>x.id==="JUST-03")||p.sources.some(x=>["S27","S28"].includes(x.id)))throw new Error("Public normalization does not match editorial filters.");
 console.log("Valid normalized content; private source is unavailable on this checkout.");process.exit(0);
}
const d=JSON.parse(fs.readFileSync(sourcePath,"utf8"));
const groups=[["reforme",d.portofoliu_reforme],["schițe legislative",d.schite_proiecte_de_lege],["trimestre",d.strategie_48_luni.calendar_16_trimestre],["surse",d.registru_surse],["acte constituționale",d.istorie_constitutionala.inventar]],expected=[50,10,16,32,11],errors=[];
for(let i=0;i<groups.length;i++){const [name,items]=groups[i];if(!Array.isArray(items))errors.push(`${name}: colecție lipsă`);else{if(items.length!==expected[i])errors.push(`${name}: ${items.length}, așteptat ${expected[i]}`);if(new Set(items.map(x=>x.id)).size!==items.length)errors.push(`${name}: ID-uri duplicate`)}}
const ids=new Set(d.registru_surse.map(x=>x.id));for(const r of d.portofoliu_reforme)for(const id of r.temeiuri_si_surse||[])if(!ids.has(id))errors.push(`${r.id}: sursă lipsă ${id}`);
for(const r of d.portofoliu_reforme)if(!r.propunere_autor||!r.riscuri_critice||!r.indicatori_propuși_fără_baseline_inventat)errors.push(`${r.id}: câmp editorial lipsă`);
if(errors.length){console.error(errors.join("\n"));process.exit(1)}console.log("Valid: 50 reforme, 10 schițe, 16 trimestre, 32 surse, 11 acte; ID-uri unice și surse rezolvate.");
