# Navigation Redirect Audit

> Generated: 2026-03-24T12:55:28.903Z  
> Base URL: `http://localhost:4000`  
> Total links audited: **86** (unique URLs cached)

## Summary

| Status | Count |
|--------|-------|
| ✅ OK (no redirect) | 76 |
| ↪️ Single redirect | 8 |
| ⚠️ Multiple redirects | 0 |
| 🔗 Stub / fragment-only | 2 |
| ❌ HTTP error | 0 |
| ❌ Network error | 0 |

## Google SEO Notes

- **OK**: Link resolves in a single request — ideal for Google.
- **Single redirect**: One hop (e.g. locale prefix, rewrite). Google follows it but 
  a 301 passes ~99% link equity. Acceptable but prefer direct URLs where possible.
- **Multiple redirects**: Two or more hops. Google crawl budget is wasted; fix these.
- **HTTP 4xx/5xx or error**: Page is broken — must fix.

## Redirect Chains

> Each row shows the UI source → navigation target → full HTTP hop chain → final status.

### ✅ OK — No Redirect

| UI Location | From Page | Target URL | Hop Chain | Final Status |
|-------------|-----------|------------|-----------|--------------|
| Header RO – Logo / Home | `/ro` | `/ro` | **200** `/ro` | **200** |
| Header RO – Servicii | `/ro` | `/ro/servicii` | **200** `/ro/servicii` | **200** |
| Header RO – Despre Noi | `/ro` | `/ro/despre-noi` | **200** `/ro/despre-noi` | **200** |
| Header RO – Produse | `/ro` | `/ro/produse` | **200** `/ro/produse` | **200** |
| Header RO – Blog | `/ro` | `/ro/blog` | **200** `/ro/blog` | **200** |
| Header RO – Contact CTA | `/ro` | `/ro/contact` | **200** `/ro/contact` | **200** |
| Header EN – Logo / Home | `/en` | `/en` | **200** `/en` | **200** |
| Header EN – Services | `/en` | `/en/services` | **200** `/en/services` | **200** |
| Header EN – About | `/en` | `/en/about` | **200** `/en/about` | **200** |
| Header EN – Products | `/en` | `/en/products` | **200** `/en/products` | **200** |
| Header EN – Blog | `/en` | `/en/blog` | **200** `/en/blog` | **200** |
| Header EN – Contact CTA | `/en` | `/en/contact` | **200** `/en/contact` | **200** |
| Footer RO – Despre Noi | `/ro` | `/ro/despre-noi` | **200** `/ro/despre-noi` | **200** |
| Footer RO – Echipa anchor | `/ro` | `/ro/despre-noi#echipa` | **200** `/ro/despre-noi` | **200** |
| Footer RO – Web & Mobile | `/ro` | `/ro/servicii` | **200** `/ro/servicii` | **200** |
| Footer RO – Solutii Enterprise | `/ro` | `/ro/servicii` | **200** `/ro/servicii` | **200** |
| Footer RO – Consultanta IT | `/ro` | `/ro/servicii` | **200** `/ro/servicii` | **200** |
| Footer RO – Blog | `/ro` | `/ro/blog` | **200** `/ro/blog` | **200** |
| Footer RO – Produse | `/ro` | `/ro/produse` | **200** `/ro/produse` | **200** |
| Footer RO – Politica | `/ro` | `/ro/politica-confidentialitate` | **200** `/ro/politica-confidentialitate` | **200** |
| Footer RO – Termeni | `/ro` | `/ro/termeni-si-conditii` | **200** `/ro/termeni-si-conditii` | **200** |
| Footer EN – About Us | `/en` | `/en/about` | **200** `/en/about` | **200** |
| Footer EN – Team anchor | `/en` | `/en/about#echipa` | **200** `/en/about` | **200** |
| Footer EN – Web & Mobile | `/en` | `/en/services` | **200** `/en/services` | **200** |
| Footer EN – Enterprise | `/en` | `/en/services` | **200** `/en/services` | **200** |
| Footer EN – IT Consulting | `/en` | `/en/services` | **200** `/en/services` | **200** |
| Footer EN – Blog | `/en` | `/en/blog` | **200** `/en/blog` | **200** |
| Footer EN – Products | `/en` | `/en/products` | **200** `/en/products` | **200** |
| Footer EN – Privacy Policy | `/en` | `/en/privacy-policy` | **200** `/en/privacy-policy` | **200** |
| Footer EN – Terms | `/en` | `/en/terms-and-conditions` | **200** `/en/terms-and-conditions` | **200** |
| Home RO – Hero: Discover Services | `/ro` | `/ro/servicii` | **200** `/ro/servicii` | **200** |
| Home RO – Hero: Contact us | `/ro` | `/ro/contact` | **200** `/ro/contact` | **200** |
| Home RO – Services preview cards | `/ro` | `/ro/servicii` | **200** `/ro/servicii` | **200** |
| Home RO – CTA Banner | `/ro` | `/ro/contact` | **200** `/ro/contact` | **200** |
| Home EN – Hero: Discover Services | `/en` | `/en/services` | **200** `/en/services` | **200** |
| Home EN – Hero: Contact us | `/en` | `/en/contact` | **200** `/en/contact` | **200** |
| Home EN – Services preview cards | `/en` | `/en/services` | **200** `/en/services` | **200** |
| Home EN – CTA Banner | `/en` | `/en/contact` | **200** `/en/contact` | **200** |
| Services RO – FAQ link to Blog | `/ro/servicii` | `/ro/blog` | **200** `/ro/blog` | **200** |
| Services RO – CTA Contact (web) | `/ro/servicii` | `/ro/contact?serviciu=web-mobile` | **200** `/ro/contact?serviciu=web-mobile` | **200** |
| Services RO – CTA Contact (enterprise) | `/ro/servicii` | `/ro/contact?serviciu=enterprise` | **200** `/ro/contact?serviciu=enterprise` | **200** |
| Services RO – CTA Contact (consulting) | `/ro/servicii` | `/ro/contact?serviciu=consultanta` | **200** `/ro/contact?serviciu=consultanta` | **200** |
| Services RO – CTA Banner | `/ro/servicii` | `/ro/contact` | **200** `/ro/contact` | **200** |
| Services EN – FAQ link to Blog | `/en/services` | `/en/blog` | **200** `/en/blog` | **200** |
| Services EN – CTA Contact (web) | `/en/services` | `/en/contact?serviciu=web-mobile` | **200** `/en/contact?serviciu=web-mobile` | **200** |
| Services EN – CTA Contact (enterprise) | `/en/services` | `/en/contact?serviciu=enterprise` | **200** `/en/contact?serviciu=enterprise` | **200** |
| Services EN – CTA Contact (consulting) | `/en/services` | `/en/contact?serviciu=consultanta` | **200** `/en/contact?serviciu=consultanta` | **200** |
| Services EN – CTA Banner | `/en/services` | `/en/contact` | **200** `/en/contact` | **200** |
| About RO – CTA Banner | `/ro/despre-noi` | `/ro/contact` | **200** `/ro/contact` | **200** |
| About EN – CTA Banner | `/en/about` | `/en/contact` | **200** `/en/contact` | **200** |
| Products RO – CTA Banner | `/ro/produse` | `/ro/contact?serviciu=produs` | **200** `/ro/contact?serviciu=produs` | **200** |
| Products EN – CTA Banner | `/en/products` | `/en/contact?serviciu=produs` | **200** `/en/contact?serviciu=produs` | **200** |
| Blog RO – Article card link | `/ro/blog` | `/ro/blog` | **200** `/ro/blog` | **200** |
| Blog EN – Article card link | `/en/blog` | `/en/blog` | **200** `/en/blog` | **200** |
| Blog post RO – Back to Blog | `/ro/blog/post` | `/ro/blog` | **200** `/ro/blog` | **200** |
| Blog post EN – Back to Blog | `/en/blog/post` | `/en/blog` | **200** `/en/blog` | **200** |
| Contact RO – Privacy policy link | `/ro/contact` | `/ro/politica-confidentialitate` | **200** `/ro/politica-confidentialitate` | **200** |
| Contact EN – Privacy policy link | `/en/contact` | `/en/privacy-policy` | **200** `/en/privacy-policy` | **200** |
| Cookie RO – Privacy policy | `/ro` | `/ro/politica-confidentialitate` | **200** `/ro/politica-confidentialitate` | **200** |
| Cookie EN – Privacy policy | `/en` | `/en/privacy-policy` | **200** `/en/privacy-policy` | **200** |
| Privacy RO – page | `/ro` | `/ro/politica-confidentialitate` | **200** `/ro/politica-confidentialitate` | **200** |
| Privacy EN – page | `/en` | `/en/privacy-policy` | **200** `/en/privacy-policy` | **200** |
| Terms RO – page | `/ro` | `/ro/termeni-si-conditii` | **200** `/ro/termeni-si-conditii` | **200** |
| Terms EN – page | `/en` | `/en/terms-and-conditions` | **200** `/en/terms-and-conditions` | **200** |
| 404 – Back to Home | `/nonexistent` | `/ro` | **200** `/ro` | **200** |
| Global error – Back to Home | `/` | `/ro` | **200** `/ro` | **200** |
| Portfolio RO – page | `/ro` | `/ro/portofoliu` | **200** `/ro/portofoliu` | **200** |
| Portfolio EN – page | `/en` | `/en/portfolio` | **200** `/en/portfolio` | **200** |
| Rewrite EN /en/services → /en/servicii | `/en` | `/en/services` | **200** `/en/services` | **200** |
| Rewrite EN /en/about → /en/despre-noi | `/en` | `/en/about` | **200** `/en/about` | **200** |
| Rewrite EN /en/portfolio → /en/portofoliu | `/en` | `/en/portfolio` | **200** `/en/portfolio` | **200** |
| Rewrite EN /en/products → /en/produse | `/en` | `/en/products` | **200** `/en/products` | **200** |
| Rewrite EN /en/privacy-policy | `/en` | `/en/privacy-policy` | **200** `/en/privacy-policy` | **200** |
| Rewrite EN /en/terms-and-conditions | `/en` | `/en/terms-and-conditions` | **200** `/en/terms-and-conditions` | **200** |
| Blog content (hardcoded) – /ro/servicii | `/ro/blog/post` | `/ro/servicii` | **200** `/ro/servicii` | **200** |
| Blog content (hardcoded) – /ro/contact | `/ro/blog/post` | `/ro/contact` | **200** `/ro/contact` | **200** |

### ↪️ Single Redirect

| UI Location | From Page | Target URL | Hop Chain | Final Status |
|-------------|-----------|------------|-----------|--------------|
| Middleware – bare root | `/` | `/` | **301** `/` → **200** `/ro` | **200** |
| Middleware – bare /servicii | `/` | `/servicii` | **301** `/servicii` → **200** `/ro/servicii` | **200** |
| Middleware – bare /services | `/` | `/services` | **308** `/services` → **200** `/en/services` | **200** |
| Middleware – bare /about | `/` | `/about` | **308** `/about` → **200** `/en/about` | **200** |
| Middleware – bare /blog | `/` | `/blog` | **301** `/blog` → **200** `/ro/blog` | **200** |
| Middleware – bare /contact | `/` | `/contact` | **301** `/contact` → **200** `/ro/contact` | **200** |
| Middleware – bare /products | `/` | `/products` | **308** `/products` → **200** `/en/products` | **200** |
| Middleware – bare /portfolio | `/` | `/portfolio` | **308** `/portfolio` → **200** `/en/portfolio` | **200** |

### 🔗 Stub / Fragment-only (href="#")

| UI Location | From Page | Note |
|-------------|-----------|------|
| Footer RO – Cariere (stub #) | `/ro` | Placeholder link — no HTTP request, not crawled by Google |
| Footer EN – Careers (stub #) | `/en` | Placeholder link — no HTTP request, not crawled by Google |

---

## All Links — Flat Table

Complete list in discovery order:

| # | Status | UI Location | From | Target | Final URL | Hops | HTTP |
|---|--------|-------------|------|--------|-----------|------|------|
| 1 | ↪️ REDIRECT | Middleware – bare root | `/` | `/` | `/ro` | 1 | 200 |
| 2 | ↪️ REDIRECT | Middleware – bare /servicii | `/` | `/servicii` | `/ro/servicii` | 1 | 200 |
| 3 | ↪️ REDIRECT | Middleware – bare /services | `/` | `/services` | `/en/services` | 1 | 200 |
| 4 | ↪️ REDIRECT | Middleware – bare /about | `/` | `/about` | `/en/about` | 1 | 200 |
| 5 | ↪️ REDIRECT | Middleware – bare /blog | `/` | `/blog` | `/ro/blog` | 1 | 200 |
| 6 | ↪️ REDIRECT | Middleware – bare /contact | `/` | `/contact` | `/ro/contact` | 1 | 200 |
| 7 | ↪️ REDIRECT | Middleware – bare /products | `/` | `/products` | `/en/products` | 1 | 200 |
| 8 | ↪️ REDIRECT | Middleware – bare /portfolio | `/` | `/portfolio` | `/en/portfolio` | 1 | 200 |
| 9 | ✅ OK | Header RO – Logo / Home | `/ro` | `/ro` | `/ro` | 0 | 200 |
| 10 | ✅ OK | Header RO – Servicii | `/ro` | `/ro/servicii` | `/ro/servicii` | 0 | 200 |
| 11 | ✅ OK | Header RO – Despre Noi | `/ro` | `/ro/despre-noi` | `/ro/despre-noi` | 0 | 200 |
| 12 | ✅ OK | Header RO – Produse | `/ro` | `/ro/produse` | `/ro/produse` | 0 | 200 |
| 13 | ✅ OK | Header RO – Blog | `/ro` | `/ro/blog` | `/ro/blog` | 0 | 200 |
| 14 | ✅ OK | Header RO – Contact CTA | `/ro` | `/ro/contact` | `/ro/contact` | 0 | 200 |
| 15 | ✅ OK | Header EN – Logo / Home | `/en` | `/en` | `/en` | 0 | 200 |
| 16 | ✅ OK | Header EN – Services | `/en` | `/en/services` | `/en/services` | 0 | 200 |
| 17 | ✅ OK | Header EN – About | `/en` | `/en/about` | `/en/about` | 0 | 200 |
| 18 | ✅ OK | Header EN – Products | `/en` | `/en/products` | `/en/products` | 0 | 200 |
| 19 | ✅ OK | Header EN – Blog | `/en` | `/en/blog` | `/en/blog` | 0 | 200 |
| 20 | ✅ OK | Header EN – Contact CTA | `/en` | `/en/contact` | `/en/contact` | 0 | 200 |
| 21 | ✅ OK | Footer RO – Despre Noi | `/ro` | `/ro/despre-noi` | `/ro/despre-noi` | 0 | 200 |
| 22 | ✅ OK | Footer RO – Echipa anchor | `/ro` | `/ro/despre-noi#echipa` | `/ro/despre-noi` | 0 | 200 |
| 23 | 🔗 STUB | Footer RO – Cariere (stub #) | `/ro` | `#` | `N/A` | 0 | N/A |
| 24 | ✅ OK | Footer RO – Web & Mobile | `/ro` | `/ro/servicii` | `/ro/servicii` | 0 | 200 |
| 25 | ✅ OK | Footer RO – Solutii Enterprise | `/ro` | `/ro/servicii` | `/ro/servicii` | 0 | 200 |
| 26 | ✅ OK | Footer RO – Consultanta IT | `/ro` | `/ro/servicii` | `/ro/servicii` | 0 | 200 |
| 27 | ✅ OK | Footer RO – Blog | `/ro` | `/ro/blog` | `/ro/blog` | 0 | 200 |
| 28 | ✅ OK | Footer RO – Produse | `/ro` | `/ro/produse` | `/ro/produse` | 0 | 200 |
| 29 | ✅ OK | Footer RO – Politica | `/ro` | `/ro/politica-confidentialitate` | `/ro/politica-confidentialitate` | 0 | 200 |
| 30 | ✅ OK | Footer RO – Termeni | `/ro` | `/ro/termeni-si-conditii` | `/ro/termeni-si-conditii` | 0 | 200 |
| 31 | ✅ OK | Footer EN – About Us | `/en` | `/en/about` | `/en/about` | 0 | 200 |
| 32 | ✅ OK | Footer EN – Team anchor | `/en` | `/en/about#echipa` | `/en/about` | 0 | 200 |
| 33 | 🔗 STUB | Footer EN – Careers (stub #) | `/en` | `#` | `N/A` | 0 | N/A |
| 34 | ✅ OK | Footer EN – Web & Mobile | `/en` | `/en/services` | `/en/services` | 0 | 200 |
| 35 | ✅ OK | Footer EN – Enterprise | `/en` | `/en/services` | `/en/services` | 0 | 200 |
| 36 | ✅ OK | Footer EN – IT Consulting | `/en` | `/en/services` | `/en/services` | 0 | 200 |
| 37 | ✅ OK | Footer EN – Blog | `/en` | `/en/blog` | `/en/blog` | 0 | 200 |
| 38 | ✅ OK | Footer EN – Products | `/en` | `/en/products` | `/en/products` | 0 | 200 |
| 39 | ✅ OK | Footer EN – Privacy Policy | `/en` | `/en/privacy-policy` | `/en/privacy-policy` | 0 | 200 |
| 40 | ✅ OK | Footer EN – Terms | `/en` | `/en/terms-and-conditions` | `/en/terms-and-conditions` | 0 | 200 |
| 41 | ✅ OK | Home RO – Hero: Discover Services | `/ro` | `/ro/servicii` | `/ro/servicii` | 0 | 200 |
| 42 | ✅ OK | Home RO – Hero: Contact us | `/ro` | `/ro/contact` | `/ro/contact` | 0 | 200 |
| 43 | ✅ OK | Home RO – Services preview cards | `/ro` | `/ro/servicii` | `/ro/servicii` | 0 | 200 |
| 44 | ✅ OK | Home RO – CTA Banner | `/ro` | `/ro/contact` | `/ro/contact` | 0 | 200 |
| 45 | ✅ OK | Home EN – Hero: Discover Services | `/en` | `/en/services` | `/en/services` | 0 | 200 |
| 46 | ✅ OK | Home EN – Hero: Contact us | `/en` | `/en/contact` | `/en/contact` | 0 | 200 |
| 47 | ✅ OK | Home EN – Services preview cards | `/en` | `/en/services` | `/en/services` | 0 | 200 |
| 48 | ✅ OK | Home EN – CTA Banner | `/en` | `/en/contact` | `/en/contact` | 0 | 200 |
| 49 | ✅ OK | Services RO – FAQ link to Blog | `/ro/servicii` | `/ro/blog` | `/ro/blog` | 0 | 200 |
| 50 | ✅ OK | Services RO – CTA Contact (web) | `/ro/servicii` | `/ro/contact?serviciu=web-mobile` | `/ro/contact?serviciu=web-mobile` | 0 | 200 |
| 51 | ✅ OK | Services RO – CTA Contact (enterprise) | `/ro/servicii` | `/ro/contact?serviciu=enterprise` | `/ro/contact?serviciu=enterprise` | 0 | 200 |
| 52 | ✅ OK | Services RO – CTA Contact (consulting) | `/ro/servicii` | `/ro/contact?serviciu=consultanta` | `/ro/contact?serviciu=consultanta` | 0 | 200 |
| 53 | ✅ OK | Services RO – CTA Banner | `/ro/servicii` | `/ro/contact` | `/ro/contact` | 0 | 200 |
| 54 | ✅ OK | Services EN – FAQ link to Blog | `/en/services` | `/en/blog` | `/en/blog` | 0 | 200 |
| 55 | ✅ OK | Services EN – CTA Contact (web) | `/en/services` | `/en/contact?serviciu=web-mobile` | `/en/contact?serviciu=web-mobile` | 0 | 200 |
| 56 | ✅ OK | Services EN – CTA Contact (enterprise) | `/en/services` | `/en/contact?serviciu=enterprise` | `/en/contact?serviciu=enterprise` | 0 | 200 |
| 57 | ✅ OK | Services EN – CTA Contact (consulting) | `/en/services` | `/en/contact?serviciu=consultanta` | `/en/contact?serviciu=consultanta` | 0 | 200 |
| 58 | ✅ OK | Services EN – CTA Banner | `/en/services` | `/en/contact` | `/en/contact` | 0 | 200 |
| 59 | ✅ OK | About RO – CTA Banner | `/ro/despre-noi` | `/ro/contact` | `/ro/contact` | 0 | 200 |
| 60 | ✅ OK | About EN – CTA Banner | `/en/about` | `/en/contact` | `/en/contact` | 0 | 200 |
| 61 | ✅ OK | Products RO – CTA Banner | `/ro/produse` | `/ro/contact?serviciu=produs` | `/ro/contact?serviciu=produs` | 0 | 200 |
| 62 | ✅ OK | Products EN – CTA Banner | `/en/products` | `/en/contact?serviciu=produs` | `/en/contact?serviciu=produs` | 0 | 200 |
| 63 | ✅ OK | Blog RO – Article card link | `/ro/blog` | `/ro/blog` | `/ro/blog` | 0 | 200 |
| 64 | ✅ OK | Blog EN – Article card link | `/en/blog` | `/en/blog` | `/en/blog` | 0 | 200 |
| 65 | ✅ OK | Blog post RO – Back to Blog | `/ro/blog/post` | `/ro/blog` | `/ro/blog` | 0 | 200 |
| 66 | ✅ OK | Blog post EN – Back to Blog | `/en/blog/post` | `/en/blog` | `/en/blog` | 0 | 200 |
| 67 | ✅ OK | Contact RO – Privacy policy link | `/ro/contact` | `/ro/politica-confidentialitate` | `/ro/politica-confidentialitate` | 0 | 200 |
| 68 | ✅ OK | Contact EN – Privacy policy link | `/en/contact` | `/en/privacy-policy` | `/en/privacy-policy` | 0 | 200 |
| 69 | ✅ OK | Cookie RO – Privacy policy | `/ro` | `/ro/politica-confidentialitate` | `/ro/politica-confidentialitate` | 0 | 200 |
| 70 | ✅ OK | Cookie EN – Privacy policy | `/en` | `/en/privacy-policy` | `/en/privacy-policy` | 0 | 200 |
| 71 | ✅ OK | Privacy RO – page | `/ro` | `/ro/politica-confidentialitate` | `/ro/politica-confidentialitate` | 0 | 200 |
| 72 | ✅ OK | Privacy EN – page | `/en` | `/en/privacy-policy` | `/en/privacy-policy` | 0 | 200 |
| 73 | ✅ OK | Terms RO – page | `/ro` | `/ro/termeni-si-conditii` | `/ro/termeni-si-conditii` | 0 | 200 |
| 74 | ✅ OK | Terms EN – page | `/en` | `/en/terms-and-conditions` | `/en/terms-and-conditions` | 0 | 200 |
| 75 | ✅ OK | 404 – Back to Home | `/nonexistent` | `/ro` | `/ro` | 0 | 200 |
| 76 | ✅ OK | Global error – Back to Home | `/` | `/ro` | `/ro` | 0 | 200 |
| 77 | ✅ OK | Portfolio RO – page | `/ro` | `/ro/portofoliu` | `/ro/portofoliu` | 0 | 200 |
| 78 | ✅ OK | Portfolio EN – page | `/en` | `/en/portfolio` | `/en/portfolio` | 0 | 200 |
| 79 | ✅ OK | Rewrite EN /en/services → /en/servicii | `/en` | `/en/services` | `/en/services` | 0 | 200 |
| 80 | ✅ OK | Rewrite EN /en/about → /en/despre-noi | `/en` | `/en/about` | `/en/about` | 0 | 200 |
| 81 | ✅ OK | Rewrite EN /en/portfolio → /en/portofoliu | `/en` | `/en/portfolio` | `/en/portfolio` | 0 | 200 |
| 82 | ✅ OK | Rewrite EN /en/products → /en/produse | `/en` | `/en/products` | `/en/products` | 0 | 200 |
| 83 | ✅ OK | Rewrite EN /en/privacy-policy | `/en` | `/en/privacy-policy` | `/en/privacy-policy` | 0 | 200 |
| 84 | ✅ OK | Rewrite EN /en/terms-and-conditions | `/en` | `/en/terms-and-conditions` | `/en/terms-and-conditions` | 0 | 200 |
| 85 | ✅ OK | Blog content (hardcoded) – /ro/servicii | `/ro/blog/post` | `/ro/servicii` | `/ro/servicii` | 0 | 200 |
| 86 | ✅ OK | Blog content (hardcoded) – /ro/contact | `/ro/blog/post` | `/ro/contact` | `/ro/contact` | 0 | 200 |
