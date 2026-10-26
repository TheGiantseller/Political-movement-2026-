import { spawn } from "node:child_process";
import assert from "node:assert/strict";
const port=3107,base=`http://127.0.0.1:${port}`;
const server=spawn(process.execPath,["node_modules/next/dist/bin/next","start","-p",String(port)],{stdio:"ignore",env:{...process.env,NEXT_TELEMETRY_DISABLED:"1"}});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
try{
 let ready=false;
 for(let i=0;i<50;i++){try{const r=await fetch(base);if(r.ok){ready=true;break}}catch{}await sleep(500)}
 assert.ok(ready,"Next production server did not start");
 const routes=["/","/reforme","/reforme/just-01-protectie-rapida-in-violenta-domestica","/legislatie","/legislatie/l001","/constitutii","/constitutii/c00","/calendar","/surse","/economie","/justitie-siguranta","/educatie-sanatate","/energie-infrastructura","/mediu-animale","/metodologie","/despre","/contact","/confidentialitate","/nota-legala","/accesibilitate","/cautare?q=scoala"];
 for(const route of routes){const response=await fetch(base+route);assert.equal(response.status,200,`${route} should respond 200`);const html=await response.text();assert.ok(html.includes("<html"),`${route} should render HTML`);assert.ok(!html.toLowerCase().includes("valentina"),`${route} exposed a withheld case reference`)}
 const favicon=await fetch(base+"/favicon.ico");assert.equal(favicon.status,200,"favicon should respond 200");assert.ok(favicon.headers.get("content-type")?.includes("image/x-icon"),"favicon should have an icon content type");
 const lawDetail=await fetch(base+"/legislatie/l001");assert.ok((await lawDetail.text()).includes("class=\"container breadcrumb\""),"legislation detail should provide a breadcrumb");
 const constitutionDetail=await fetch(base+"/constitutii/c00");assert.ok((await constitutionDetail.text()).includes("class=\"container breadcrumb\""),"constitution detail should provide a breadcrumb");
 const constitutionIndex=await fetch(base+"/constitutii");assert.ok((await constitutionIndex.text()).includes('href="/constitutii/c00"'),"constitution inventory should link to its detail pages");
 const accentSearch=await fetch(base+"/cautare?q=școlară");assert.equal(accentSearch.status,200);const accentHtml=(await accentSearch.text()).replaceAll("<!-- -->","");assert.ok(accentHtml.includes("4 rezultate pentru"),"accent-insensitive search should find school health proposals");assert.ok(accentHtml.includes("Cabinet medical funcțional"),"accent-insensitive search should render a matching result");
 const filteredReforms=await fetch(base+"/reforme?q=educatie&domeniu=educatie");assert.equal(filteredReforms.status,200);const filteredHtml=(await filteredReforms.text()).replaceAll("<!-- -->","");assert.ok(filteredHtml.includes("8 din 49 propuneri"),"search and domain filters should work together");
 const robots=await fetch(base+"/robots.txt");assert.equal(robots.status,200);assert.ok((await robots.text()).includes("Disallow: /"));
 const missing=await fetch(base+"/route-that-does-not-exist");assert.equal(missing.status,404);
 console.log(`HTTP smoke passed: ${routes.length} public routes, favicon, search and filters, robots, and 404.`);
}finally{server.kill("SIGTERM")}
