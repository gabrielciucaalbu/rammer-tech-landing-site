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

  // Placeholder - products will be added later
  const productFeatures: string[] = [];
  const productName = "";
  const productTagline = "";
  const productDescription = "";

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

      {/* Coming Soon Message */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-6">
            {products.comingSoon}
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {lang === "ro"
              ? "Produsele noastre sunt in dezvoltare"
              : "Our products are in development"}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {lang === "ro"
              ? "Lucram la solutii software inovatoare care vor fi lansate curand. Contacteaza-ne pentru a afla mai multe."
              : "We're working on innovative software solutions that will be launched soon. Contact us to learn more."}
          </p>
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

    </>
  );
}
