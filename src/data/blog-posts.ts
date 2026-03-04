export interface BlogPost {
  slug: string;
  category: "software" | "consulting" | "products" | "news";
  date: string;
  author: string;
  readingTime: number;
  coverImage: string;
  title: string;
  excerpt: string;
  content: string;
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
