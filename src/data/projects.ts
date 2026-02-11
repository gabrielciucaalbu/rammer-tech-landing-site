export interface Project {
  slug: string;
  category: "web" | "enterprise" | "seap" | "product";
  technologies: string[];
  image: string;
  title: {
    ro: string;
    en: string;
  };
  client: {
    ro: string;
    en: string;
  };
  description: {
    ro: string;
    en: string;
  };
}

export const projects: Project[] = [
  {
    slug: "platforma-monitorizare-seap",
    category: "seap",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "API SEAP"],
    image: "/projects/seap-platform.jpg",
    title: {
      ro: "Platforma Monitorizare SEAP",
      en: "SEAP Monitoring Platform",
    },
    client: {
      ro: "Client din sectorul public",
      en: "Public sector client",
    },
    description: {
      ro: "Platforma web pentru monitorizarea si alertarea automata a licitatiilor relevante din SEAP, cu dashboard de analiza si raportare.",
      en: "Web platform for automatic monitoring and alerting of relevant SEAP tenders, with analysis dashboard and reporting.",
    },
  },
  {
    slug: "erp-companie-logistica",
    category: "enterprise",
    technologies: ["React", "Node.js", "MongoDB", "Docker"],
    image: "/projects/erp-logistics.jpg",
    title: {
      ro: "ERP Companie Logistica",
      en: "Logistics Company ERP",
    },
    client: {
      ro: "Companie de logistica, Romania",
      en: "Logistics company, Romania",
    },
    description: {
      ro: "Sistem ERP personalizat pentru gestionarea flotei, comenzilor si facturilor, cu integrare cu sisteme de contabilitate existente.",
      en: "Custom ERP system for fleet, order, and invoice management, integrated with existing accounting systems.",
    },
  },
  {
    slug: "aplicatie-mobile-retail",
    category: "web",
    technologies: ["React Native", "Firebase", "Stripe", "TypeScript"],
    image: "/projects/retail-app.jpg",
    title: {
      ro: "Aplicatie Mobile Retail",
      en: "Retail Mobile Application",
    },
    client: {
      ro: "Lant de magazine, Romania",
      en: "Retail chain, Romania",
    },
    description: {
      ro: "Aplicatie mobila cross-platform pentru comenzi online, program de loialitate si notificari push personalizate.",
      en: "Cross-platform mobile app for online orders, loyalty program, and personalized push notifications.",
    },
  },
];
