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

// Temporary: Articles will be added later
export const blogPosts: BlogPost[] = [];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getPostsByCategory(category?: string): BlogPost[] {
  if (!category || category === "all") return blogPosts;
  return blogPosts.filter((p) => p.category === category);
}
