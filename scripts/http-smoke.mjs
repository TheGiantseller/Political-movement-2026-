import { spawn } from "node:child_process";
import assert from "node:assert/strict";
const port=3107,base=`http://127.0.0.1:${port}`;
const server=spawn(process.execPath,["node_modules/next/dist/bin/next","start","-p",String(port)],{stdio:"ignore",env:{...process.env,NEXT_TELEMETRY_DISABLED:"1"}});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
try{
 let ready=false;
 for(let i=0;i<50;i++){try{const r=await fetch(base);if(r.ok){ready=true;break}}catch{}await sleep(500)}
 assert.ok(ready,"Next production server did not start");
 const homepage=await fetch(base);
 const csp=homepage.headers.get("content-security-policy")||"";
 for(const directive of ["default-src 'self'","script-src 'self'","style-src 'self'","object-src 'none'","base-uri 'self'","form-action 'self'","frame-ancestors 'none'"])assert.ok(csp.includes(directive),`missing CSP directive: ${directive}`);
 assert.ok(csp.includes("script-src 'self' 'unsafe-inline'"),"static homepage must allow Next.js inline bootstrap scripts");
 assert.ok(!csp.includes("style-src 'self' 'unsafe-inline'"),"production homepage must not allow inline styles");
 for(const [header,value] of [["x-content-type-options","nosniff"],["referrer-policy","strict-origin-when-cross-origin"],["x-frame-options","DENY"]])assert.equal(homepage.headers.get(header),value,`unexpected ${header}`);
 assert.ok(homepage.headers.get("permissions-policy")?.includes("camera=()"),"camera must be disabled");
 const homepageHtml=await homepage.text();
 assert.ok(/<script\b(?![^>]*\bsrc=)[^>]*>[\s\S]*?<\/script>/.test(homepageHtml),"static homepage should contain the framework bootstrap permitted by its CSP");
 const routes=["/","/reforme","/reforme/just-01-protectie-rapida-in-violenta-domestica","/legislatie","/legislatie/l001","/constitutii","/constitutii/c00","/calendar","/surse","/economie","/justitie-siguranta","/educatie-sanatate","/energie-infrastructura","/mediu-animale","/metodologie","/despre","/contact","/confidentialitate","/nota-legala","/accesibilitate","/cautare?q=scoala"];
 let firstDynamicNonce="";
 for(const route of routes){const response=await fetch(base+route);assert.equal(response.status,200,`${route} should respond 200`);const html=await response.text();assert.ok(html.includes("<html"),`${route} should render HTML`);assert.ok(!html.toLowerCase().includes("valentina"),`${route} exposed a withheld case reference`);if(route!=="/"){const policy=response.headers.get("content-security-policy")||"";const nonce=policy.match(/script-src[^;]*'nonce-([^']+)'/)?.[1];assert.ok(nonce,`${route} should use a CSP nonce`);assert.ok(policy.includes("'strict-dynamic'"),`${route} should enable strict-dynamic`);assert.ok(!policy.includes("'unsafe-inline'"),`${route} must not allow inline scripts or styles`);assert.ok(html.includes(`nonce="${nonce}"`),`${route} should apply the response nonce to framework scripts`);if(!firstDynamicNonce)firstDynamicNonce=nonce}if(route==="/confidentialitate"){assert.ok(html.includes("localStorage"),"privacy notice should disclose local browser storage");assert.ok(html.includes("identitatea operatorului"),"privacy notice should flag missing controller details")}}
 const secondDynamic=await fetch(base+"/reforme");const secondNonce=(secondDynamic.headers.get("content-security-policy")||"").match(/script-src[^;]*'nonce-([^']+)'/)?.[1];assert.ok(secondNonce&&secondNonce!==firstDynamicNonce,"dynamic route CSP nonces must be fresh per response");
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
