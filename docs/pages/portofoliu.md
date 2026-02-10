# Portofoliu (Portfolio / Case Studies)

## Obiectiv

Dovada sociala prin munca reala. Arata ce am construit, pentru cine si cu ce rezultate. Transforma "spunem ca putem" in "uitati ce am facut". Esentiala pentru credibilitate, mai ales in fata clientilor care compara furnizori.

## Ruta

- Lista proiecte: `/[lang]/portofoliu`
- Studiu de caz individual: `/[lang]/portofoliu/[slug]` (optional, Faza 2+)

## Sectiuni

### 1. Hero Portofoliu

- **Titlu** (H1): _"Proiectele Noastre"_ sau _"Ce am Construit"_
- **Subtitlu**: _"Fiecare proiect este o poveste de succes. Iata cateva dintre ele."_
- **Breadcrumb**: Acasa > Portofoliu

### 2. Filtre (optional, pentru 5+ proiecte)

- Filtrare dupa categorie:
  - Toate
  - Web & Mobile
  - Enterprise
  - SEAP/SICAP
  - Produs propriu
- Filtrare dupa industrie (daca sunt suficiente proiecte):
  - Guvernamental / Public
  - Business / Privat
  - etc.
- Design: Tab bar sau butoane de filtru, animatie la tranzitie

### 3. Grid de proiecte

- Layout: Grid responsive (3 coloane desktop, 2 tableta, 1 mobile)
- Fiecare card de proiect contine:
  - **Imagine/screenshot** -- mockup pe device sau screenshot real
  - **Titlu proiect**
  - **Client** (daca avem permisiunea) sau industrie
  - **Categorie tag** (Web, Enterprise, SEAP, etc.)
  - **Tehnologii** -- badges mici cu tech stack
  - **Descriere scurta** (1-2 randuri)
  - **Link**: "Vezi detalii" -> `/portofoliu/[slug]` (sau expand in-place)
- **Animatie**: Stagger fade-in, hover effect pe carduri

### 4. Studiu de caz detaliat (pagina individuala, Faza 2+)

Fiecare proiect poate avea propria pagina cu:

- **Hero**: Titlu + imagine mare
- **Context**: Cine era clientul, ce problema avea
- **Solutia**: Ce am construit, de ce am ales aceasta abordare
- **Tehnologii**: Stack complet cu explicatii
- **Rezultate**: Cifre, metrici de impact (daca sunt disponibile)
  - Ex: "Timp de procesare redus cu 60%", "500+ utilizatori activi"
- **Testimonial** client (daca exista)
- **Galerie**: Screenshots / mockups aditionale
- **CTA**: "Ai un proiect similar? Contacteaza-ne" -> `/contact`

### 5. CTA Banner

- Mesaj: _"Urmatorul proiect din portofoliu ar putea fi al tau."_
- Buton: "Incepe un proiect" -> `/contact`

---

## Continut necesar de la client

- [ ] Lista proiectelor de afisat (minim 3 recomandat)
- [ ] Pentru fiecare proiect:
  - [ ] Nume proiect (sau nume anonim daca e sub NDA)
  - [ ] Descriere scurta (2-3 propozitii)
  - [ ] Descriere lunga (pentru pagina individuala)
  - [ ] Screenshots / mockups (minim 1, recomandat 3-5)
  - [ ] Tehnologii utilizate
  - [ ] Rezultate masurabile (optional dar foarte valoroase)
  - [ ] Permisiunea clientului de a afisa proiectul
  - [ ] Testimonial de la client (optional)
- [ ] Categorii / industrii relevante

## Componente React necesare

| Componenta | Tip | Fisier |
|------------|-----|--------|
| `PortfolioHero` | Server | `src/app/[lang]/portofoliu/_components/portfolio-hero.tsx` |
| `ProjectFilters` | Client | `src/app/[lang]/portofoliu/_components/project-filters.tsx` |
| `ProjectGrid` | Client (filtru animat) | `src/app/[lang]/portofoliu/_components/project-grid.tsx` |
| `ProjectCard` | Server | `src/app/[lang]/portofoliu/_components/project-card.tsx` |
| `CaseStudyLayout` | Server (Faza 2) | `src/app/[lang]/portofoliu/[slug]/_components/` |
| `CtaBanner` | Server (shared) | `src/components/cta-banner.tsx` |

## SEO

- **Title**: `Portofoliu -- Proiecte Software & Studii de Caz | Rammer Tech`
- **Meta description**: `Exploreaza proiectele si studiile de caz Rammer Tech: aplicatii web, solutii enterprise si platforme SEAP/SICAP livrate cu succes.`
- **Schema.org**: `CreativeWork` per proiect

## CTA-uri principale

1. "Vezi detalii" per proiect -> `/portofoliu/[slug]`
2. "Incepe un proiect" -> `/contact` (banner final)

## Note

- Chiar si 2-3 proiecte bine prezentate sunt mai bune decat o pagina goala
- Daca nu avem permisiune de la client, putem prezenta proiectul anonim ("Client din industria X")
- Screenshoturi de calitate sunt esentiale -- investeste timp in mockups pe device
- Proiectul software propriu (de pe pagina Produse) poate fi inclus si aici
- Pentru inceput (Faza 2), doar grid cu carduri, fara pagini individuale -- se extinde ulterior
- Datele proiectelor pot fi stocate ca JSON in `/src/data/projects.ts` sau direct in dictionar
