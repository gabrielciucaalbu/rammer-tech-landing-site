# Servicii (Services)

## Obiectiv

Pagina detaliata a serviciilor -- prezinta complet ce ofera Rammer Tech. Transforma interesul initial (de pe Home) in intelegere clara a capabilitatilor. Fiecare serviciu conduce vizittatorul catre un CTA de contact / cerere oferta.

## Ruta

`/[lang]/servicii`

## Sectiuni

### 1. Hero Servicii

- **Titlu** (H1): _"Servicii Software Complete pentru Afacerea Ta"_
- **Subtitlu**: Mesaj scurt care subliniaza abordarea end-to-end
- Design minimalist, fara CTA -- rolul e sa introduca pagina
- **Breadcrumb**: Acasa > Servicii

### 2. Dezvoltare Web & Mobile

- **Icon**: `Code` (Lucide)
- **Descriere completa**: 
  - Ce construim: aplicatii web responsive, SPA, PWA, aplicatii mobile (React Native / Flutter)
  - Abordare: de la analiza de requirements la deployment si mentenanta
  - Tehnologii cheie: React, Next.js, Node.js, TypeScript, etc.
- **Bullet points** cu sub-servicii:
  - Website-uri corporative si landing pages
  - Aplicatii web complexe (dashboards, platforme)
  - Aplicatii mobile cross-platform
  - API-uri si integrari third-party
  - MVP-uri si prototipuri rapide
- **Mini testimonial** sau cifra relevanta (optional)
- **CTA**: "Discuta proiectul tau" -> `/contact?serviciu=web-mobile`

### 3. Solutii Enterprise

- **Icon**: `Building2` (Lucide)
- **Descriere completa**:
  - Sisteme ERP personalizate
  - CRM adaptat pe nevoile business-ului
  - Platforme de Business Intelligence si raportare
  - Automatizarea proceselor interne
- **Bullet points**:
  - Sisteme ERP modulare
  - CRM cu pipeline de vanzari
  - Dashboards si rapoarte BI
  - Automatizari workflow
  - Integrare cu sisteme existente (contabilitate, HR, etc.)
- **CTA**: "Solicita o analiza gratuita" -> `/contact?serviciu=enterprise`

### 4. Consultanta IT & Strategie Digitala

- **Icon**: `Lightbulb` (Lucide)
- **Descriere completa**:
  - Audit tehnic al solutiilor existente
  - Arhitectura software si design de sistem
  - Strategie de digitalizare si modernizare
  - Selectia tehnologiilor potrivite
- **Bullet points**:
  - Audit si evaluare tehnica
  - Arhitectura de solutie
  - Strategie de migrare cloud
  - Optimizare performanta
  - Formare tehnica si transfer de cunostinte
- **CTA**: "Programeaza o consultatie" -> `/contact?serviciu=consultanta`

### 5. Achizitii Publice SEAP/SICAP

- **Icon**: `ShieldCheck` (Lucide)
- **Descriere completa**:
  - Expertiza completa in Sistemul Electronic de Achizitii Publice
  - Suport atat pentru autoritati contractante cat si operatori economici
  - Dezvoltare de solutii software integrate cu ecosistemul SEAP
- **Bullet points**:
  - Pregatirea documentatiei de licitatie
  - Depunerea ofertelor in SEAP
  - Monitorizare oportunitati de achizitii
  - Conformitate SICAP
  - Dezvoltare platforme integrate cu API-ul SEAP
  - Training SEAP/SICAP
- **CTA**: "Afla mai multe despre SEAP/SICAP" -> `/seap-sicap` (trimite la pagina dedicata)
- **Nota**: Aceasta sectiune serveste ca punte catre pagina dedicata SEAP/SICAP care ofera informatii mult mai detaliate

### 6. Procesul nostru de lucru (Workflow)

- Timeline / stepper vizual cu etapele de lucru:
  1. **Descoperire** -- Intelegem nevoile si obiectivele
  2. **Planificare** -- Definim arhitectura, timeline si buget
  3. **Dezvoltare** -- Iteratii agile cu feedback constant
  4. **Testare** -- QA riguros, teste automate
  5. **Lansare** -- Deployment si go-live
  6. **Suport** -- Mentenanta si imbunatatiri continue
- Design: stepper vertical pe mobile, horizontal pe desktop
- **Animatie**: Progresie animata la scroll

### 7. CTA Banner final

- Componenta partajata `CtaBanner`
- Mesaj: _"Pregatit sa incepi? Hai sa discutam despre proiectul tau."_
- Buton: "Solicita o oferta" -> `/contact`

---

## Continut necesar de la client

- [ ] Lista completa de tehnologii utilizate (cu logo-uri daca se doreste)
- [ ] Cifre de impact per serviciu (optional: "peste X proiecte web livrate")
- [ ] Detalii despre procesul real de lucru (validare a etapelor descrise)
- [ ] Eventuale testimoniale per serviciu

## Componente React necesare

| Componenta | Tip | Fisier |
|------------|-----|--------|
| `ServicesHero` | Server | `src/app/[lang]/servicii/_components/services-hero.tsx` |
| `ServiceDetailCard` | Server | `src/app/[lang]/servicii/_components/service-detail-card.tsx` |
| `WorkflowTimeline` | Client (animatii) | `src/app/[lang]/servicii/_components/workflow-timeline.tsx` |
| `CtaBanner` | Server (shared) | `src/components/cta-banner.tsx` |

## SEO

- **Title**: `Servicii Software -- Dezvoltare Web, Mobile, Enterprise | Rammer Tech`
- **Meta description**: `Servicii complete de dezvoltare software: aplicatii web si mobile, solutii enterprise, consultanta IT si expertiza achizitii publice SEAP/SICAP.`
- **H1**: Unic, diferit de Home
- **H2**: Cate un H2 per serviciu
- **Schema.org**: `Service` per fiecare serviciu

## CTA-uri principale

1. CTA-uri per serviciu -> `/contact?serviciu=<tip>` (pre-populeaza formularul)
2. "Solicita o oferta" -> `/contact` (banner final)
3. "Afla mai multe despre SEAP/SICAP" -> `/seap-sicap` (link intern)

## Note

- Layout-ul trebuie sa permita citirea rapida (scanare vizuala) -- utilizatorii nu citesc tot
- Fiecare sectiune de serviciu trebuie sa fie self-contained si sa aiba propriul CTA
- Serviciul SEAP/SICAP trimite catre pagina dedicata pentru mai mult detaliu
- Pagina poate fi lunga -- consideram sticky navigation sau un mini-menu lateral pe desktop
- Parametrul `?serviciu=` din CTA-uri ajuta la pre-completarea formularului de contact
