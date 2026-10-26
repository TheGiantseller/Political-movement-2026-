import fs from "node:fs";
const sourcePath="content/source/Blueprint_Romania_2026_2030_Victor_v1.json";
if(!fs.existsSync(sourcePath)){
  if(!fs.existsSync("content/normalized/public-content.json"))throw new Error("Lipsea atât sursa privată cât și conținutul normalizat.");
  console.log("Sursa privată nu este prezentă; folosesc normalizarea publică verificată din repository.");
  process.exit(0);
}
const d=JSON.parse(fs.readFileSync(sourcePath,"utf8"));
const reforms=d.portofoliu_reforme.filter(x=>x.id!=="JUST-03");
const sources=d.registru_surse.filter(x=>!["S27","S28"].includes(x.id));
const output={inventory:{reforms:d.portofoliu_reforme.length,laws:d.schite_proiecte_de_lege.length,quarters:d.strategie_48_luni.calendar_16_trimestre.length,sources:d.registru_surse.length,constitutionalItems:d.istorie_constitutionala.inventar.length},reforms,laws:d.schite_proiecte_de_lege,quarters:d.strategie_48_luni.calendar_16_trimestre,sources,constitutions:d.istorie_constitutionala.inventar,contentDate:d.model_date||d.data_referinta};
fs.mkdirSync("content/normalized",{recursive:true});fs.writeFileSync("content/normalized/public-content.json",JSON.stringify(output,null,2)+"\n");
console.log(`Normalizat ${reforms.length} fișe publice; 1 fișă de caz și 2 surse media reținute.`);
