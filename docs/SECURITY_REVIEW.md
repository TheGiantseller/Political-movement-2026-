# Security review

- Interfață read-only; fără conturi vizitator, API de editare, formular de contact, analytics sau cookie tracking.
- JSON brut este local în `content/source/`, ignorat de Git și nu este sub `public`. Build-ul folosește `content/normalized/public-content.json`; fișa de caz JUST-03 și referințele media S27/S28 au fost excluse de normalizator.
- Linkurile externe folosesc `noopener noreferrer`.
- Headere verificate pe server: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`, `Permissions-Policy` restrictiv.
- `poweredByHeader` dezactivat; fișierul `.env.example` conține doar URL-ul public local.
- `npm audit` (toate dependențele) a raportat zero vulnerabilități la 26 octombrie 2026.
- Nu este configurat CSP. Link checking, audit OWASP, setări de hosting și logare/retention cer verificare după alegerea platformei.
- `robots.txt` blochează indexarea până la aprobarea editorială și configurarea URL-ului public.
