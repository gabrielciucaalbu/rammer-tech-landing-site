import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/dictionaries/get-dictionary";
import type { Locale } from "@/i18n-config";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/cta-banner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import { blogPosts, getPostBySlug } from "@/data/blog-posts";

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.flatMap((post) => [
    { lang: "ro", slug: post.slug },
    { lang: "en", slug: post.slug },
  ]);
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rammertech.ro";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const locale = lang as "ro" | "en";
  return {
    title: `${post.title[locale]} | Blog Rammer Tech`,
    description: post.excerpt[locale],
    openGraph: {
      title: post.title[locale],
      description: post.excerpt[locale],
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      locale: lang === "ro" ? "ro_RO" : "en_US",
      siteName: "Rammer Tech",
      images: post.coverImage ? [`${SITE_URL}${post.coverImage}`] : undefined,
    },
    alternates: {
      canonical: `/${lang}/blog/${slug}`,
      languages: {
        ro: `/ro/blog/${slug}`,
        en: `/en/blog/${slug}`,
      },
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang as Locale);
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const locale = lang as "ro" | "en";

  // Simple markdown-like rendering (paragraphs and headings)
  const renderContent = (content: string) => {
    return content.split("\n\n").map((block, idx) => {
      if (block.startsWith("## ")) {
        return (
          <h2 key={idx} className="text-2xl font-bold mt-8 mb-4">
            {block.replace("## ", "")}
          </h2>
        );
      }
      if (block.startsWith("- ")) {
        const items = block.split("\n").filter((l) => l.startsWith("- "));
        return (
          <ul key={idx} className="list-disc list-inside space-y-1 mb-4">
            {items.map((item, i) => (
              <li key={i} className="text-muted-foreground">
                {item.replace("- ", "")}
              </li>
            ))}
          </ul>
        );
      }
      return (
        <p key={idx} className="text-muted-foreground leading-relaxed mb-4">
          {block}
        </p>
      );
    });
  };

  return (
    <>
      {/* Header */}
      <section className="py-16 px-6 bg-gradient-to-b from-accent to-background">
        <div className="container mx-auto max-w-3xl">
          <Breadcrumbs
            lang={lang}
            items={[
              { label: dict.common.home, href: "" },
              { label: dict.navigation.blog, href: "/blog" },
              { label: post.title[locale] },
            ]}
          />

          <Badge variant="secondary" className="mt-6 mb-4">
            {dict.blog.categories[post.category as keyof typeof dict.blog.categories] ||
              post.category}
          </Badge>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {post.title[locale]}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString(
                lang === "ro" ? "ro-RO" : "en-US",
                { year: "numeric", month: "long", day: "numeric" }
              )}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readingTime} {dict.blog.minRead}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="py-12 px-6">
        <div className="container mx-auto max-w-3xl prose-headings:text-foreground">
          {renderContent(post.content[locale])}

          <div className="mt-12 pt-8 border-t border-border">
            <Button asChild variant="outline">
              <Link href={`/${lang}/blog`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {dict.blog.allArticles}
              </Link>
            </Button>
          </div>
        </div>
      </article>

      {/* CTA */}
      <CtaBanner
        title={dict.blog.ctaBanner.title}
        subtitle={dict.blog.ctaBanner.subtitle}
        ctaText={dict.blog.ctaBanner.cta}
        ctaHref={`/${lang}/contact`}
        variant="primary"
      />

      {/* Schema.org BlogPosting */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title[locale],
            description: post.excerpt[locale],
            url: `${SITE_URL}/${lang}/blog/${slug}`,
            mainEntityOfPage: `${SITE_URL}/${lang}/blog/${slug}`,
            datePublished: post.date,
            ...(post.coverImage && { image: `${SITE_URL}${post.coverImage}` }),
            author: {
              "@type": "Person",
              name: post.author,
            },
            publisher: {
              "@type": "Organization",
              name: "Rammer Tech",
              logo: {
                "@type": "ImageObject",
                url: `${SITE_URL}/Rammer%20Tech%20LOGO.png`,
              },
            },
          }),
        }}
      />
    </>
  );
}
