import raw from "@/content/normalized/public-content.json";
export type Reform = {
 id:string;sector:string;titlu:string;statut_origine:string;propunere_autor:string;design_implementabil:string;instrument_juridic_probabil:string;temeiuri_si_surse:string[];verificari_legale_necesare:string;faza_in_mandat:string;indicatori_propuși_fără_baseline_inventat:string[];riscuri_critice:string;masuri_de_garantare:string;prioritate:string;buget:string;responsabili_propuși:string[];stare:string;conditie_decizie:string;estime_financiare_de_colectat:Record<string,string|number|null>;definitie_KPI:string;test_responsabilitate:string;
};
export type Law={id:string;titlu:string;obiect:string;articole_schita:string[];analiza_necesara:string};
export type Quarter={id:string;luni_mandat:number[];livrabile_minime:string[];cost_estimat_LEI:number|null;surse_finantare_confirmate:string[];criteriu_trecere:string;audit_public:boolean};
export type Source={id:string;titlu:string;url:string;consultat_referinta?:string;nota?:string};
export type Constitution=Record<string,unknown>&{an?:number|string;titlu?:string;url_text_integral?:string};
const d=raw as unknown as {inventory:{reforms:number;laws:number;quarters:number;sources:number;constitutionalItems:number};reforms:Reform[];laws:Law[];quarters:Quarter[];sources:Source[];constitutions:Constitution[];contentDate:string};
export const reforms=d.reforms,laws=d.laws,quarters=d.quarters,sources=d.sources,constitutions=d.constitutions;
export const totalReformCount=d.inventory.reforms,totalSourceCount=d.inventory.sources,contentDate=d.contentDate;
export type ReformDraftLink={lawId:string;articleNumbers:number[]};
const reformDraftLinks:Record<string,ReformDraftLink>={
 "JUST-01":{lawId:"L001",articleNumbers:[1,2,3,4,5]},
 "JUST-02":{lawId:"L002",articleNumbers:[1,2,3]},
 "JUST-04":{lawId:"L001",articleNumbers:[2,3,4]},
 "ROAD-01":{lawId:"L003",articleNumbers:[1,2,3,4,5]},
 "ROAD-02":{lawId:"L004",articleNumbers:[2,3,4]},
 "ROAD-03":{lawId:"L004",articleNumbers:[1,2,3,4]},
 "ANIM-01":{lawId:"L005",articleNumbers:[1,2]},
 "ANIM-02":{lawId:"L005",articleNumbers:[2,3,4,5]},
 "ANIM-04":{lawId:"L005",articleNumbers:[1]},
 "EDU-07":{lawId:"L006",articleNumbers:[4]},
 "EDU-08":{lawId:"L006",articleNumbers:[5]},
 "EDU-09":{lawId:"L006",articleNumbers:[2,3]},
 "EDU-10":{lawId:"L006",articleNumbers:[1,3]},
 "EDU-11":{lawId:"L006",articleNumbers:[2,3]},
 "EDU-12":{lawId:"L006",articleNumbers:[2,3]},
 "ECO-01":{lawId:"L010",articleNumbers:[1,2,4]},
 "ECO-04":{lawId:"L010",articleNumbers:[1,2,3,4]},
 "AUTO-02":{lawId:"L007",articleNumbers:[4]},
 "AUTO-03":{lawId:"L007",articleNumbers:[1]},
 "AUTO-04":{lawId:"L007",articleNumbers:[2]},
 "AUTO-05":{lawId:"L007",articleNumbers:[2]},
 "AUTO-06":{lawId:"L007",articleNumbers:[3]},
 "FOR-01":{lawId:"L008",articleNumbers:[3,4]},
 "FOR-02":{lawId:"L008",articleNumbers:[2]},
 "FOR-03":{lawId:"L008",articleNumbers:[1]},
 "FOR-04":{lawId:"L008",articleNumbers:[2]},
 "FOR-05":{lawId:"L008",articleNumbers:[4]},
 "FOR-06":{lawId:"L008",articleNumbers:[2]},
 "DEF-01":{lawId:"L009",articleNumbers:[1,2,3,4]},
};
const legalArticleMentions:Record<string,{text:string;sourceId:string}[]>={
 "JUST-02":[{text:"art. 21 și 23 din Constituție",sourceId:"S08"}],
 "ROAD-02":[{text:"art. 192 din Codul penal",sourceId:"S13"}],
 "ANIM-01":[{text:"art. 25 din Legea nr. 205/2004",sourceId:"S14"}],
 "ANIM-02":[{text:"art. 25 din Legea nr. 205/2004",sourceId:"S14"}],
 "EDU-03":[{text:"art. 29 și 32 din Constituție",sourceId:"S08"}],
 "EDU-05":[{text:"art. 16 din Constituție",sourceId:"S08"}],
 "EDU-08":[{text:"art. 26 din Constituție",sourceId:"S08"}],
 "DEF-01":[{text:"art. 55 din Constituție",sourceId:"S08"}],
 "GOV-01":[{text:"art. 150–152 din Constituție",sourceId:"S08"}],
 "GOV-03":[{text:"art. 1, 16, 21, 23, 124, 125 și 152 din Constituție",sourceId:"S08"}],
};
export function reformDraftLink(reformId:string){return reformDraftLinks[reformId]}
export function legalArticlesForReview(reformId:string){return legalArticleMentions[reformId]||[]}
export function sectorName(sector:string){const names:Record<string,string>={justitie:"Justiție și siguranță",siguranta_rutiera:"Justiție și siguranță",frontiere:"Justiție și siguranță",educatie:"Educație și sănătate",sanatate_scolara:"Educație și sănătate",economie:"Economie",auto_fiscalitate:"Economie",energie:"Energie și infrastructură",transport:"Energie și infrastructură",mediu:"Mediu și animale",protectia_animalelor:"Mediu și animale",paduri:"Mediu și animale",aparare:"Apărare",institutii:"Instituții"};return names[sector.toLowerCase()]||sector.replaceAll("_"," ").replace(/^./,x=>x.toUpperCase())}
export function slugify(value:string){return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/ș/g,"s").replace(/ț/g,"t").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}
export function reformSlug(r:Reform){return `${r.id.toLowerCase()}-${slugify(r.titlu)}`}
export function searchText(value:string){return value.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase("ro-RO")}
export function formatCost(value:number|null|undefined){return value==null?"Neestimat":`${new Intl.NumberFormat("ro-RO").format(value)} lei`}
