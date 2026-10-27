# Revizie de securitate și lansare legală

Revizuit la 27 octombrie 2026 pentru Preview-ul Vercel. Aceasta este o verificare tehnică și editorială orientativă, nu o certificare de securitate și nu opinie juridică.

## Stratul 1 — găzduire și marginea rețelei

- Proiectul existent `political-movement-2026` este configurat în Vercel cu `ssoProtection.deploymentType: all_except_custom_domains`; protecția de deployment este activă. Deployment-urile Preview și accesul la URL-urile lor trebuie verificate după fiecare schimbare de setare. Domeniul de producție existent nu a fost modificat.
- Vercel furnizează mitigare DDoS la nivelul platformei. Site-ul nu are API-uri, conturi sau operații de scriere server-side, deci nu adăugăm limite de rată pe rutele publice cache-uite, care ar putea bloca trafic legitim.
- Răspunsul de producție verificat folosește HTTPS și HSTS. Nu se activează preload sau reguli HSTS suplimentare în aplicație, deoarece nu există un domeniu propriu și nu știm dacă viitoarele subdomenii vor fi toate HTTPS.
- `.vercelignore` exclude sursele editoriale private, atașamentele, fișierele `.env*`, documentația internă și testele din pachetul deployat. Verifică lista `vercel deploy --dry --format=json` înainte de fiecare încărcare din CLI.

## Stratul 2 — browser și aplicație

- Paginile dinamice din catalog folosesc un nonce aleatoriu per răspuns și `strict-dynamic` pentru scripturile framework-ului; în producție nu acceptă `unsafe-inline`. Ruta principală rămâne generată static și folosește `unsafe-inline` numai pentru bootstrapul inline pe care Next.js îl emite pentru hidratare; stilurile inline sunt blocate, iar pagina nu încarcă scripturi terțe. Un test inițial cu CSP mai strictă a blocat hidratarea și comenzile de progres, așa că verificarea de release acoperă acum separat politica statică și nonce-urile dinamice.
- Sunt păstrate `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY` și o `Permissions-Policy` care dezactivează camera, microfonul și geolocația. CSP adaugă `frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'` și `form-action 'self'`.
- Inspecția codului nu a găsit `dangerouslySetInnerHTML`, API routes, Server Actions, formulare care trimit date sau importuri de scripturi terțe. React redă conținutul catalogului ca text, iar linkurile externe observate folosesc `noopener noreferrer`.
- Panoul admin este doar local: valorile de stare și data finalizării sunt în `localStorage` pe dispozitivul curent. Nu există cont, autentificare, autorizare sau sincronizare. Orice utilizator poate schimba starea în propriul browser; nu o folosi ca evidență oficială și nu adăuga date personale ori secrete.

## Stratul 3 — dependențe și livrare

- Workflow-ul CI are `contents: read`, acțiunile GitHub sunt fixate la commit SHA complete, iar `npm audit --audit-level=high` rulează la fiecare verificare.
- Dependabot este configurat să propună săptămânal actualizări pentru npm și GitHub Actions. Păstrează `package-lock.json` și folosește `npm ci` pentru instalări reproductibile.
- `npm audit` a raportat zero vulnerabilități în dependențele de producție și dezvoltare la data verificării. Rezultatul este un instantaneu, nu o garanție pentru build-uri viitoare.
- Repository-ul este public. `.gitignore` singur nu protejează un upload direct în Vercel; `.vercelignore` și verificarea manifestului sunt necesare pentru sursele locale private.

## Probleme care blochează lansarea publică

1. **Identitatea și contactul operatorului lipsesc.** Pagina publică spune încă „Contact public în curs de configurare”. Dacă operatorul și portalul intră sub incidența Legii 365/2002, art. 5, furnizorul trebuie să publice accesibil numele, domiciliul/sediul și datele de contact, plus identificatorii aplicabili. Confirmați aplicabilitatea și completați datele reale cu un avocat înainte de lansare.
2. **Informarea de confidențialitate este provizorie.** Pagina descrie acum `localStorage` și găzduirea de test, dar operatorul, temeiurile, scopurile exacte, destinatarii și retenția datelor tehnice/logurilor trebuie confirmate și completate. Dacă sunt colectate date personale, informațiile cerute de GDPR art. 13 trebuie oferite la colectare.
3. **Stocarea locală trebuie verificată juridic.** Panoul citește și scrie preferințe de progres în `localStorage`. Confirmați dacă funcția solicitată explicit de utilizator intră în excepția de strictă necesitate din Legea 506/2004 art. 4(6); altfel, cereți consimțământ înainte de citire/scriere sau eliminați stocarea.
4. **Regimul publicității politice depinde de utilizare.** Opinii editoriale fără plată/remunerație pot intra în excluderea art. 1(2) din Regulamentul (UE) 2024/900. Promovarea sponsorizată, remunerația în bani sau în natură ori targetarea politică pot schimba analiza și pot activa obligații de transparență și limitări de targetare. Nu activați reclame sau promovare plătită fără evaluare juridică și fluxul de informare cerut.
5. **Conținutul necesită revizuire juridică/editorială.** Sursele legislative și formulările din blueprint nu sunt validate ca drept în vigoare. JUST-03 și sursele S27/S28 rămân excluse din versiunea publică până la o decizie documentată.
6. **Setările GitHub nu sunt complet verificate.** Integrarea disponibilă nu a permis citirea regulilor de protecție a branch-ului (`403`). Confirmați în GitHub că `main` cere verificarea CI și review înainte de merge, și activați alertele Dependabot/secret scanning unde sunt disponibile. Nu puneți secrete în `NEXT_PUBLIC_*` sau în repository.

## Verificări înainte de publicare

- Rulați `npm run release:check`, `npm audit`, apoi un deploy Preview; confirmați CSP-ul static, nonce-urile proaspete pe paginile dinamice, paginile-cheie, filtrele, stările locale și răspunsul 404 în browser.
- Verificați în Vercel Dashboard că Preview Protection rămâne activă și că deployment-ul de test nu a fost promovat la Production.
- Revizuiți identitatea juridică/editorială, politica de confidențialitate și registrul surselor; validați licențele imaginilor și ale materialelor.
- Nu se poate garanta „fără atacuri” sau „complet legal”. Un audit manual suplimentar și revizuire juridică locală sunt necesare înaintea unei lansări publice ori a publicității politice plătite.

## Surse oficiale

- [Legea 365/2002, art. 5 — Portal Legislativ](https://legislatie.just.ro/Public/DetaliiDocument/37075)
- [Legea 506/2004, art. 4 — Portal Legislativ](https://legislatie.just.ro/Public/DetaliiDocument/257056)
- [GDPR, art. 13 — EUR-Lex](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679)
- [Regulamentul (UE) 2024/900 — EUR-Lex](https://eur-lex.europa.eu/eli/reg/2024/900/oj/eng)
- [Ghidul CSP Next.js](https://nextjs.org/docs/app/guides/content-security-policy)
- [Protecția deployment-urilor Vercel](https://vercel.com/docs/deployment-protection)
