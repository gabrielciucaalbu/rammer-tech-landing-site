import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries/get-dictionary";
import type { Locale } from "@/i18n-config";
import { buildAlternates } from "@/lib/metadata-alternates";
import { WebPageJsonLd } from "@/components/web-page-json-ld";
import { LegalPageLayout } from "@/components/legal-page-layout";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rammertech.ro";

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const { canonical, languages } = buildAlternates(
    "/politica-confidentialitate",
    lang
  );

  return {
    title: dict.legal.privacy.metaTitle,
    description: dict.legal.privacy.metaDescription,
    openGraph: {
      title: dict.legal.privacy.metaTitle,
      description: dict.legal.privacy.metaDescription,
      locale: lang === "ro" ? "ro_RO" : "en_US",
      type: "website",
      siteName: "Rammer Tech",
    },
    alternates: { canonical, languages },
  };
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <LegalPageLayout
        title={dict.legal.privacy.title}
        lastUpdated={dict.legal.privacy.lastUpdated}
        sections={dict.legal.privacy.sections}
        lang={lang}
        homeLabel={dict.common.home}
      />
      <WebPageJsonLd
        name={dict.legal.privacy.metaTitle}
        description={dict.legal.privacy.metaDescription}
        url={`${SITE_URL}/ro/politica-confidentialitate`}
      />
    </>
  );
}
