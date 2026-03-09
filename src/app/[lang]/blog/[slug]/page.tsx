import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getDictionary } from "@/dictionaries/get-dictionary";
import type { Locale } from "@/i18n-config";
import { buildAlternates } from "@/lib/metadata-alternates";
import { stripDiacritics } from "@/lib/strip-diacritics";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/cta-banner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import { blogPosts, getPostBySlug } from "@/data/blog-posts";
import { getAuthorByName } from "@/data/authors";

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ lang: "ro", slug: post.slug }));
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rammertech.ro";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const { canonical, languages } = buildAlternates(`/blog/${slug}`, lang);
  const titleNoAccents = stripDiacritics(post.title);

  return {
    title: `${titleNoAccents} | Blog Rammer Tech`,
    description: post.excerpt,
    openGraph: {
      title: titleNoAccents,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      locale: "ro_RO",
      siteName: "Rammer Tech",
      images: post.coverImage ? [`${SITE_URL}${post.coverImage}`] : undefined,
    },
    alternates: { canonical, languages },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang as Locale);
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const author = getAuthorByName(post.author);

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
              { label: post.title },
            ]}
          />

          <Badge variant="secondary" className="mt-6 mb-4">
            {dict.blog.categories[post.category as keyof typeof dict.blog.categories] ||
              post.category}
          </Badge>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString("ro-RO", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
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
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-semibold mt-6 mb-3">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside space-y-1 mb-4">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside space-y-1 mb-4">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="text-muted-foreground">{children}</li>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto mb-4">
                  <table className="w-full border-collapse border border-border text-sm">
                    {children}
                  </table>
                </div>
              ),
              th: ({ children }) => (
                <th className="border border-border bg-muted px-3 py-2 text-left font-semibold">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border border-border px-3 py-2">{children}</td>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-primary underline hover:text-primary/80"
                  target={href?.startsWith("http") ? "_blank" : undefined}
                  rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {children}
                </a>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-foreground">{children}</strong>
              ),
            }}
          >
            {post.content}
          </Markdown>

          {/* Author bio */}
          {author && (
            <div className="mt-12 pt-8 border-t border-border flex items-start gap-4">
              <div>
                <p className="font-semibold text-foreground">{author.name}</p>
                <p className="text-sm text-muted-foreground">{author.jobTitle}</p>
                <p className="text-sm text-muted-foreground mt-2">{author.bio}</p>
              </div>
            </div>
          )}

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
            headline: post.title,
            description: post.excerpt,
            url: `${SITE_URL}/${lang}/blog/${slug}`,
            mainEntityOfPage: `${SITE_URL}/${lang}/blog/${slug}`,
            datePublished: post.date,
            dateModified: post.date,
            ...(post.coverImage && { image: `${SITE_URL}${post.coverImage}` }),
            author: {
              "@type": "Person",
              name: "Gabriel Ciucă-Albu",
              jobTitle: "Fondator & CTO",
              sameAs: ["https://www.linkedin.com/in/gabriel-octavian-ciuca-albu-33a717160/"],
            },
            publisher: {
              "@type": "Organization",
              name: "Rammer Tech",
              logo: {
                "@type": "ImageObject",
                url: `${SITE_URL}/Rammer_Tech_LOGO.png`,
              },
            },
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
