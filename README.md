# Rammer Tech Landing Site

Site de landing / marketing pentru **Rammer Tech**, construit cu Next.js 16, React 19 si TypeScript.

---

## Tech Stack

| Layer | Tehnologie | Versiune |
|-------|-----------|----------|
| Framework | **Next.js** (App Router) | 16.1.6 |
| UI Library | **React** | 19.2.3 |
| Limbaj | **TypeScript** | ^5 |
| Styling | **Tailwind CSS** v4 + `tw-animate-css` | ^4 |
| Componente UI | **shadcn/ui** (Radix UI primitives) | new-york style |
| Animatii | **Framer Motion** | ^12.34 |
| Iconite | **Lucide React** | ^0.563 |
| Email | **Resend** | ^6.9 |
| Validare | **Zod** v4 + **React Hook Form** | ^4.3 / ^7.71 |
| Analytics | **Vercel Analytics** | ^1.6 |
| Teme | **next-themes** | ^0.4 |

## Arhitectura

- **App Router** cu segment dinamic `[lang]` pentru i18n — toate paginile sub `src/app/[lang]/`
- **Server Components by default** — `"use client"` doar unde e necesar (formulare, animatii)
- **Fara baza de date** — site static de tip landing/marketing
- **Server Actions** doar pentru procesare formulare (trimitere email via Resend)

## i18n (Internationalizare)

- **2 limbi**: `ro` (default) si `en`
- Detectie automata in `middleware.ts` cu `negotiator` + `@formatjs/intl-localematcher`
- Dictionare JSON statice (`src/dictionaries/ro.json`, `en.json`)
- Functie `getDictionary(lang)` pentru incarcarea traducerilor in Server Components

## Pagini

8 pagini: **Home**, **Servicii**, **Produse**, **Portofoliu**, **Despre Noi**, **Blog** (cu `[slug]` dinamic), **Contact**, si pagini legale (Termeni, Confidentialitate)

## Design System / Culori

- Paleta **brand crimson** (10 nuante, `brand-50` → `brand-950`) extrasa din logo
- Neutrali **warm stone** (hue ~56) in loc de gray pur
- Token-uri semantice shadcn mapate pe brand (`primary` = `brand-700` light / `brand-500` dark)
- Culori semantice: `success`, `warning`, `info`, `destructive`
- Suport complet **light/dark mode** cu variabile CSS oklch
- Radius customizat (0.625rem baza)

## Structura Fisiere

```
src/
├── app/[lang]/          # Pagini + _components/ co-locate (page-specific)
├── components/          # Componente shared (header, footer, cookie banner, etc.)
│   └── ui/              # Primitive shadcn (auto-generated)
├── data/                # Date statice (blog posts, proiecte)
├── dictionaries/        # JSON-uri i18n + helper
└── lib/                 # Utilitare, email templates, scheme Zod
```

## Conventii Cod

- Path alias `@/*` → `./src/*`
- Fisiere in **kebab-case**, export-uri in **PascalCase**
- `cn()` (`clsx` + `tailwind-merge`) pentru class merging
- `class-variance-authority` (CVA) pentru variante de componente
- ESLint v9 cu `eslint-config-next`

## SEO & Meta

- `robots.ts` si `sitemap.ts` generate programatic
- `manifest.json` + iconite PWA (192px, 512px)
- Favicon si apple-icon configurate

## Getting Started

```bash
pnpm install
pnpm dev
```

Deschide [http://localhost:3000](http://localhost:3000) in browser.

## Deployment

- Target: **Vercel** (config standard Next.js, analytics Vercel integrat)
- Package manager: **pnpm**
