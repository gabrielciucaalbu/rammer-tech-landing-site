"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CategoryFilter } from "./category-filter";
import type { BlogPost } from "@/data/blog-posts";

interface ArticleGridProps {
  posts: BlogPost[];
  categories: Record<string, string>;
  lang: string;
  readMore: string;
  minRead: string;
  noArticles: string;
}

export function ArticleGrid({
  posts,
  categories,
  lang,
  readMore,
  minRead,
  noArticles,
}: ArticleGridProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const locale = lang as "ro" | "en";

  const filtered =
    activeCategory === "all"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-10">
      <CategoryFilter
        categories={categories}
        active={activeCategory}
        onChange={setActiveCategory}
      />

      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">{noArticles}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/${lang}/blog/${post.slug}`}
              className="group rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Image placeholder */}
              <div className="aspect-video bg-muted flex items-center justify-center">
                <span className="text-muted-foreground text-xs">
                  {post.title[locale]}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {categories[post.category] || post.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {post.readingTime} {minRead}
                  </span>
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title[locale]}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {post.excerpt[locale]}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {new Date(post.date).toLocaleDateString(
                      lang === "ro" ? "ro-RO" : "en-US",
                      { year: "numeric", month: "long", day: "numeric" }
                    )}
                  </span>
                  <span className="text-sm font-medium text-primary">
                    {readMore} &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
