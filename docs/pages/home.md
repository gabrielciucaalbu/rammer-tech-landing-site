# Acasa (Home)

## Obiectiv

Pagina principala -- prima impresie. Trebuie sa comunice rapid **cine suntem**, **ce facem** si **de ce sa ne aleaga**. Genereaza interes si directioneaza vizitatorii catre pagini detaliate sau catre contact.

## Ruta

`/[lang]/` (pagina root)

## Sectiuni

### 1. Hero Section

- **Titlu mare** (H1): Mesaj clar si puternic despre valoarea oferita
  - Ex: _"Solutii Digitale pentru Afaceri Performante"_
- **Subtitlu**: 1-2 propozitii care extind mesajul hero
  - Mentioneaza: software custom, SEAP/SICAP, transformare digitala
- **CTA principal**: Buton "Descopera Serviciile Noastre" -> `/servicii`
- **CTA secundar**: Buton outline "Contacteaza-ne" -> `/contact`
- **Visual**: Background gradient brand (brand-600 -> brand-950) sau ilustratie/animatie abstracta
- **Animatie**: Fade-in + slide-up la incarcare (Framer Motion)

### 2. Banda de incredere (Trust Bar)

- Cifre cheie animate (count-up):
  - **X+** proiecte livrate
  - **X+** ani experienta
  - **X+** clienti multumiti
  - **X** licitatii SEAP castigate
- Design: 4 coloane, iconite Lucide, fundal subtil `bg-muted`

### 3. Servicii -- Preview

- Grid 2x2 cu carduri pentru cele 4 servicii principale:
  1. Dezvoltare Web & Mobile
  2. Solutii Enterprise
  3. Consultanta IT
  4. Achizitii Publice SEAP/SICAP
- Fiecare card: icon + titlu + descriere scurta (2 randuri) + link "Afla mai mult"
- CTA sub grid: "Vezi toate serviciile" -> `/servicii`
- **Animatie**: Stagger fade-in la scroll

### 4. SEAP/SICAP -- Highlight

- Sectiune dedicata care evidentiaza expertiza in licitatii publice
- Mesaj: _"Navigam complexitatea achizitiilor publice pentru tine"_
- Lista scurta de beneficii (3-4 bullet points cu checkmark icons)
- CTA: "Afla mai multe despre SEAP/SICAP" -> `/seap-sicap`
- Design: Background cu gradient subtil sau pattern, sa iasa in evidenta

### 5. De ce Rammer Tech? (USP / Value Proposition)

- 3 coloane cu diferentiatorii principali:
  1. **Orientare pe client** -- Intelegem nevoile unice ale fiecarui proiect
  2. **Expertiza tehnica** -- Stack modern, cod de calitate, best practices
  3. **Rezultate masurabile** -- Livrare la timp, ROI demonstrabil
- Fiecare cu icon si descriere scurta

### 6. Portofoliu -- Preview (optional in Faza 1)

- 2-3 carduri cu proiecte recente / studii de caz
- Fiecare card: screenshot/mockup + titlu + tags (industrie, tehnologie)
- CTA: "Vezi portofoliul complet" -> `/portofoliu`

### 7. CTA Banner final

- Banda full-width cu fundal `bg-primary`
- Mesaj: _"Ai un proiect in minte? Hai sa vorbim."_
- Buton CTA: "Solicita o consultatie gratuita" -> `/contact`

### 8. Footer

- Componenta partajata (vezi [shared-components.md](../shared-components.md))

---

## Continut necesar de la client

- [ ] Cifre reale pentru trust bar (proiecte, ani, clienti, licitatii)
- [ ] Tagline / slogan preferat pentru hero
- [ ] Aprobarea mesajelor de marketing
- [ ] Logouri clienti (daca exista permisiune de afisare)
- [ ] 2-3 proiecte pentru portofoliu preview (screenshoturi, descrieri scurte)

## Componente React necesare

| Componenta | Tip | Fisier |
|------------|-----|--------|
| `HeroSection` | Client (animatii) | `src/app/[lang]/_components/hero-section.tsx` |
| `TrustBar` | Client (count-up) | `src/app/[lang]/_components/trust-bar.tsx` |
| `ServicesPreview` | Server | `src/app/[lang]/_components/services-preview.tsx` |
| `SeapHighlight` | Server | `src/app/[lang]/_components/seap-highlight.tsx` |
| `ValueProposition` | Server | `src/app/[lang]/_components/value-proposition.tsx` |
| `PortfolioPreview` | Server (Faza 2) | `src/app/[lang]/_components/portfolio-preview.tsx` |
| `CtaBanner` | Server | `src/components/cta-banner.tsx` |

## SEO

- **Title**: `Rammer Tech -- Solutii Software & Achizitii Publice SEAP`
- **Meta description**: `Dezvoltam solutii software personalizate si oferim expertiza completa in achizitii publice SEAP/SICAP. Partenerul tau de incredere in transformarea digitala.`
- **H1**: Unic pe pagina (hero title)
- **Schema.org**: `Organization` + `LocalBusiness`

## CTA-uri principale

1. "Descopera Serviciile Noastre" -> `/servicii` (Hero, principal)
2. "Contacteaza-ne" -> `/contact` (Hero, secundar)
3. "Solicita o consultatie gratuita" -> `/contact` (Banner final)

## Note

- Hero-ul trebuie sa se incarce rapid -- fara imagini grele, preferabil CSS gradients + animatii subtile
- Sectiunea SEAP highlight e importanta pentru SEO -- multe cautari pe "software SEAP" / "licitatii SEAP"
- Trust bar cu cifre trebuie sa fie editabil usor din dictionarul de traduceri
- Pagina trebuie sa faca o impresie profesionala si curata -- nu prea aglomerata
