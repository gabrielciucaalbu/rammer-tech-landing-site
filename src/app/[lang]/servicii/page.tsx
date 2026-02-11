import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries/get-dictionary";
import type { Locale } from "@/i18n-config";
import { ServicesHero } from "./_components/services-hero";
import { ServiceDetailCard } from "./_components/service-detail-card";
import { WorkflowTimeline } from "./_components/workflow-timeline";
import { CtaBanner } from "@/components/cta-banner";

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

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
    alternates: {
      canonical: `/${lang}/servicii`,
      languages: { ro: "/ro/servicii", en: "/en/servicii" },
    },
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
          isSeap={"isSeap" in service && Boolean(service.isSeap)}
          lang={lang}
        />
      ))}

      <WorkflowTimeline
        title={dict.services.workflow.title}
        steps={dict.services.workflow.steps}
      />

      <CtaBanner
        title={dict.services.ctaBanner.title}
        subtitle={dict.services.ctaBanner.subtitle}
        ctaText={dict.services.ctaBanner.cta}
        ctaHref={`/${lang}/contact`}
        variant="primary"
      />
    </>
  );
}
