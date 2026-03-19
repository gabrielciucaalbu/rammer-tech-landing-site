import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries/get-dictionary";
import type { Locale } from "@/i18n-config";
import { buildAlternates } from "@/lib/metadata-alternates";
import { WebPageJsonLd } from "@/components/web-page-json-ld";
import { HeroSection } from "./_components/hero-section";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rammertech.ro";
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
  const { canonical, languages } = buildAlternates("", lang);

  return {
    title: dict.meta.homeTitle,
    description: dict.meta.homeDescription,
    openGraph: {
      title: dict.meta.homeTitle,
      description: dict.meta.homeDescription,
      locale: lang === "ro" ? "ro_RO" : "en_US",
      type: "website",
      siteName: "Rammer Tech",
    },
    alternates: { canonical, languages },
  };
}

export default async function Home({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <HeroSection
        title={dict.meta.homeH1}
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
        learnMoreAbout={dict.servicesPreview.learnMoreAbout}
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

      {/* Schema.org Organization JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Rammer Tech",
            url: SITE_URL,
            logo: `${SITE_URL}/Rammer_Tech_LOGO.png`,
            description: dict.hero.subtitle,
            foundingDate: "2025",
            address: {
              "@type": "PostalAddress",
              addressLocality: "București",
              addressRegion: "București",
              addressCountry: "RO",
            },
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer service",
              email: "office@mail.rammertech.ro",
              telephone: "+40736459926",
              availableLanguage: ["Romanian", "English"],
            },
            sameAs: [
              "https://www.linkedin.com/company/rammer-tech/",
            ],
          }).replace(/</g, "\\u003c"),
        }}
      />

      {/* WebPage JSON-LD */}
      <WebPageJsonLd
        name={dict.meta.homeTitle}
        description={dict.meta.homeDescription}
        url={`${SITE_URL}/${lang}`}
      />

      {/* Schema.org WebSite JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Rammer Tech",
            url: SITE_URL,
            inLanguage: ["ro", "en"],
            publisher: {
              "@type": "Organization",
              name: "Rammer Tech",
            },
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
