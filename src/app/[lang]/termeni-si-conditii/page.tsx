import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries/get-dictionary";
import type { Locale } from "@/i18n-config";
import { LegalPageLayout } from "@/components/legal-page-layout";

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return {
    title: dict.legal.terms.metaTitle,
    alternates: {
      canonical: `/${lang}/termeni-si-conditii`,
      languages: {
        ro: "/ro/termeni-si-conditii",
        en: "/en/termeni-si-conditii",
      },
    },
  };
}

export default async function TermsPage({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <LegalPageLayout
      title={dict.legal.terms.title}
      lastUpdated={dict.legal.terms.lastUpdated}
      sections={dict.legal.terms.sections}
      lang={lang}
      homeLabel={dict.common.home}
    />
  );
}
