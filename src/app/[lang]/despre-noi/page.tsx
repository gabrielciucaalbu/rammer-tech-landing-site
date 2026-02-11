import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries/get-dictionary";
import type { Locale } from "@/i18n-config";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/cta-banner";
import {
  Star,
  Eye,
  Target,
  Rocket,
  Handshake,
  CheckCircle,
} from "lucide-react";

const valueIcons: Record<string, React.ElementType> = {
  star: Star,
  eye: Eye,
  target: Target,
  rocket: Rocket,
  handshake: Handshake,
};

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return {
    title: dict.about.metaTitle,
    description: dict.about.metaDescription,
    openGraph: {
      title: dict.about.metaTitle,
      description: dict.about.metaDescription,
      locale: lang === "ro" ? "ro_RO" : "en_US",
      type: "website",
      siteName: "Rammer Tech",
    },
    alternates: {
      canonical: `/${lang}/despre-noi`,
      languages: { ro: "/ro/despre-noi", en: "/en/despre-noi" },
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const { about } = dict;

  return (
    <>
      {/* Hero */}
      <section className="py-16 px-6 bg-gradient-to-b from-accent to-background">
        <div className="container mx-auto max-w-4xl">
          <Breadcrumbs
            lang={lang}
            items={[
              { label: dict.common.home, href: "" },
              { label: dict.navigation.about },
            ]}
          />
          <h1 className="text-3xl md:text-5xl font-bold mt-6 mb-4">
            {about.hero.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {about.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            {about.story.title}
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            {about.story.content}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-6 bg-muted/50">
        <div className="container mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card rounded-xl p-8 border border-border">
            <h2 className="text-xl font-bold mb-3">{about.mission.title}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {about.mission.content}
            </p>
          </div>
          <div className="bg-card rounded-xl p-8 border border-border">
            <h2 className="text-xl font-bold mb-3">{about.vision.title}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {about.vision.content}
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            {about.values.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {about.values.items.map((value, idx) => {
              const Icon = valueIcons[value.icon] || Star;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-border bg-card p-6 text-center"
                >
                  <div className="mx-auto h-12 w-12 rounded-full bg-accent flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-16 px-6 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            {about.differentiators.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {about.differentiators.items.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaBanner
        title={about.ctaBanner.title}
        subtitle={about.ctaBanner.subtitle}
        ctaText={about.ctaBanner.cta}
        ctaHref={`/${lang}/contact`}
        variant="dark"
      />

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Rammer Tech",
            url: "https://rammer.tech",
            description: about.hero.subtitle,
          }),
        }}
      />
    </>
  );
}
