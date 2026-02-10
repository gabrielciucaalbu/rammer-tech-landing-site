# Produse (Products -- Software Propriu)

## Obiectiv

Prezinta produsele software proprii dezvoltate de Rammer Tech. Aceasta pagina diferentiaza firma de un simplu service shop -- arata ca Rammer Tech nu doar livreaza proiecte pentru altii, ci **investeste in propriile idei**. Poate genera venituri recurente (SaaS) si lead-uri.

## Ruta

- Lista produse: `/[lang]/produse`
- Produs individual: `/[lang]/produse/[slug]` (cand sunt mai multe produse)

## Sectiuni

### 1. Hero Produse

- **Titlu** (H1): _"Software-ul Nostru"_ sau _"Produsele Rammer Tech"_
- **Subtitlu**: _"Nu doar construim software pentru altii -- cream si propriile solutii pentru probleme reale."_
- **Breadcrumb**: Acasa > Produse

### 2. Produs Principal (Feature showcase)

- **Nume produs** (H2)
- **Tagline**: O propozitie care rezuma valoarea produsului
- **Descriere**: 2-3 paragrafe despre ce face, pentru cine si de ce exista
- **Screenshot / mockup principal**: Imagine mare, calitativa, pe device
- **Lista de features** (6-8 features cheie):
  - Fiecare cu icon + titlu scurt + descriere 1 rand
  - Design: Grid 2x3 sau 2x4
- **Tehnologii utilizate**: Badges cu tech stack (optional, pentru audienta tehnica)
- **Status**: In development / Beta / Live
- **CTA**:
  - Daca e live: "Incearca gratuit" / "Solicita demo"
  - Daca e in development: "Inscrie-te pentru early access" / "Fii primul care afla"

### 3. Problema pe care o rezolva

- Sectiune de tip "pain points":
  - Ce probleme au utilizatorii tinta?
  - De ce solutiile existente nu sunt suficiente?
  - Cum rezolva produsul nostru aceste probleme?
- Format: Before/After sau Pain -> Solution layout
- Design: 2 coloane (problema pe stanga, solutia pe dreapta)

### 4. Cum functioneaza (How it works)

- 3-4 pasi simplificati:
  1. Creezi cont / Configurezi
  2. Importi datele / Conectezi
  3. Automatizezi / Monitorizezi
  4. Analizezi / Optimizezi
- Design: Stepper vizual cu ilustratii/screenshots per pas
- **Animatie**: Progresie la scroll

### 5. Preturi / Pachete (optional -- depinde de stadiu)

- Daca produsul e live sau in beta:
  - 2-3 pachete (Free / Pro / Enterprise)
  - Tabel comparativ de features
  - CTA per pachet
- Daca e in development:
  - "Preturile vor fi anuntate la lansare"
  - Early bird pricing (daca exista)
- Design: Cards de pricing side-by-side, highlight pe pachetul recomandat

### 6. Roadmap / Ce urmeaza (optional)

- Timeline cu features planificate
- Arata ca produsul evolueaza activ
- Design: Timeline vertical simplu

### 7. Produse viitoare / Secundare (cand vor fi)

- Grid simplu cu carduri teaser:
  - Nume + tagline + "Coming soon"
  - Posibilitate de subscribe pentru notificari

### 8. CTA Banner

- Mesaj adaptat la stadiul produsului:
  - Live: _"Incepe sa folosesti [Produs] astazi."_
  - Beta: _"Fii printre primii care testeaza [Produs]."_
  - Development: _"Vrei sa fii notificat la lansare?"_
- Buton corespunzator

---

## Continut necesar de la client

- [ ] Numele si tagline-ul produsului/produselor
- [ ] Descriere completa a produsului
- [ ] Lista de features (cu prioritizare: care sunt cele mai importante?)
- [ ] Screenshots / mockups ale produsului
- [ ] Stadiul actual (concept, development, beta, live)
- [ ] Model de pricing (daca exista)
- [ ] Audientata tinta specifica
- [ ] Roadmap / features planificate
- [ ] Pagina de demo / link extern (daca exista)

## Componente React necesare

| Componenta | Tip | Fisier |
|------------|-----|--------|
| `ProductsHero` | Server | `src/app/[lang]/produse/_components/products-hero.tsx` |
| `ProductShowcase` | Client (animatii) | `src/app/[lang]/produse/_components/product-showcase.tsx` |
| `FeatureGrid` | Server | `src/app/[lang]/produse/_components/feature-grid.tsx` |
| `ProblemSolution` | Server | `src/app/[lang]/produse/_components/problem-solution.tsx` |
| `HowItWorks` | Client (animatii) | `src/app/[lang]/produse/_components/how-it-works.tsx` |
| `PricingTable` | Server (Faza 3) | `src/app/[lang]/produse/_components/pricing-table.tsx` |
| `CtaBanner` | Server (shared) | `src/components/cta-banner.tsx` |

## SEO

- **Title**: `[Nume Produs] -- Software de [Categorie] | Rammer Tech`
- **Meta description**: Descriere specifica produsului, cu beneficii cheie
- **Schema.org**: `SoftwareApplication` cu `applicationCategory`, `operatingSystem`, `offers`

## CTA-uri principale

1. "Solicita demo" / "Incearca gratuit" / "Early access" (adaptat la stadiu)
2. "Contacteaza-ne" -> `/contact?serviciu=produs` (banner final)

## Note

- Aceasta pagina e prioritate **Faza 3** -- poate fi lansata mai tarziu cand produsul e mai matur
- Daca produsul nu e inca gata, o pagina "Coming Soon" cu email capture e suficienta initial
- E important sa fie clar ca produsul e al Rammer Tech (nu al unui client)
- Legatura cu pagina SEAP/SICAP daca produsul e legat de achizitii publice
- Consideram landing page separata dedicata produsului (sub-domeniu?) daca creste suficient
- Nu dezvalui roadmap prea detaliat -- competitorii pot copia
