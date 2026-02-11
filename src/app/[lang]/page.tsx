import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries/get-dictionary";
import type { Locale } from "@/i18n-config";
import { HeroSection } from "./_components/hero-section";
import { TrustBar } from "./_components/trust-bar";
import { ServicesPreview } from "./_components/services-preview";
import { ValueProposition } from "./_components/value-proposition";
import { CtaBanner } from "@/components/cta-banner";

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return {
    title: `Rammer Tech | ${lang === "ro" ? "Solutii Digitale pentru Afaceri" : "Digital Solutions for Business"}`,
    description: dict.hero.subtitle,
    openGraph: {
      title: "Rammer Tech",
      description: dict.hero.subtitle,
      locale: lang === "ro" ? "ro_RO" : "en_US",
      type: "website",
      siteName: "Rammer Tech",
    },
    alternates: {
      canonical: `/${lang}`,
      languages: { ro: "/ro", en: "/en" },
    },
  };
}

export default async function Home({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <HeroSection
        title={dict.hero.title}
        subtitle={dict.hero.subtitle}
        cta={dict.hero.cta}
        ctaSecondary={dict.hero.ctaSecondary}
        lang={lang}
      />

      <TrustBar labels={dict.trustBar} />

      <ServicesPreview
        title={dict.servicesPreview.title}
        viewAll={dict.servicesPreview.viewAll}
        learnMore={dict.servicesPreview.learnMore}
        items={dict.servicesPreview.items}
        lang={lang}
      />

      <ValueProposition
        title={dict.valueProposition.title}
        items={dict.valueProposition.items}
      />

      <CtaBanner
        title={dict.ctaBanner.home.title}
        subtitle={dict.ctaBanner.home.subtitle}
        ctaText={dict.ctaBanner.home.cta}
        ctaHref={`/${lang}/contact`}
        variant="primary"
      />

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Rammer Tech",
            url: "https://rammer.tech",
            description: dict.hero.subtitle,
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer service",
              email: "contact@rammer.tech",
            },
          }),
        }}
      />
    </>
  );
}
