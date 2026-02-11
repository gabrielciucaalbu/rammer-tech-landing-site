import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/dictionaries/get-dictionary";
import type { Locale } from "@/i18n-config";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/cta-banner";
import { StatsCounter } from "@/components/stats-counter";
import { FaqAccordion } from "@/components/faq-accordion";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  FileText,
  Upload,
  Search,
  Target,
  Scale,
  GraduationCap,
  ClipboardList,
  Send,
  ClipboardCheck,
  Shield,
  Monitor,
  ArrowRight,
  BarChart3,
  FileCode,
  LayoutDashboard,
  Link as LinkIcon,
} from "lucide-react";

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return {
    title: dict.seap.metaTitle,
    description: dict.seap.metaDescription,
    openGraph: {
      title: dict.seap.metaTitle,
      description: dict.seap.metaDescription,
      locale: lang === "ro" ? "ro_RO" : "en_US",
      type: "website",
      siteName: "Rammer Tech",
    },
    alternates: {
      canonical: `/${lang}/seap-sicap`,
      languages: { ro: "/ro/seap-sicap", en: "/en/seap-sicap" },
    },
  };
}

const operatorIcons = [FileText, Upload, Search, Target, Scale, GraduationCap];
const authorityIcons = [ClipboardList, Send, ClipboardCheck, Shield, Monitor];
const softwareIcons = [BarChart3, FileCode, LayoutDashboard, LinkIcon];

export default async function SeapPage({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const { seap } = dict;

  return (
    <>
      {/* Hero */}
      <section className="py-20 px-6 bg-gradient-to-br from-brand-600 via-brand-800 to-brand-950 text-white">
        <div className="container mx-auto max-w-4xl">
          <Breadcrumbs
            lang={lang}
            items={[
              { label: dict.common.home, href: "" },
              { label: dict.navigation.seap },
            ]}
          />
          <h1 className="text-3xl md:text-5xl font-bold mt-6 mb-4">
            {seap.hero.title}
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mb-8">
            {seap.hero.subtitle}
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-brand-800 hover:bg-brand-50 font-semibold"
          >
            <Link href={`/${lang}/contact?serviciu=seap`}>
              {seap.hero.cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Explainer */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            {seap.explainer.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-bold text-primary mb-2">
                {seap.explainer.seapTitle}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {seap.explainer.seapDescription}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-bold text-primary mb-2">
                {seap.explainer.sicapTitle}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {seap.explainer.sicapDescription}
              </p>
            </div>
          </div>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {seap.explainer.whyMatters}
          </p>
        </div>
      </section>

      {/* Operator Services */}
      <section className="py-16 px-6 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            {seap.operatorServices.title}
          </h2>
          <p className="text-muted-foreground mb-8">
            {seap.operatorServices.subtitle}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {seap.operatorServices.items.map((item, idx) => {
              const Icon = operatorIcons[idx] || CheckCircle;
              return (
                <div
                  key={idx}
                  className="flex items-start gap-3 bg-card rounded-lg p-4 border border-border"
                >
                  <Icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Authority Services */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            {seap.authorityServices.title}
          </h2>
          <p className="text-muted-foreground mb-8">
            {seap.authorityServices.subtitle}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {seap.authorityServices.items.map((item, idx) => {
              const Icon = authorityIcons[idx] || CheckCircle;
              return (
                <div
                  key={idx}
                  className="flex items-start gap-3 bg-card rounded-lg p-4 border border-border"
                >
                  <Icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Software Solutions */}
      <section className="py-16 px-6 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            {seap.software.title}
          </h2>
          <p className="text-muted-foreground mb-8">
            {seap.software.subtitle}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {seap.software.items.map((item, idx) => {
              const Icon = softwareIcons[idx] || CheckCircle;
              return (
                <div
                  key={idx}
                  className="flex items-start gap-3 bg-card rounded-lg p-4 border border-border"
                >
                  <Icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsCounter
        variant="dark"
        items={[
          { value: 50, suffix: "+", label: seap.stats.tendersWon },
          { value: 10, suffix: "+", label: seap.stats.contractValue },
          { value: 85, suffix: "%", label: seap.stats.successRate },
          { value: 30, suffix: "+", label: seap.stats.clientsAssisted },
        ]}
      />

      {/* FAQ */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            {seap.faq.title}
          </h2>
          <FaqAccordion items={seap.faq.items} schema />
        </div>
      </section>

      {/* CTA */}
      <CtaBanner
        title={seap.ctaBanner.title}
        subtitle={seap.ctaBanner.subtitle}
        ctaText={seap.ctaBanner.cta}
        ctaHref={`/${lang}/contact?serviciu=seap`}
        variant="primary"
      />

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: seap.hero.title,
            description: seap.hero.subtitle,
            provider: {
              "@type": "Organization",
              name: "Rammer Tech",
            },
          }),
        }}
      />
    </>
  );
}
