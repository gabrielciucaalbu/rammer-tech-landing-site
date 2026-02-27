import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries/get-dictionary";
import type { Locale } from "@/i18n-config";
import { buildAlternates } from "@/lib/metadata-alternates";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/cta-banner";
import { ArticleGrid } from "./_components/article-grid";
import { blogPosts } from "@/data/blog-posts";

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const { canonical, languages } = buildAlternates("/blog", lang);

  return {
    title: dict.blog.metaTitle,
    description: dict.blog.metaDescription,
    openGraph: {
      title: dict.blog.metaTitle,
      description: dict.blog.metaDescription,
      locale: lang === "ro" ? "ro_RO" : "en_US",
      type: "website",
      siteName: "Rammer Tech",
    },
    alternates: { canonical, languages },
  };
}

export default async function BlogPage({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      {/* Hero */}
      <section className="py-16 px-6 bg-gradient-to-b from-accent to-background">
        <div className="container mx-auto max-w-4xl">
          <Breadcrumbs
            lang={lang}
            items={[
              { label: dict.common.home, href: "" },
              { label: dict.navigation.blog },
            ]}
          />
          <h1 className="text-3xl md:text-5xl font-bold mt-6 mb-4">
            {dict.blog.hero.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {dict.blog.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <ArticleGrid
            posts={blogPosts}
            categories={dict.blog.categories}
            lang={lang}
            readMore={dict.blog.readMore}
            minRead={dict.blog.minRead}
            noArticles={dict.blog.noArticles}
          />
        </div>
      </section>

      {/* CTA */}
      <CtaBanner
        title={dict.blog.ctaBanner.title}
        subtitle={dict.blog.ctaBanner.subtitle}
        ctaText={dict.blog.ctaBanner.cta}
        ctaHref={`/${lang}/contact`}
        variant="primary"
      />
    </>
  );
}
