# Rammer Tech -- Harta Site-ului (Sitemap)

## Viziune generala

Site de prezentare profesional pentru **Rammer Tech**, o companie mica de software care:

- Dezvolta solutii software personalizate, orientate pe client
- Ofera consultanta IT si solutii enterprise
- Lucreaza la propriul produs software

Scopul site-ului: **generare de lead-uri**, **credibilitate profesionala** si **vizibilitate online**.

---

## Structura paginilor

```
/ (Home)
├── /servicii (Services)
├── /despre-noi (About Us)
├── /portofoliu (Portfolio / Case Studies) -- Hidden
├── /produse (Products -- Software propriu)
├── /blog (Blog / Resurse)
├── /contact (Contact)
├── /politica-confidentialitate (Privacy Policy)
└── /termeni-si-conditii (Terms & Conditions)
```

> **Nota i18n**: Fiecare pagina va fi disponibila in doua limbi sub `/ro/...` si `/en/...` conform arhitecturii `[lang]` existenta.

---

## Pagini principale

| # | Pagina | Ruta | Prioritate | Spec |
|---|--------|------|------------|------|
| 1 | **Acasa** | `/` | Critica | [home.md](./pages/home.md) |
| 2 | **Servicii** | `/servicii` | Critica | [servicii.md](./pages/servicii.md) |
| 3 | **Despre Noi** | `/despre-noi` | Inalta | [despre-noi.md](./pages/despre-noi.md) |
| 4 | **Portofoliu** | `/portofoliu` | Hidden | [portofoliu.md](./pages/portofoliu.md) |
| 5 | **Produse** | `/produse` | Medie | [produse.md](./pages/produse.md) |
| 6 | **Blog** | `/blog` | Medie | [blog.md](./pages/blog.md) |
| 7 | **Contact** | `/contact` | Critica | [contact.md](./pages/contact.md) |

## Pagini legale

| # | Pagina | Ruta | Spec |
|---|--------|------|------|
| 9 | **Politica de Confidentialitate** | `/politica-confidentialitate` | [legal.md](./pages/legal.md) |
| 10 | **Termeni si Conditii** | `/termeni-si-conditii` | [legal.md](./pages/legal.md) |

## Componente partajate

| Componenta | Spec |
|------------|------|
| **Header / Navigatie** | [shared-components.md](./shared-components.md) |
| **Footer** | [shared-components.md](./shared-components.md) |
| **CTA Banner** | [shared-components.md](./shared-components.md) |
| **SEO / Meta** | [shared-components.md](./shared-components.md) |

---

## Fluxul utilizatorului (User Flow)

```
Vizitator nou
  │
  ▼
HOME ──────────────────────────────────┐
  │  Hero + prezentare rapida          │
  │  Preview servicii                  │
  │  Social proof / cifre cheie        │
  │  CTA principal                     │
  │                                    │
  ├──► SERVICII (detalii complete)     │
  │       └──► CONTACT (cerere oferta) │
  │                                    │
  ├──► SEAP/SICAP (nisa specializ.)    │
  │       └──► CONTACT                 │
  │                                    │
  ├──► PORTOFOLIU (dovada competenta)  │
  │       └──► CONTACT                 │
  │                                    │
  ├──► PRODUSE (software propriu)      │
  │       └──► CONTACT / Demo          │
  │                                    │
  ├──► DESPRE NOI (incredere, echipa)  │
  │       └──► CONTACT                 │
  │                                    │
  └──► BLOG (SEO, expertiza)           │
          └──► SERVICII / CONTACT      │
                                       │
  FOOTER (pe toate paginile) ◄─────────┘
    │  Link-uri rapide
    │  Date contact
    │  Legal (Privacy, Terms)
    └  Social media
```

---

## Prioritizare dezvoltare (Faze)

### Faza 1 -- MVP (Core)
- [ ] Header + Footer + Layout
- [ ] Home (Acasa)
- [ ] Servicii
- [ ] Contact
- [ ] Pagini legale (template simplu)

### Faza 2 -- Credibilitate
- [ ] Despre Noi
- [ ] Portofoliu (minim 2-3 studii de caz)
- [ ] SEAP/SICAP (pagina dedicata)

### Faza 3 -- Crestere
- [ ] Produse (software propriu)
- [ ] Blog (infrastructura + primele articole)
- [ ] Optimizare SEO avansata

---

## Conventii de documentare

Fiecare spec de pagina (`docs/pages/*.md`) urmeaza un template unitar:

1. **Obiectiv** -- Ce rol joaca pagina in site
2. **Ruta** -- URL-ul paginii
3. **Sectiuni** -- Breakdown-ul vizual/functional
4. **Continut necesar** -- Text, imagini, date de la client
5. **Componente** -- Componente React necesare
6. **SEO** -- Title, meta description, keywords
7. **CTA** -- Actiunile principale dorite de la vizitator
8. **Note** -- Observatii, dependinte, intrebari deschise
