# Blog / Resurse

## Obiectiv

Canal de content marketing si SEO. Articolele demonstreaza expertiza, atrag trafic organic si educa potentialii clienti. Pe termen lung, blogul poate deveni principala sursa de trafic organic. Prioritate **Faza 3** -- necesita continut regulat.

## Rute

- Lista articole: `/[lang]/blog`
- Articol individual: `/[lang]/blog/[slug]`
- Filtru categorie: `/[lang]/blog?categorie=seap` (query param, optional)

## Sectiuni

### Pagina lista (`/blog`)

#### 1. Hero Blog

- **Titlu** (H1): _"Blog & Resurse"_ sau _"Insights Rammer Tech"_
- **Subtitlu**: _"Articole, ghiduri si perspective din lumea software-ului si a achizitiilor publice."_
- **Breadcrumb**: Acasa > Blog

#### 2. Articol featured (optional)

- Ultimul articol sau cel mai important, afisat mare:
  - Imagine cover mare
  - Titlu + rezumat
  - Data + autor + categorie
  - CTA: "Citeste articolul"
- Design: Full-width card cu imagine pe stanga / text pe dreapta (desktop)

#### 3. Filtre categorii

- Butoane de filtru:
  - Toate
  - Dezvoltare Software
  - SEAP/SICAP
  - Consultanta IT
  - Produse
  - Stiri companie
- Design: Pills / tab bar

#### 4. Grid articole

- Layout: Grid responsive (3 coloane desktop, 2 tableta, 1 mobile)
- Fiecare card:
  - Imagine cover (aspect ratio 16:9)
  - Categorie tag
  - Titlu (H3)
  - Rezumat (2-3 randuri, trunchiat)
  - Data publicarii + autor
  - "Citeste" link
- **Paginare**: Load more button sau infinite scroll

### Pagina articol (`/blog/[slug]`)

#### 1. Header articol

- **Titlu** (H1): Titlul articolului
- **Meta**: Data publicarii, autor (cu avatar mic), categorie, timp estimat de citire
- **Imagine cover**: Full-width sau constrained
- **Breadcrumb**: Acasa > Blog > [Categorie] > [Titlu]

#### 2. Continut articol

- **Markdown / MDX** rendered:
  - H2, H3 headings
  - Paragrafe
  - Code blocks (syntax highlighted)
  - Imagini inline
  - Blockquotes
  - Liste (ordered / unordered)
  - Tabele
- **Table of Contents** (sidebar pe desktop, collapsed pe mobile)
- **Estimare timp de citire**: calculat automat

#### 3. CTA in articol

- Banner inline (dupa primele 2-3 sectiuni):
  - _"Ai nevoie de ajutor cu [topic-ul articolului]? Contacteaza-ne."_
  - Buton: "Solicita o consultatie" -> `/contact`

#### 4. Articole similare

- 2-3 carduri cu articole din aceeasi categorie
- "Vezi toate articolele" -> `/blog`

#### 5. Share buttons

- LinkedIn, Twitter/X, Facebook, Copy link
- Design: Floating sidebar (desktop) sau bottom bar (mobile)

---

## Implementare tehnica

### Sursa continutului

Optiuni (de decis):

1. **MDX files in repo** (`src/content/blog/*.mdx`)
   - Pro: Simplu, version controlled, no external dependency
   - Con: Necesita developer pentru a publica
   - Recomandat pentru inceput

2. **Headless CMS** (Contentful, Sanity, Strapi)
   - Pro: Non-tech pot publica
   - Con: Cost, complexitate, dependency externa
   - Recomandat pe termen lung

3. **Markdown in GitHub** (cu ISR/webhook)
   - Pro: Familiar pentru devs, version controlled
   - Con: Nu e user-friendly pentru non-devs

**Recomandare**: MDX files in repo (Faza 3), cu migrare optionala la CMS ulterior.

### Structura fisierelor MDX

```
src/content/blog/
  ├── cum-sa-castigi-licitatii-seap.mdx
  ├── de-ce-typescript-e-viitorul.mdx
  └── ghid-complet-sicap-2026.mdx
```

Fiecare fisier cu frontmatter:

```yaml
---
title: "Cum sa castigi licitatii SEAP: Ghid complet 2026"
slug: "cum-sa-castigi-licitatii-seap"
category: "seap-sicap"
date: "2026-02-15"
author: "Nume Autor"
coverImage: "/blog/covers/seap-guide.jpg"
excerpt: "Ghid pas cu pas pentru pregatirea si depunerea..."
tags: ["SEAP", "licitatii", "achizitii publice"]
---
```

---

## Continut necesar de la client

- [ ] Decizie: sursa de continut (MDX in repo vs CMS)
- [ ] Categorii de blog (validare propuneri)
- [ ] Primele 3-5 idei de articole
- [ ] Cine va scrie articolele? (intern, freelancer, AI-assisted?)
- [ ] Frecventa publicarii (1/saptamana, 2/luna, etc.)
- [ ] Imagini stock sau ilustratii custom?

## Componente React necesare

| Componenta | Tip | Fisier |
|------------|-----|--------|
| `BlogHero` | Server | `src/app/[lang]/blog/_components/blog-hero.tsx` |
| `FeaturedArticle` | Server | `src/app/[lang]/blog/_components/featured-article.tsx` |
| `CategoryFilter` | Client | `src/app/[lang]/blog/_components/category-filter.tsx` |
| `ArticleGrid` | Server | `src/app/[lang]/blog/_components/article-grid.tsx` |
| `ArticleCard` | Server | `src/app/[lang]/blog/_components/article-card.tsx` |
| `ArticleLayout` | Server | `src/app/[lang]/blog/[slug]/_components/article-layout.tsx` |
| `TableOfContents` | Client | `src/app/[lang]/blog/[slug]/_components/table-of-contents.tsx` |
| `ShareButtons` | Client | `src/components/share-buttons.tsx` |
| `RelatedArticles` | Server | `src/components/related-articles.tsx` |

## SEO

- **Title** (lista): `Blog -- Articole despre Software si Achizitii Publice | Rammer Tech`
- **Title** (articol): `[Titlu Articol] | Blog Rammer Tech`
- **Meta description**: Per articol din frontmatter `excerpt`
- **Schema.org**: `BlogPosting` per articol cu `author`, `datePublished`, `image`
- **Sitemap dinamic**: Generat automat din lista de articole
- **RSS feed**: `/feed.xml` (optional, util pentru sindiciare)

## Idei de articole initiale

1. _"Ghid complet SEAP 2026: Tot ce trebuie sa stii despre licitatii publice"_
2. _"5 greseli frecvente in ofertele SEAP si cum sa le eviti"_
3. _"De ce ai nevoie de un CRM personalizat in 2026"_
4. _"Cum alegi partenerul potrivit de dezvoltare software"_
5. _"Transformare digitala pentru IMM-uri: De unde incepi?"_

## Note

- Blogul e Faza 3 -- nu bloca lansarea site-ului pentru el
- Chiar si 3 articole de calitate sunt suficiente la lansare
- Articolele SEAP/SICAP au potential SEO foarte mare (cautari de nisa)
- MDX permite componente React interactive in articole (grafice, demo-uri)
- Table of Contents imbunatateste UX-ul si timpul pe pagina
- Schema BlogPosting e importanta pentru aparitia in Google News/Discover
