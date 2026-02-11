export interface BlogPost {
  slug: string;
  category: "software" | "seap" | "consulting" | "products" | "news";
  date: string;
  author: string;
  readingTime: number;
  coverImage: string;
  title: { ro: string; en: string };
  excerpt: { ro: string; en: string };
  content: { ro: string; en: string };
}

export const blogPosts: BlogPost[] = [
  {
    slug: "ghid-complet-seap-2026",
    category: "seap",
    date: "2026-02-10",
    author: "Rammer Tech",
    readingTime: 8,
    coverImage: "/blog/seap-guide.jpg",
    title: {
      ro: "Ghid Complet SEAP 2026: Tot ce Trebuie sa Stii despre Licitatii Publice",
      en: "Complete SEAP Guide 2026: Everything You Need to Know About Public Tenders",
    },
    excerpt: {
      ro: "Un ghid pas cu pas pentru navigarea Sistemului Electronic de Achizitii Publice in 2026. Afla cum sa identifici oportunitati si sa depui oferte castigatoare.",
      en: "A step-by-step guide to navigating Romania's Electronic Public Procurement System in 2026. Learn how to identify opportunities and submit winning bids.",
    },
    content: {
      ro: "Sistemul Electronic de Achizitii Publice (SEAP) este platforma nationala pentru achizitiile publice din Romania. In acest ghid complet, vom acoperi tot ce trebuie sa stii pentru a naviga cu succes acest sistem complex.\n\n## Ce este SEAP?\n\nSEAP este platforma online unde autoritatile contractante din Romania publica procedurile de achizitie publica. Operatorii economici pot accesa aceste oportunitati si depune oferte.\n\n## Cum sa te inregistrezi\n\nPrimul pas este crearea unui cont pe platforma SEAP. Vei avea nevoie de certificat digital si de documentele companiei.\n\n## Identificarea oportunitatilor\n\nMonitorizarea regulata a platformei este esentiala. Foloseste filtrele de cautare pentru a gasi licitatii relevante pentru profilul tau.\n\n## Pregatirea ofertei\n\nDocumentatia trebuie sa fie completa si conforma cu cerintele din fisa de date. Propunerea tehnica si cea financiara trebuie pregatite cu atentie.",
      en: "The Electronic Public Procurement System (SEAP) is Romania's national platform for public procurement. In this comprehensive guide, we'll cover everything you need to know to successfully navigate this complex system.\n\n## What is SEAP?\n\nSEAP is the online platform where contracting authorities in Romania publish public procurement procedures. Economic operators can access these opportunities and submit bids.\n\n## How to Register\n\nThe first step is creating an account on the SEAP platform. You'll need a digital certificate and company documents.\n\n## Identifying Opportunities\n\nRegular platform monitoring is essential. Use search filters to find relevant tenders for your profile.\n\n## Preparing Your Bid\n\nDocumentation must be complete and compliant with the data sheet requirements. Both technical and financial proposals must be carefully prepared.",
    },
  },
  {
    slug: "de-ce-typescript-2026",
    category: "software",
    date: "2026-01-28",
    author: "Rammer Tech",
    readingTime: 5,
    coverImage: "/blog/typescript.jpg",
    title: {
      ro: "De Ce TypeScript Este Alegerea Potrivita in 2026",
      en: "Why TypeScript Is the Right Choice in 2026",
    },
    excerpt: {
      ro: "TypeScript a devenit standardul de facto pentru dezvoltarea web moderna. Afla de ce il recomandam pentru orice proiect nou.",
      en: "TypeScript has become the de facto standard for modern web development. Learn why we recommend it for every new project.",
    },
    content: {
      ro: "TypeScript aduce tipare de date statice in JavaScript, reducand bug-urile si imbunatatind experienta de dezvoltare.\n\n## Beneficii cheie\n\n- Detectarea erorilor la compilare\n- Autocompletare mai buna in IDE\n- Refactorizare sigura\n- Documentatie implicita prin tipuri\n\n## Ecosistemul in 2026\n\nFramework-urile majore (Next.js, Nuxt, SvelteKit) ofera suport nativ pentru TypeScript.",
      en: "TypeScript brings static typing to JavaScript, reducing bugs and improving the development experience.\n\n## Key Benefits\n\n- Compile-time error detection\n- Better IDE autocompletion\n- Safe refactoring\n- Implicit documentation through types\n\n## The 2026 Ecosystem\n\nMajor frameworks (Next.js, Nuxt, SvelteKit) offer native TypeScript support.",
    },
  },
  {
    slug: "transformare-digitala-imm",
    category: "consulting",
    date: "2026-01-15",
    author: "Rammer Tech",
    readingTime: 6,
    coverImage: "/blog/digital-transformation.jpg",
    title: {
      ro: "Transformare Digitala pentru IMM-uri: De Unde Incepi?",
      en: "Digital Transformation for SMEs: Where to Start?",
    },
    excerpt: {
      ro: "Ghid practic pentru IMM-urile care vor sa isi digitalizeze procesele. De la audit la implementare, pas cu pas.",
      en: "Practical guide for SMEs looking to digitalize their processes. From audit to implementation, step by step.",
    },
    content: {
      ro: "Transformarea digitala nu inseamna doar adoptarea de tehnologie noua. Inseamna regandirea proceselor de business pentru era digitala.\n\n## Pasul 1: Audit\n\nAnalizeaza procesele actuale si identifica ineficientele.\n\n## Pasul 2: Prioritizare\n\nNu poti digitaliza totul dintr-o data. Alege procesele cu cel mai mare impact.\n\n## Pasul 3: Implementare\n\nIncepe cu un proiect pilot, masoara rezultatele, apoi extinde.",
      en: "Digital transformation isn't just about adopting new technology. It means rethinking business processes for the digital era.\n\n## Step 1: Audit\n\nAnalyze current processes and identify inefficiencies.\n\n## Step 2: Prioritization\n\nYou can't digitalize everything at once. Choose processes with the greatest impact.\n\n## Step 3: Implementation\n\nStart with a pilot project, measure results, then scale.",
    },
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getPostsByCategory(category?: string): BlogPost[] {
  if (!category || category === "all") return blogPosts;
  return blogPosts.filter((p) => p.category === category);
}
