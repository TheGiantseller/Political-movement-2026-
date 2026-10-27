# Runbook de test și publicare

Starea verificată la 27 octombrie 2026: repository GitHub public `TheGiantseller/Political-movement-2026-`, proiect Vercel `political-movement-2026`, deployment Production existent. Deploy-urile de test se fac ca Preview cu Vercel CLI; nu rula `vercel --prod` pentru verificarea curentă.

1. Rulează `npm run release:check` și `npm audit`.
2. Leagă checkout-ul local numai de proiectul Vercel `political-movement-2026` din scope-ul `go-beyondllc`; nu descarcă variabile de mediu dacă build-ul nu are nevoie de ele.
3. Rulează `vercel deploy --dry --format=json` și confirmă că manifestul exclude `content/source/`, `source-package/`, `.codex-remote-attachments/` și orice `.env*`.
4. Rulează `vercel deploy` fără `--prod`. Păstrează URL-ul rezultat ca Preview și verifică faptul că Deployment Protection îl acoperă.
5. Verifică în browser homepage, `/reforme`, o fișă de reformă, `/legislatie/l001`, `/surse`, `/confidentialitate`, `/robots.txt`, sitemap și 404. Confirmă CSP-ul paginii statice și nonce-urile CSP pe paginile dinamice, filtrele și comportamentul panoului local.
6. Nu promova testul la Production până când identitatea operatorului și datele de contact, politica de confidențialitate, analiza `localStorage`, conținutul și eventualul regim de publicitate politică nu au fost revizuite și completate.
7. Orice push pe `main` poate declanșa deploy-ul Production prin integrarea GitHub–Vercel. Înainte de push verifică diff-ul și arborele exact; păstrează fișierele brute private în afara commitului.
8. Pentru rollback, folosește redeploy-ul anterior din Vercel și verifică din nou rutele și headerele principale.
