# Runbook de publicare

Starea curentă: doar local. Niciun repository GitHub, Preview, deployment Production sau domeniu nu a fost configurat/verificat.

1. Revizuiește `docs/EDITORIAL_REVIEW.md`, actualizează sursele juridice și aprobă identitatea editorială/contactul.
2. Creează repository GitHub dedicat și conectează proiectul în Vercel.
3. Configurează Preview pe pull request și Production pe `main`.
4. Setează `NEXT_PUBLIC_SITE_URL` la URL-ul Vercel real; actualizează `app/robots.ts` și `app/sitemap.ts` pentru indexare publică numai după aprobarea editorială.
5. Completează detaliile reale ale operatorului și găzduirii în pagina de confidențialitate.
6. Rulează `npm run release:check`; apoi verifică Preview: homepage, catalog, detalii, surse, robots, sitemap, 404, mobil și tastatură.
7. Publică Production după revizuirea umană, apoi verifică HTTP 200 și URL-ul HTTPS real.
8. Pentru rollback, redeployează deploymentul anterior din Vercel și verifică din nou rutele principale.

Nu există domeniu cumpărat sau rezervat în configurația proiectului.
