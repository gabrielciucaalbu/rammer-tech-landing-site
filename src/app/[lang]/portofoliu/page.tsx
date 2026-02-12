import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries/get-dictionary";
import type { Locale } from "@/i18n-config";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/cta-banner";
import { ProjectGrid } from "./_components/project-grid";
import { projects } from "@/data/projects";

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return {
    title: dict.portfolio.metaTitle,
    description: dict.portfolio.metaDescription,
    robots: { index: false },
    openGraph: {
      title: dict.portfolio.metaTitle,
      description: dict.portfolio.metaDescription,
      locale: lang === "ro" ? "ro_RO" : "en_US",
      type: "website",
      siteName: "Rammer Tech",
    },
    alternates: {
      canonical: `/${lang}/portofoliu`,
      languages: { ro: "/ro/portofoliu", en: "/en/portofoliu" },
    },
  };
}

export default async function PortfolioPage({ params }: Props) {
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
              { label: dict.navigation.portfolio },
            ]}
          />
          <h1 className="text-3xl md:text-5xl font-bold mt-6 mb-4">
            {dict.portfolio.hero.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {dict.portfolio.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <ProjectGrid
            projects={projects}
            filters={dict.portfolio.filters}
            viewDetails={dict.portfolio.viewDetails}
            lang={lang}
          />
        </div>
      </section>

      {/* CTA */}
      <CtaBanner
        title={dict.portfolio.ctaBanner.title}
        subtitle={dict.portfolio.ctaBanner.subtitle}
        ctaText={dict.portfolio.ctaBanner.cta}
        ctaHref={`/${lang}/contact`}
        variant="dark"
      />
    </>
  );
}
