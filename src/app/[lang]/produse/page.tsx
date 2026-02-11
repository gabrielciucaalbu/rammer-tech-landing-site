import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries/get-dictionary";
import type { Locale } from "@/i18n-config";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/cta-banner";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Bell,
  FileText,
  Search,
  Settings,
  Link as LinkIcon,
  ArrowRight,
} from "lucide-react";

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return {
    title: dict.products.metaTitle,
    description: dict.products.metaDescription,
    openGraph: {
      title: dict.products.metaTitle,
      description: dict.products.metaDescription,
      locale: lang === "ro" ? "ro_RO" : "en_US",
      type: "website",
      siteName: "Rammer Tech",
    },
    alternates: {
      canonical: `/${lang}/produse`,
      languages: { ro: "/ro/produse", en: "/en/produse" },
    },
  };
}

const featureIcons = [BarChart3, Bell, FileText, Search, Settings, LinkIcon];
const stepNumbers = ["01", "02", "03", "04"];

export default async function ProductsPage({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const { products } = dict;

  // Product-specific content (would come from CMS/data in production)
  const productFeatures =
    lang === "ro"
      ? [
          "Monitorizare automata licitatii SEAP",
          "Alerte personalizate pe email si SMS",
          "Generator documentatie standard",
          "Analiza competitie si istoric licitatii",
          "Dashboard cu metrici si rapoarte",
          "Integrare API cu sisteme existente",
        ]
      : [
          "Automatic SEAP tender monitoring",
          "Custom email and SMS alerts",
          "Standard documentation generator",
          "Competition analysis and tender history",
          "Dashboard with metrics and reports",
          "API integration with existing systems",
        ];

  const productName =
    lang === "ro" ? "SEAP Monitor Pro" : "SEAP Monitor Pro";
  const productTagline =
    lang === "ro"
      ? "Platforma inteligenta de monitorizare si analiza a licitatiilor publice."
      : "Intelligent platform for public tender monitoring and analysis.";
  const productDescription =
    lang === "ro"
      ? "SEAP Monitor Pro automatizeaza procesul de identificare si urmarire a licitatiilor din SEAP, economisind timp si crescand sansele de castig."
      : "SEAP Monitor Pro automates the process of identifying and tracking SEAP tenders, saving time and increasing winning chances.";

  return (
    <>
      {/* Hero */}
      <section className="py-16 px-6 bg-gradient-to-b from-accent to-background">
        <div className="container mx-auto max-w-4xl">
          <Breadcrumbs
            lang={lang}
            items={[
              { label: dict.common.home, href: "" },
              { label: dict.navigation.products },
            ]}
          />
          <h1 className="text-3xl md:text-5xl font-bold mt-6 mb-4">
            {products.hero.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {products.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              {products.comingSoon}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              {productName}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {productTagline}
            </p>
          </div>

          {/* Screenshot placeholder */}
          <div className="aspect-video rounded-xl bg-muted border border-border flex items-center justify-center mb-12">
            <span className="text-muted-foreground">
              {productName} Screenshot
            </span>
          </div>

          <p className="text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto mb-12">
            {productDescription}
          </p>

          {/* Features Grid */}
          <h3 className="text-xl font-bold text-center mb-8">
            {products.features}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {productFeatures.map((feature, idx) => {
              const Icon = featureIcons[idx] || BarChart3;
              return (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card"
                >
                  <Icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            {products.howItWorks.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {products.howItWorks.steps.map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold mb-4">
                  {stepNumbers[idx]}
                </div>
                <h3 className="font-semibold mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaBanner
        title={products.ctaBanner.title}
        subtitle={products.ctaBanner.subtitle}
        ctaText={products.ctaBanner.cta}
        ctaHref={`/${lang}/contact?serviciu=produs`}
        variant="dark"
      />

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: productName,
            description: productTagline,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            author: {
              "@type": "Organization",
              name: "Rammer Tech",
            },
          }),
        }}
      />
    </>
  );
}
