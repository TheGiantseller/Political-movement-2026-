# QA raport

Status: proiect local build-uit, fără deployment.

## Verificări rulate

- `npm run content:validate` — PASS: 50 intrări, 10 schițe, 16 trimestre, 32 surse, 11 acte; ID-uri unice și referințe de sursă valide.
- `npm test` — PASS: 4 verificări unitare pentru inventar, referințe, filtrarea cazului/media și costuri necunoscute.
- `npm run lint` — PASS.
- `npm run typecheck` — PASS.
- `npm run build` — PASS: build de producție Next.js 16.4.3.
- `npm run test:e2e` — PASS: 21 rute HTML, robots și răspunsul 404 pe serverul build-uit.
- Smoke local manual — PASS: 23 URL-uri verificate cu HTTP 200, plus 404; șirul cazului reținut lipsește din toate paginile verificate.
- `npm audit` — PASS: zero vulnerabilități raportate.
- Headere HTTP — nosniff, strict-origin referrer, frame denial și permissions policy prezente.

## Limitări rămase

- Nu s-au făcut verificări Playwright în browser, scanări axe, Lighthouse, validare de tastatură/screen reader sau testare vizuală pe toate dimensiunile.
- Linkurile și afirmațiile juridice nu au fost revizuite individual pentru actualitate.
- CSP, monitorizarea linkurilor externe și detaliile reale de hosting/operator rămân de configurat înainte de lansare.
- Site-ul este `noindex`, `robots.txt` blochează indexarea, iar sitemap-ul nu listează URL-uri publice până la alegerea domeniului și aprobarea editorială.
- Niciun deployment Preview/Production nu a fost efectuat.
