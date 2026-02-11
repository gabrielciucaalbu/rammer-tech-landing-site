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
    title: dict.legal.privacy.metaTitle,
    alternates: {
      canonical: `/${lang}/politica-confidentialitate`,
      languages: {
        ro: "/ro/politica-confidentialitate",
        en: "/en/politica-confidentialitate",
      },
    },
  };
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <LegalPageLayout
      title={dict.legal.privacy.title}
      lastUpdated={dict.legal.privacy.lastUpdated}
      sections={dict.legal.privacy.sections}
      lang={lang}
      homeLabel={dict.common.home}
    />
  );
}
