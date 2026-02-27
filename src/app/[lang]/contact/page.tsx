import type { Metadata } from "next";
import { Suspense } from "react";
import { getDictionary } from "@/dictionaries/get-dictionary";
import type { Locale } from "@/i18n-config";
import { buildAlternates } from "@/lib/metadata-alternates";
import { ContactHero } from "./_components/contact-hero";
import { ContactForm } from "./_components/contact-form";
import { ContactInfo } from "./_components/contact-info";
import { FaqAccordion } from "@/components/faq-accordion";

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const { canonical, languages } = buildAlternates("/contact", lang);

  return {
    title: dict.contact.metaTitle,
    description: dict.contact.metaDescription,
    openGraph: {
      title: dict.contact.metaTitle,
      description: dict.contact.metaDescription,
      locale: lang === "ro" ? "ro_RO" : "en_US",
      type: "website",
      siteName: "Rammer Tech",
    },
    alternates: { canonical, languages },
  };
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <ContactHero
        title={dict.contact.hero.title}
        subtitle={dict.contact.hero.subtitle}
        lang={lang}
        homeLabel={dict.common.home}
        pageLabel={dict.navigation.contact}
      />

      <section className="py-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
            <Suspense>
              <ContactForm dict={dict} lang={lang} />
            </Suspense>
            <aside>
              <ContactInfo dict={dict} />
            </aside>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 bg-muted/50">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold mb-8 text-center">
            {dict.contact.faq.title}
          </h2>
          <FaqAccordion items={dict.contact.faq.items} />
        </div>
      </section>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            mainEntity: {
              "@type": "LocalBusiness",
              name: "Rammer Tech",
              email: dict.contact.info.email,
              telephone: dict.contact.info.phone,
              address: {
                "@type": "PostalAddress",
                addressCountry: "RO",
              },
            },
          }),
        }}
      />
    </>
  );
}
