import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries/get-dictionary";
import type { Locale } from "@/i18n-config";
import { buildAlternates } from "@/lib/metadata-alternates";
import { getLocaleAlternates, getPublicPath } from "@/lib/locale-slugs";
import { WebPageJsonLd } from "@/components/web-page-json-ld";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/cta-banner";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rammertech.ro";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  const { canonical, languages } = buildAlternates("/produse", lang, getLocaleAlternates("produse"));

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
    alternates: { canonical, languages },
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

      {/* Live products */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            {products.live.title}
          </h2>
          <ul className="grid gap-6 md:grid-cols-2">
            {products.live.items.map((item) => (
              <li key={item.href}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>
                      <a
                        href={item.href}
                        rel="noopener"
                        className="hover:text-primary hover:underline"
                      >
                        {item.name}
                      </a>
                    </CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <a
                      href={item.href}
                      rel="noopener"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      {item.cta}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Coming Soon Message */}
      <section className="py-16 px-6 bg-muted/50">
        <div className="container mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-6">
            {products.comingSoon}
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {products.comingSoonTitle}
          </h2>
          <p className="text-lg text-muted-foreground">
            {products.comingSoonText}
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

      {/* WebPage JSON-LD */}
      <WebPageJsonLd
        name={products.metaTitle}
        description={products.metaDescription}
        url={`${SITE_URL}/${lang}${getPublicPath("produse", lang)}`}
        inLanguage={lang}
      />
    </>
  );
}
