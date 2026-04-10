import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/dictionaries/get-dictionary";
import type { Locale } from "@/i18n-config";
import { buildAlternates } from "@/lib/metadata-alternates";
import { getLocaleAlternates, getPublicPath } from "@/lib/locale-slugs";
import { WebPageJsonLd } from "@/components/web-page-json-ld";
import { FaqAccordion } from "@/components/faq-accordion";
import { ServicesHero } from "./_components/services-hero";
import { ServiceDetailCard } from "./_components/service-detail-card";
import { WorkflowTimeline } from "./_components/workflow-timeline";
import { CtaBanner } from "@/components/cta-banner";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rammertech.ro";

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const { canonical, languages } = buildAlternates("/servicii", lang, getLocaleAlternates("servicii"));

  return {
    title: dict.services.metaTitle,
    description: dict.services.metaDescription,
    openGraph: {
      title: dict.services.metaTitle,
      description: dict.services.metaDescription,
      locale: lang === "ro" ? "ro_RO" : "en_US",
      type: "website",
      siteName: "Rammer Tech",
    },
    alternates: { canonical, languages },
  };
}

export default async function ServicesPage({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <ServicesHero
        title={dict.services.pageTitle}
        subtitle={dict.services.pageSubtitle}
        lang={lang}
        homeLabel={dict.common.home}
        pageLabel={dict.navigation.services}
      />

      {dict.services.items.map((service, idx) => (
        <ServiceDetailCard
          key={idx}
          index={idx}
          title={service.title}
          description={service.description}
          icon={service.icon}
          features={service.features}
          cta={service.cta}
          ctaParam={service.ctaParam}
          lang={lang}
        />
      ))}

      <WorkflowTimeline
        title={dict.services.workflow.title}
        steps={dict.services.workflow.steps}
      />

      {/* HowTo JSON-LD for workflow */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: dict.services.workflow.title,
            description: lang === "ro"
              ? "Cum dezvoltăm software personalizat: de la descoperire la suport continuu."
              : "How we develop custom software: from discovery to ongoing support.",
            totalTime: "PT12W",
            step: dict.services.workflow.steps.map(
              (step: { title: string; description: string }, idx: number) => ({
                "@type": "HowToStep",
                position: idx + 1,
                name: step.title,
                text: step.description,
              })
            ),
          }).replace(/</g, "\\u003c"),
        }}
      />

      {/* FAQ Section */}
      <section className="py-16 px-6 bg-muted/50">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold mb-8 text-center">
            {dict.services.faq.title}
          </h2>
          <FaqAccordion items={dict.services.faq.items} schema />
          <p className="mt-8 text-center text-muted-foreground text-sm">
            {lang === "ro" ? (
              <>
                Citește mai multe pe{" "}
                <Link href={`/${lang}/blog`} className="text-primary underline hover:text-primary/80">
                  blogul nostru
                </Link>{" "}
                despre dezvoltare software și transformare digitală.
              </>
            ) : (
              <>
                Read more on our{" "}
                <Link href={`/${lang}/blog`} className="text-primary underline hover:text-primary/80">
                  blog
                </Link>{" "}
                about software development and digital transformation.
              </>
            )}
          </p>
        </div>
      </section>

      <CtaBanner
        title={dict.services.ctaBanner.title}
        subtitle={dict.services.ctaBanner.subtitle}
        ctaText={dict.services.ctaBanner.cta}
        ctaHref={`/${lang}/contact`}
        variant="primary"
      />

      {/* WebPage JSON-LD */}
      <WebPageJsonLd
        name={dict.services.metaTitle}
        description={dict.services.metaDescription}
        url={`${SITE_URL}/${lang}${getPublicPath("servicii", lang)}`}
        inLanguage={lang}
      />
    </>
  );
}
