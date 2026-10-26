# Decizii de arhitectură

- Aplicație nouă Next.js App Router + React + TypeScript strict; fără clonarea codului demo electoral. Referința Election Lab indicată de brief este MIT, dar nu s-a preluat codul ei.
- JSON-ul de intrare este singura sursă a datelor propunerilor. Adapterul citește structura efectivă: `portofoliu_reforme`, `schite_proiecte_de_lege`, `strategie_48_luni.calendar_16_trimestre`, `registru_surse`, `istorie_constitutionala.inventar`.
- Pagini publice read-only, generate dinamic din date statice; fără bază de date, conturi, formular de contact, analytics sau cookie-uri neesențiale.
- Conținutul brut stă în `content/source`, niciodată în `public`. Nu există API care să îl servească brut.
- Fișa `JUST-03` și sursele S27/S28 sunt excluse din vizualizare până la o verificare editorială și juridică; brief-ul avertizează explicit asupra cazului penal și a identității victimei.
- Interfața păstrează statutul de propunere/schiță/plan, nu deduce implementare și redă costul nul ca „Neestimat”.
- Domeniul și URL-ul public nu sunt cunoscute. Proiectul rămâne noindex până la configurarea URL-ului și revizuirea pentru lansare.
