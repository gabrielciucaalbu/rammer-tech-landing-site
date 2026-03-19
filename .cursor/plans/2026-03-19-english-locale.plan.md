---
name: ""
overview: ""
todos: []
isProject: false
---

# English Locale Launch Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Activate the English locale (`/en/`*) so all pages are live and crawlable by Google in English, with proper English URL slugs (`/en/services`, `/en/about`, etc.).

**Architecture:** The Next.js app already uses a `[lang]` dynamic segment and dictionary system. The filesystem routes stay in Romanian (`[lang]/servicii/`, `[lang]/despre-noi/`, etc.). Next.js `rewrites` in `next.config.ts` map public EN slugs to internal RO filesystem paths transparently — the browser URL stays as `/en/services`, Next.js renders `[lang]/servicii/page.tsx`. A central `locale-slugs.ts` file is the single source of truth for all slug translations, consumed by metadata, sitemap, header nav, footer links, and the language switcher.

**Tech Stack:** Next.js 15 App Router, TypeScript, `[lang]` dynamic routing, JSON dictionaries, `next.config.ts` rewrites.

---

## Architectural Decisions

### D1: Filesystem routes stay in Romanian; EN slugs served via rewrites

`/en/services` in the browser → Next.js renders `[lang]/servicii/page.tsx` with `lang="en"`. No duplicate files. `locale-slugs.ts` is the single source of truth. Paths that are identical in both languages (`/blog`, `/contact`) need no rewrite entry.

### D2: Blog content stays Romanian-only for now

`/en/blog` and `/en/blog/[slug]` will work (English UI chrome: nav, CTA, breadcrumbs). Article content remains Romanian. Date formatting switches to `en-US`. Future English articles can be added to `blog-posts.ts` alongside the RO ones.

### D3: RSS feed stays Romanian-only

`/feed.xml` is a single RO-language feed. No EN feed until English articles exist.

### D4: `x-default` hreflang points to `/ro/`

Primary market is Romania, site defaults to `ro`, so `x-default` = the RO equivalent URL.

---

## Task 1: Wire up `en` in i18n config

**Files:**

- Modify: `src/i18n-config.ts`

**Step 1: Edit the config**

```typescript
export const i18n = {
  defaultLocale: "ro",
  locales: ["ro", "en"],
} as const;

export type Locale = (typeof i18n)["locales"][number];
```

**Step 2: Run TypeScript check**

```bash
npx tsc --noEmit 2>&1 | head -30
```

Expected: errors about missing dictionary keys (fixed in Task 2), or clean.

**Step 3: Commit**

```bash
git add src/i18n-config.ts
git commit -m "feat(web): add en to i18n locales config"
```

---

## Task 2: Fix missing keys in `en.json` + wire up dictionary

**Files:**

- Modify: `src/dictionaries/en.json`
- Modify: `src/dictionaries/get-dictionary.ts`

**Context:** `ro.json` has two keys that `en.json` is missing, which will cause TypeScript errors:

- `navigation.servicesAriaLabel` → RO: `"Explorează serviciile noastre IT"`
- `servicesPreview.learnMoreAbout` → RO: `"Află mai multe despre {title}"`

**Step 1: Add `servicesAriaLabel` to `en.json` navigation section**

After `"home": "Home"`, add:

```json
"servicesAriaLabel": "Explore our IT services",
```

**Step 2: Add `learnMoreAbout` to `en.json` servicesPreview section**

After `"learnMore": "Learn more"`, add:

```json
"learnMoreAbout": "Learn more about {title}",
```

**Step 3: Wire `en` in `get-dictionary.ts`**

```typescript
const dictionaries = {
  ro: () => import("./ro.json").then((m) => m.default),
  en: () => import("./en.json").then((m) => m.default),
};
```

**Step 4: TypeScript check — must be clean**

```bash
npx tsc --noEmit 2>&1
```

Expected: no output.

**Step 5: Commit**

```bash
git add src/dictionaries/en.json src/dictionaries/get-dictionary.ts
git commit -m "feat(web): wire up en dictionary and fix missing keys"
```

---

## Task 3: Remove the en→ro redirect from middleware

**Files:**

- Modify: `src/middleware.ts`

**Context:** Lines 13-19 redirect every `/en/`* request to `/ro/*` with a 302. Must be removed.

**Step 1: Replace entire middleware body**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { i18n } from "@/i18n-config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = i18n.locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${i18n.defaultLocale}${pathname}`;
    return NextResponse.redirect(url, 301);
  }
}

export const config = {
  matcher: [
    "/((?!_next|api|favicon.ico|.*\\..*).*)",
  ],
};
```

**Step 2: Commit**

```bash
git add src/middleware.ts
git commit -m "fix(web): remove en→ro redirect, activate en locale in middleware"
```

---

## Task 4: Create `src/lib/locale-slugs.ts` — central slug mapping

**Files:**

- Create: `src/lib/locale-slugs.ts`

**Context:** This is the single source of truth for all slug translations. Every other file (rewrites, buildAlternates, header, footer, LanguageSwitcher, sitemap) imports from here.

**Step 1: Create the file**

```typescript
import { i18n } from "@/i18n-config";

/**
 * Maps each filesystem route slug (always the RO slug) to its public URL
 * segment per locale. Slugs identical in both locales (blog, contact) are
 * listed explicitly so the LanguageSwitcher can look them up.
 */
export const LOCALE_SLUGS: Record<string, Record<string, string>> = {
  "servicii":                     { ro: "servicii",                    en: "services" },
  "despre-noi":                   { ro: "despre-noi",                  en: "about" },
  "portofoliu":                   { ro: "portofoliu",                  en: "portfolio" },
  "produse":                      { ro: "produse",                     en: "products" },
  "blog":                         { ro: "blog",                        en: "blog" },
  "contact":                      { ro: "contact",                     en: "contact" },
  "politica-confidentialitate":   { ro: "politica-confidentialitate",  en: "privacy-policy" },
  "termeni-si-conditii":          { ro: "termeni-si-conditii",         en: "terms-and-conditions" },
};

/**
 * Returns the public URL path (with leading slash) for a given FS slug and locale.
 * Falls back to the FS slug if no mapping exists (e.g. blog post slugs).
 */
export function getPublicPath(fsSlug: string, locale: string): string {
  const slug = LOCALE_SLUGS[fsSlug]?.[locale] ?? fsSlug;
  return `/${slug}`;
}

/**
 * Returns a per-locale map of public paths for use in buildAlternates.
 * E.g. for "servicii" → { ro: "/servicii", en: "/services" }
 */
export function getLocaleAlternates(
  fsSlug: string
): Partial<Record<string, string>> {
  const result: Partial<Record<string, string>> = {};
  for (const locale of i18n.locales) {
    result[locale] = getPublicPath(fsSlug, locale);
  }
  return result;
}

/**
 * Given a public URL slug and the locale it belongs to, returns the FS slug.
 * Used by the LanguageSwitcher to translate slugs when switching locales.
 * Returns the input slug unchanged if no mapping is found (e.g. blog post slugs).
 */
export function getFsSlug(publicSlug: string, locale: string): string {
  const entry = Object.entries(LOCALE_SLUGS).find(
    ([, slugs]) => slugs[locale] === publicSlug
  );
  return entry?.[0] ?? publicSlug;
}
```

**Step 2: TypeScript check**

```bash
npx tsc --noEmit 2>&1
```

**Step 3: Commit**

```bash
git add src/lib/locale-slugs.ts
git commit -m "feat(web): add locale-slugs helper as slug translation source of truth"
```

---

## Task 5: Add EN slug rewrites to `next.config.ts`

**Files:**

- Modify: `next.config.ts`

**Context:** Rewrites transparently map public EN URLs to internal filesystem routes. The browser URL stays as `/en/services`; Next.js renders `[lang]/servicii/page.tsx`. Paths identical in both locales (blog, contact) need no entry.

**Step 1: Add `rewrites` to the config**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  async rewrites() {
    return [
      { source: "/en/services",             destination: "/en/servicii" },
      { source: "/en/services/:path*",      destination: "/en/servicii/:path*" },
      { source: "/en/about",                destination: "/en/despre-noi" },
      { source: "/en/about/:path*",         destination: "/en/despre-noi/:path*" },
      { source: "/en/portfolio",            destination: "/en/portofoliu" },
      { source: "/en/portfolio/:path*",     destination: "/en/portofoliu/:path*" },
      { source: "/en/products",             destination: "/en/produse" },
      { source: "/en/products/:path*",      destination: "/en/produse/:path*" },
      { source: "/en/privacy-policy",       destination: "/en/politica-confidentialitate" },
      { source: "/en/terms-and-conditions", destination: "/en/termeni-si-conditii" },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

**Step 2: Verify rewrites work locally**

```bash
npm run dev &
sleep 5
curl -sI http://localhost:3000/en/services | grep "HTTP"
curl -sI http://localhost:3000/en/about | grep "HTTP"
```

Expected: `HTTP/1.1 200` for both (Next.js renders the page, no redirect).

**Step 3: Commit**

```bash
git add next.config.ts
git commit -m "feat(web): add EN slug rewrites to next.config.ts"
```

---

## Task 6: Update header nav and language switcher for EN slugs

**Files:**

- Modify: `src/components/header.tsx`
- Modify: `src/components/language-switcher.tsx`

### Part A: Header nav

**Context:** `navLinks` is a module-level `const` with hardcoded RO slugs. Moving it inside the component function allows it to use `lang` and `getPublicPath`.

**Step 1: Update `header.tsx`**

Remove the module-level `navLinks` const. Add an import for `getPublicPath` and compute `navLinks` inside the function:

```typescript
import { getPublicPath } from "@/lib/locale-slugs";

// Remove the module-level navLinks const

export function Header({ lang, dict }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { key: "home",     href: "" },
    { key: "services", href: getPublicPath("servicii",   lang) },
    { key: "about",    href: getPublicPath("despre-noi", lang) },
    { key: "products", href: getPublicPath("produse",    lang) },
    { key: "blog",     href: getPublicPath("blog",       lang) },
  ];

  // rest of component unchanged ...
```

**Note on `isActive`:** The existing `isActive` function checks `pathname.startsWith(`/${lang}${href}`)`. With rewrites, when on `/en/services`, `pathname` is `/en/services` and `href` is `/services`, so `fullPath = /en/services` — `startsWith` returns `true`. ✅ No change needed to `isActive`.

### Part B: Language Switcher

**Context:** The current switcher does a naive `segments[1] = newLang` which would produce `/ro/services` (404). Needs to translate the slug via `LOCALE_SLUGS`.

**Step 2: Rewrite `switchLocale` in `language-switcher.tsx`**

```typescript
import { getFsSlug, getPublicPath } from "@/lib/locale-slugs";

// Replace the switchLocale function:
const switchLocale = (newLang: string) => {
  const segments = pathname.split("/");
  // segments[0]="" segments[1]=lang segments[2]=slug segments[3+]=rest
  const currentLang = segments[1];
  const currentSlug = segments[2]; // may be undefined on home

  if (currentSlug) {
    const fsSlug = getFsSlug(currentSlug, currentLang);
    const newSlug = getPublicPath(fsSlug, newLang).slice(1); // remove leading /
    segments[1] = newLang;
    segments[2] = newSlug;
  } else {
    segments[1] = newLang;
  }

  return segments.join("/");
};
```

**Step 3: TypeScript check**

```bash
npx tsc --noEmit 2>&1
```

**Step 4: Commit**

```bash
git add src/components/header.tsx src/components/language-switcher.tsx
git commit -m "fix(web): use locale-aware slugs in header nav and language switcher"
```

---

## Task 7: Update `en.json` footer links to EN slugs

**Files:**

- Modify: `src/dictionaries/en.json` (footer.columns section)

**Context:** The footer component prepends `/${lang}` to each link's `href`. Currently the EN dictionary has RO slugs (e.g. `/despre-noi`). These must use EN slugs.

**Step 1: Update `footer.columns` in `en.json`**

Replace the entire `footer.columns` object with:

```json
"columns": {
  "company": {
    "title": "Company",
    "links": [
      { "label": "About Us", "href": "/about" },
      { "label": "Team", "href": "/about#echipa" },
      { "label": "Careers", "href": "#", "badge": "Soon" }
    ]
  },
  "services": {
    "title": "Services",
    "links": [
      { "label": "Web & Mobile Development", "href": "/services" },
      { "label": "Enterprise Solutions", "href": "/services" },
      { "label": "IT Consulting", "href": "/services" }
    ]
  },
  "resources": {
    "title": "Resources",
    "links": [
      { "label": "Blog", "href": "/blog" },
      { "label": "Products", "href": "/products" }
    ]
  },
  "legal": {
    "title": "Legal",
    "links": [
      { "label": "Privacy Policy", "href": "/privacy-policy" },
      { "label": "Terms & Conditions", "href": "/terms-and-conditions" }
    ]
  }
}
```

**Step 2: TypeScript check**

```bash
npx tsc --noEmit 2>&1
```

**Step 3: Commit**

```bash
git add src/dictionaries/en.json
git commit -m "fix(web): update en.json footer links to use EN slugs"
```

---

## Task 8: Update `buildAlternates` — proper hreflang with locale-specific paths

**Files:**

- Modify: `src/lib/metadata-alternates.ts`

**Context:** `buildAlternates` currently hardcodes `/ro/` as canonical and only emits `{ ro, x-default }`. It needs to emit both locales with their correct public slugs (e.g. `/en/services`, not `/en/servicii`).

**Step 1: Rewrite `metadata-alternates.ts`**

```typescript
import { i18n } from "@/i18n-config";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rammertech.ro";

/**
 * Builds canonical URL + hreflang alternates for a page.
 *
 * @param fsPath - Filesystem path without locale prefix (the RO slug), e.g. "/servicii"
 * @param currentLang - Locale of the current page render
 * @param localePaths - Per-locale public path overrides from getLocaleAlternates().
 *                      If omitted, fsPath is used for all locales (e.g. "/blog").
 */
export function buildAlternates(
  fsPath: string,
  currentLang = i18n.defaultLocale,
  localePaths?: Partial<Record<string, string>>
): { canonical: string; languages: Record<string, string> } {
  const getPath = (locale: string) => localePaths?.[locale] ?? fsPath;

  const canonical = `${BASE_URL}/${currentLang}${getPath(currentLang)}`;

  const languages: Record<string, string> = {};
  for (const locale of i18n.locales) {
    languages[locale] = `${BASE_URL}/${locale}${getPath(locale)}`;
  }
  languages["x-default"] =
    `${BASE_URL}/${i18n.defaultLocale}${getPath(i18n.defaultLocale)}`;

  return { canonical, languages };
}
```

**Step 2: Update all callers to pass `getLocaleAlternates`**

Every page that has a translated slug must pass the third argument. Pages where both locales share the same slug (blog, contact) need no change.

For each of these files, add the import and update the `buildAlternates` call:

`**src/app/[lang]/servicii/page.tsx**`

```typescript
import { getLocaleAlternates } from "@/lib/locale-slugs";
// ...
const { canonical, languages } = buildAlternates("/servicii", lang, getLocaleAlternates("servicii"));
```

`**src/app/[lang]/despre-noi/page.tsx**`

```typescript
import { getLocaleAlternates } from "@/lib/locale-slugs";
// ...
const { canonical, languages } = buildAlternates("/despre-noi", lang, getLocaleAlternates("despre-noi"));
```

`**src/app/[lang]/produse/page.tsx**`

```typescript
import { getLocaleAlternates } from "@/lib/locale-slugs";
// ...
const { canonical, languages } = buildAlternates("/produse", lang, getLocaleAlternates("produse"));
```

`**src/app/[lang]/politica-confidentialitate/page.tsx**`

```typescript
import { getLocaleAlternates } from "@/lib/locale-slugs";
// ...
const { canonical, languages } = buildAlternates("/politica-confidentialitate", lang, getLocaleAlternates("politica-confidentialitate"));
```

`**src/app/[lang]/termeni-si-conditii/page.tsx**`

```typescript
import { getLocaleAlternates } from "@/lib/locale-slugs";
// ...
const { canonical, languages } = buildAlternates("/termeni-si-conditii", lang, getLocaleAlternates("termeni-si-conditii"));
```

Pages with same slug in both locales — **no change needed** to the call signature:

- `blog/page.tsx` → `buildAlternates("/blog", lang)` ✅
- `blog/[slug]/page.tsx` → `buildAlternates(`/blog/${slug}`, lang)` ✅
- `contact/page.tsx` → `buildAlternates("/contact", lang)` ✅
- `page.tsx` (home) → `buildAlternates("", lang)` ✅

**Step 3: TypeScript check**

```bash
npx tsc --noEmit 2>&1
```

**Step 4: Commit**

```bash
git add src/lib/metadata-alternates.ts \
        "src/app/[lang]/servicii/page.tsx" \
        "src/app/[lang]/despre-noi/page.tsx" \
        "src/app/[lang]/produse/page.tsx" \
        "src/app/[lang]/politica-confidentialitate/page.tsx" \
        "src/app/[lang]/termeni-si-conditii/page.tsx"
git commit -m "fix(web): update buildAlternates to emit locale-specific hreflang paths"
```

---

## Task 9: Fix blog `generateStaticParams` + date locale + OG locale

**Files:**

- Modify: `src/app/[lang]/blog/[slug]/page.tsx`

**Step 1: Fix `generateStaticParams`**

```typescript
import { i18n } from "@/i18n-config";

export async function generateStaticParams() {
  return i18n.locales.flatMap((lang) =>
    blogPosts.map((post) => ({ lang, slug: post.slug }))
  );
}
```

**Step 2: Fix hardcoded `"ro_RO"` OG locale**

```typescript
// OLD
locale: "ro_RO",
// NEW
locale: lang === "ro" ? "ro_RO" : "en_US",
```

**Step 3: Fix hardcoded `"ro-RO"` in date formatting**

```typescript
// OLD
{new Date(post.date).toLocaleDateString("ro-RO", {
// NEW
{new Date(post.date).toLocaleDateString(lang === "ro" ? "ro-RO" : "en-US", {
```

**Step 4: TypeScript check**

```bash
npx tsc --noEmit 2>&1
```

**Step 5: Commit**

```bash
git add "src/app/[lang]/blog/[slug]/page.tsx"
git commit -m "fix(web): blog en locale support — static params, OG locale, date format"
```

---

## Task 10: Fix hardcoded `/ro/` in JSON-LD `url` fields across pages

**Files:**

- Modify: `src/app/[lang]/servicii/page.tsx`
- Modify: `src/app/[lang]/blog/page.tsx`
- Modify: `src/app/[lang]/despre-noi/page.tsx`
- Modify: `src/app/[lang]/contact/page.tsx`
- Modify: `src/app/[lang]/produse/page.tsx`
- Modify: `src/app/[lang]/politica-confidentialitate/page.tsx`
- Modify: `src/app/[lang]/termeni-si-conditii/page.tsx`

**Context:** `WebPageJsonLd` and `script` JSON-LD blocks hardcode `/ro/` in their `url` field. These should reflect the actual page URL, including translated slug.

**Pattern for pages with translated slugs** — import `getPublicPath` and build the URL:

```typescript
import { getPublicPath } from "@/lib/locale-slugs";
// ...
url={`${SITE_URL}/${lang}${getPublicPath("servicii", lang)}`}
// produces: /en/services  or  /ro/servicii
```

**Pattern for pages with same slug in both locales:**

```typescript
url={`${SITE_URL}/${lang}/blog`}
url={`${SITE_URL}/${lang}/contact`}
```

**Step 1: Fix `servicii/page.tsx`**

a) WebPageJsonLd url:

```typescript
// OLD: url={`${SITE_URL}/ro/servicii`}
// NEW:
import { getPublicPath } from "@/lib/locale-slugs";
url={`${SITE_URL}/${lang}${getPublicPath("servicii", lang)}`}
```

b) HowTo JSON-LD description (hardcoded in Romanian):

```typescript
// OLD: description: "Cum dezvoltăm software personalizat: ..."
// NEW:
description: lang === "ro"
  ? "Cum dezvoltăm software personalizat: de la descoperire la suport continuu."
  : "How we develop custom software: from discovery to ongoing support.",
```

**Step 2: Fix `blog/page.tsx`**

```typescript
// OLD: url={`${SITE_URL}/ro/blog`}
// NEW: url={`${SITE_URL}/${lang}/blog`}
```

**Step 3: Fix `despre-noi/page.tsx`**

a) WebPageJsonLd url:

```typescript
// OLD: url={`${SITE_URL}/ro/despre-noi`}
import { getPublicPath } from "@/lib/locale-slugs";
// NEW: url={`${SITE_URL}/${lang}${getPublicPath("despre-noi", lang)}`}
```

b) Organization JSON-LD `availableLanguage`:

```typescript
// OLD: availableLanguage: ["Romanian"],
// NEW: availableLanguage: ["Romanian", "English"],
```

**Step 4: Fix `contact/page.tsx`**

```typescript
// OLD: url={`${SITE_URL}/ro/contact`}
// NEW: url={`${SITE_URL}/${lang}/contact`}
```

**Step 5: Fix `produse/page.tsx`**

```typescript
// OLD: url={`${SITE_URL}/ro/produse`}
import { getPublicPath } from "@/lib/locale-slugs";
// NEW: url={`${SITE_URL}/${lang}${getPublicPath("produse", lang)}`}
```

**Step 6: Fix `politica-confidentialitate/page.tsx`**

```typescript
// OLD: url={`${SITE_URL}/ro/politica-confidentialitate`}
import { getPublicPath } from "@/lib/locale-slugs";
// NEW: url={`${SITE_URL}/${lang}${getPublicPath("politica-confidentialitate", lang)}`}
```

**Step 7: Fix `termeni-si-conditii/page.tsx`**

```typescript
// OLD: url={`${SITE_URL}/ro/termeni-si-conditii`}
import { getPublicPath } from "@/lib/locale-slugs";
// NEW: url={`${SITE_URL}/${lang}${getPublicPath("termeni-si-conditii", lang)}`}
```

**Step 8: TypeScript check**

```bash
npx tsc --noEmit 2>&1
```

**Step 9: Commit**

```bash
git add "src/app/[lang]/servicii/page.tsx" \
        "src/app/[lang]/blog/page.tsx" \
        "src/app/[lang]/despre-noi/page.tsx" \
        "src/app/[lang]/contact/page.tsx" \
        "src/app/[lang]/produse/page.tsx" \
        "src/app/[lang]/politica-confidentialitate/page.tsx" \
        "src/app/[lang]/termeni-si-conditii/page.tsx"
git commit -m "fix(web): dynamic lang + translated slug in JSON-LD url fields"
```

---

## Task 11: Fix home page (`/en`) — hardcoded locale, language, and JSON-LD

**Files:**

- Modify: `src/app/[lang]/page.tsx`

**Step 1: Fix OG `locale`**

```typescript
// OLD: locale: "ro_RO",
// NEW: locale: lang === "ro" ? "ro_RO" : "en_US",
```

**Step 2: Fix Organization JSON-LD `availableLanguage`**

```typescript
// OLD: availableLanguage: ["Romanian"],
// NEW: availableLanguage: ["Romanian", "English"],
```

**Step 3: Fix WebSite JSON-LD `inLanguage`**

```typescript
// OLD: inLanguage: "ro",
// NEW: inLanguage: ["ro", "en"],
```

**Step 4: Fix WebPageJsonLd url**

```typescript
// OLD: url={`${SITE_URL}/ro`}
// NEW: url={`${SITE_URL}/${lang}`}
```

**Step 5: TypeScript check**

```bash
npx tsc --noEmit 2>&1
```

**Step 6: Commit**

```bash
git add "src/app/[lang]/page.tsx"
git commit -m "fix(web): dynamic locale/language in home page JSON-LD and OG meta"
```

---

## Task 12: Update sitemap to use EN slugs for `/en/` entries

**Files:**

- Modify: `src/app/sitemap.ts`

**Context:** Currently `sitemap.ts` loops `i18n.locales × staticPages` where `staticPages` contains RO paths (e.g. `/servicii`). For EN, the sitemap should emit `/en/services` (the public URL that Googlebot will crawl), not `/en/servicii`.

**Step 1: Rewrite the sitemap to use `getPublicPath`**

```typescript
import type { MetadataRoute } from "next";
import { i18n } from "@/i18n-config";
import { blogPosts } from "@/data/blog-posts";
import { getPublicPath } from "@/lib/locale-slugs";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rammertech.ro";

// FS slugs (RO) — getPublicPath translates per locale
const staticFsSlugs = [
  "",
  "servicii",
  "despre-noi",
  // "portofoliu", // Hidden — no public portfolio yet
  "produse",
  "blog",
  "contact",
  "politica-confidentialitate",
  "termeni-si-conditii",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of i18n.locales) {
    for (const fsSlug of staticFsSlugs) {
      const publicPath = fsSlug === "" ? "" : getPublicPath(fsSlug, locale);
      const url = `${BASE_URL}/${locale}${publicPath}`;

      // Build hreflang alternates using the correct public slug per locale
      const altLanguages: Record<string, string> = {};
      for (const l of i18n.locales) {
        const lPath = fsSlug === "" ? "" : getPublicPath(fsSlug, l);
        altLanguages[l] = `${BASE_URL}/${l}${lPath}`;
      }
      const defaultPath = fsSlug === "" ? "" : getPublicPath(fsSlug, i18n.defaultLocale);
      altLanguages["x-default"] = `${BASE_URL}/${i18n.defaultLocale}${defaultPath}`;

      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: fsSlug === "" ? "weekly" : "monthly",
        priority: fsSlug === "" ? 1.0 : fsSlug === "contact" ? 0.9 : 0.8,
        alternates: { languages: altLanguages },
      });
    }
  }

  // Blog posts — slugs are the same in all locales
  for (const locale of i18n.locales) {
    for (const post of blogPosts) {
      const altLanguages: Record<string, string> = {};
      for (const l of i18n.locales) {
        altLanguages[l] = `${BASE_URL}/${l}/blog/${post.slug}`;
      }
      altLanguages["x-default"] = `${BASE_URL}/${i18n.defaultLocale}/blog/${post.slug}`;

      entries.push({
        url: `${BASE_URL}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages: altLanguages },
      });
    }
  }

  return entries;
}
```

**Step 2: TypeScript check**

```bash
npx tsc --noEmit 2>&1
```

**Step 3: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "fix(web): sitemap uses EN slugs for /en/ entries via getPublicPath"
```

---

## Task 13: Local build verification

**Step 1: Full production build**

```bash
npm run build 2>&1
```

Expected: clean build, no TypeScript errors, no 404 warnings for `/en/*` static params.

**Step 2: Start production server**

```bash
npm start &
sleep 3
```

**Step 3: Verify EN slug pages return 200**

```bash
curl -sI http://localhost:3000/en/services           | grep HTTP
curl -sI http://localhost:3000/en/about              | grep HTTP
curl -sI http://localhost:3000/en/products           | grep HTTP
curl -sI http://localhost:3000/en/blog               | grep HTTP
curl -sI http://localhost:3000/en/contact            | grep HTTP
curl -sI http://localhost:3000/en/privacy-policy     | grep HTTP
curl -sI http://localhost:3000/en/terms-and-conditions | grep HTTP
```

Expected: all `HTTP/1.1 200`.

**Step 4: Verify RO slugs still return 200 (no regression)**

```bash
curl -sI http://localhost:3000/ro/servicii    | grep HTTP
curl -sI http://localhost:3000/ro/despre-noi | grep HTTP
curl -sI http://localhost:3000/ro/contact    | grep HTTP
```

Expected: all `200`.

**Step 5: Verify no redirect when visiting EN slug**

```bash
curl -IL http://localhost:3000/en/services | grep -E "HTTP|location"
```

Expected: single `HTTP/1.1 200` — no intermediate redirect hops.

**Step 6: Verify hreflang in EN page source**

```bash
curl -s http://localhost:3000/en/services | grep -o 'hreflang="[^"]*"'
```

Expected:

```
hreflang="ro"
hreflang="en"
hreflang="x-default"
```

**Step 7: Verify canonical on EN services page points to `/en/services`**

```bash
curl -s http://localhost:3000/en/services | grep -o 'canonical.*href="[^"]*"'
```

Expected: contains `/en/services` (not `/en/servicii`).

**Step 8: Verify sitemap contains EN slugs**

```bash
curl -s http://localhost:3000/sitemap.xml | grep "/en/services"
curl -s http://localhost:3000/sitemap.xml | grep "/en/about"
```

Expected: matches found.

**Step 9: Verify language switcher links on EN services page**

```bash
curl -s http://localhost:3000/en/services | grep -o 'href="/ro/[^"]*"' | head -5
```

Expected: contains `href="/ro/servicii"` (footer or nav links pointing to RO equivalent).

---

## Task 14: Final commit + deploy

**Step 1: Full lint + TypeScript check**

```bash
npx tsc --noEmit && npm run lint 2>&1
```

Expected: clean.

**Step 2: Commit any remaining straggler files**

```bash
git status
git add -A
git commit -m "chore(web): cleanup after en locale activation with EN slugs"
```

**Step 3: Push + verify on Vercel preview**

```bash
git push origin HEAD
```

After Vercel deploys, rerun the curl spot-checks from Task 13 against the preview URL.

---

## Out of scope (Phase 2)

- English-translated blog article content
- Separate `/en/feed.xml` RSS feed
- `Accept-Language` header detection for automatic locale suggestion
- English-translated project descriptions in `data/projects.ts`
- MobileNav slug translation (inherits `navLinks` from Header via props — verify it works, fix if needed)

