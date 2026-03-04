export interface Project {
  slug: string;
  category: "web" | "enterprise" | "product";
  technologies: string[];
  image: string;
  title: string;
  client: string;
  description: string;
}

export const projects: Project[] = [
  {
    slug: "erp-companie-logistica",
    category: "enterprise",
    technologies: ["React", "Node.js", "MongoDB", "Docker"],
    image: "/projects/erp-logistics.jpg",
    title: "ERP Companie Logistica",
    client: "Companie de logistica, Romania",
    description:
      "Sistem ERP personalizat pentru gestionarea flotei, comenzilor si facturilor, cu integrare cu sisteme de contabilitate existente.",
  },
  {
    slug: "aplicatie-mobile-retail",
    category: "web",
    technologies: ["React Native", "Firebase", "Stripe", "TypeScript"],
    image: "/projects/retail-app.jpg",
    title: "Aplicatie Mobile Retail",
    client: "Lant de magazine, Romania",
    description:
      "Aplicatie mobila cross-platform pentru comenzi online, program de loialitate si notificari push personalizate.",
  },
];
