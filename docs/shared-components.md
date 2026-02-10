# Componente Partajate (Shared Components)

Componente care apar pe toate paginile sau sunt reutilizate pe mai multe pagini.

---

## 1. Header / Navigatie

### Descriere

Navigatia principala a site-ului. Prezenta pe **toate paginile**. Trebuie sa fie clara, rapida si sa nu distraga de la continut.

### Elemente

- **Logo**: Rammer Tech logo (link catre Home)
- **Menu principal** (desktop):
  - Acasa
  - Servicii
  - Despre Noi
  - Portofoliu
  - SEAP/SICAP
  - Produse
  - Blog
- **CTA Header**: Buton "Contact" (stilizat diferit -- `bg-primary`)
- **Language switcher**: RO / EN toggle
- **Mobile menu**: Hamburger -> Full-screen overlay sau slide-in drawer

### Comportament

- **Sticky header**: Ramane fixat in partea de sus la scroll
- **Background transition**: Transparent pe hero -> `bg-background/80 backdrop-blur` la scroll
- **Active state**: Link-ul paginii curente e evidentialat (text-primary, underline, sau bold)
- **Mobile**: Hamburger menu cu animatie de deschidere/inchidere (Framer Motion)

### Design specs

- Inaltime: `h-16` (64px) desktop, `h-14` (56px) mobile
- Spacing: `px-6` mobile, `container mx-auto` desktop
- Font: `text-sm font-medium` pentru link-uri
- CTA: `btn-primary` size small

### Componenta

| Fisier | Tip |
|--------|-----|
| `src/components/header.tsx` | Client (scroll detection, mobile menu) |
| `src/components/mobile-nav.tsx` | Client (animatii) |
| `src/components/language-switcher.tsx` | Client |

---

## 2. Footer

### Descriere

Footer-ul site-ului. Prezent pe **toate paginile**. Ofera navigatie secundara, informatii de contact rapide si link-uri legale.

### Elemente

- **Logo + tagline**: Rammer Tech logo (mic) + _"Inovatie. Performanta. Incredere."_
- **Coloane de link-uri** (3-4 coloane pe desktop):
  
  **Companie**
  - Despre Noi
  - Echipa
  - Cariere (optional, link mort sau "Coming soon")
  
  **Servicii**
  - Dezvoltare Web & Mobile
  - Solutii Enterprise
  - Consultanta IT
  - SEAP/SICAP
  
  **Resurse**
  - Blog
  - Portofoliu
  - Produse
  
  **Legal**
  - Politica de Confidentialitate
  - Termeni si Conditii

- **Date de contact**:
  - Email (clickabil mailto:)
  - Telefon (clickabil tel:)
  - Locatie

- **Social media icons**: LinkedIn, GitHub (alte retele daca exista)

- **Copyright bar** (bottom):
  - `© 2026 Rammer Tech. Toate drepturile rezervate.`
  - Construita cu Next.js (optional, subtil)

### Design specs

- Background: `bg-brand-950` (inchis, din paleta brand)
- Text: `text-brand-100` pentru text principal, `text-brand-300` pentru link-uri
- Hover links: `text-white`
- Padding: `py-16` top, `py-6` bottom bar
- Layout: 4 coloane pe desktop, stacked pe mobile

### Componenta

| Fisier | Tip |
|--------|-----|
| `src/components/footer.tsx` | Server |

---

## 3. CTA Banner

### Descriere

Banner full-width de call-to-action. Apare in partea de jos a majoritatii paginilor (inainte de footer). Mesajul si butonul variaza per pagina.

### Props

```typescript
interface CtaBannerProps {
  title: string;         // Mesajul principal
  subtitle?: string;     // Mesaj secundar (optional)
  ctaText: string;       // Textul butonului
  ctaHref: string;       // Link-ul butonului
  variant?: 'primary' | 'dark'; // Stilul vizual
}
```

### Design specs

- **Variant primary**: `bg-primary text-primary-foreground`
- **Variant dark**: `bg-brand-950 text-white`
- Padding: `py-16 px-6`
- Text centrat
- Titlu: `text-3xl font-bold`
- Buton: size large, contrast vizibil (white pe primary, primary pe dark)
- **Animatie**: Fade-in la scroll

### Componenta

| Fisier | Tip |
|--------|-----|
| `src/components/cta-banner.tsx` | Server (sau Client daca are animatii) |

---

## 4. SEO / Meta Tags

### Descriere

Componenta de meta tags pentru fiecare pagina. Gestioneaza title, description, Open Graph, Twitter Cards si schema.org.

### Implementare

- Folosim **Next.js Metadata API** (export `metadata` sau `generateMetadata`)
- Nu e o componenta vizuala, ci logica de metadata per pagina

### Template metadata

```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      locale: lang === 'ro' ? 'ro_RO' : 'en_US',
      type: 'website',
      siteName: 'Rammer Tech',
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.title,
      description: dict.meta.description,
    },
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'ro': '/ro',
        'en': '/en',
      },
    },
  };
}
```

### Checklist SEO per pagina

- [ ] `<title>` unic si descriptiv (max 60 caractere)
- [ ] `<meta name="description">` unic (max 160 caractere)
- [ ] Open Graph tags (og:title, og:description, og:image)
- [ ] `<link rel="canonical">` corect
- [ ] `hreflang` tags pentru RO/EN
- [ ] Schema.org JSON-LD (per pagina, tipul potrivit)
- [ ] H1 unic pe pagina
- [ ] Imagini cu `alt` text descriptiv

---

## 5. Cookie Banner

### Descriere

Banner de consimtamant cookies -- **obligatoriu GDPR**. Apare la prima vizita si permite utilizatorului sa accepte/refuze cookies non-esentiale.

### Elemente

- Mesaj: _"Folosim cookies pentru a-ti imbunatati experienta..."_
- Link: "Afla mai mult" -> `/politica-confidentialitate`
- Butoane:
  - "Accepta toate" (primary)
  - "Doar necesare" (secondary/outline)
  - "Personalizeaza" (text link, optional)
- Stare: Salvata in localStorage, nu mai apare dupa decizie

### Design specs

- Pozitie: Fixed bottom
- Background: `bg-card` cu `border-t border-border`
- Shadow: `shadow-lg`
- **Animatie**: Slide-up la aparitie, slide-down la dismiss

### Componenta

| Fisier | Tip |
|--------|-----|
| `src/components/cookie-banner.tsx` | Client |

---

## 6. Breadcrumbs

### Descriere

Navigatie secundara care arata pozitia curenta in ierarhia site-ului. Apare pe toate paginile in afara de Home.

### Exemplu

`Acasa > Servicii > Dezvoltare Web` sau `Acasa > Blog > [Titlu Articol]`

### Design specs

- Pozitie: Sub header, deasupra hero-ului paginii
- Font: `text-sm text-muted-foreground`
- Separator: `/` sau `>`
- Ultimul element: `text-foreground font-medium` (nu e link)
- Schema.org: `BreadcrumbList`

### Componenta

| Fisier | Tip |
|--------|-----|
| `src/components/breadcrumbs.tsx` | Server |

---

## 7. FAQ Accordion

### Descriere

Componenta reutilizabila pentru intrebari frecvente. Folosita pe paginile SEAP/SICAP si Contact.

### Props

```typescript
interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  schema?: boolean; // Adauga FAQPage schema.org
}
```

### Design

- Bazat pe shadcn/ui `Accordion` component
- **Animatie**: Expand/collapse smooth
- Schema.org FAQPage cand `schema={true}`

### Componenta

| Fisier | Tip |
|--------|-----|
| `src/components/faq-accordion.tsx` | Client |

---

## 8. Stats Counter

### Descriere

Componenta cu numere animate (count-up) pentru cifre de impact. Folosita pe Home (Trust Bar) si SEAP/SICAP.

### Props

```typescript
interface StatItem {
  value: number;
  suffix?: string; // "+", "%", "M", etc.
  label: string;
  icon?: string;   // Lucide icon name
}

interface StatsCounterProps {
  items: StatItem[];
  variant?: 'default' | 'dark';
}
```

### Comportament

- Animatie count-up se activeaza cand componenta intra in viewport (Intersection Observer)
- Se animeaza o singura data (nu re-trigger la re-scroll)
- Durata: ~2 secunde

### Componenta

| Fisier | Tip |
|--------|-----|
| `src/components/stats-counter.tsx` | Client |

---

## Rezumat structura fisiere componente partajate

```
src/components/
  ├── header.tsx
  ├── mobile-nav.tsx
  ├── language-switcher.tsx
  ├── footer.tsx
  ├── cta-banner.tsx
  ├── cookie-banner.tsx
  ├── breadcrumbs.tsx
  ├── faq-accordion.tsx
  ├── stats-counter.tsx
  └── ui/               (shadcn/ui - auto-generated)
      ├── accordion.tsx
      ├── button.tsx
      └── ...
```
