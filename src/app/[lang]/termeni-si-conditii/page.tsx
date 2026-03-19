import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries/get-dictionary";
import type { Locale } from "@/i18n-config";
import { buildAlternates } from "@/lib/metadata-alternates";
import { getLocaleAlternates, getPublicPath } from "@/lib/locale-slugs";
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
    "/termeni-si-conditii",
    lang,
    getLocaleAlternates("termeni-si-conditii")
  );

  return {
    title: dict.legal.terms.metaTitle,
    description: dict.legal.terms.metaDescription,
    openGraph: {
      title: dict.legal.terms.metaTitle,
      description: dict.legal.terms.metaDescription,
      locale: lang === "ro" ? "ro_RO" : "en_US",
      type: "website",
      siteName: "Rammer Tech",
    },
    alternates: { canonical, languages },
  };
}

export default async function TermsPage({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <LegalPageLayout
        title={dict.legal.terms.title}
        lastUpdated={dict.legal.terms.lastUpdated}
        sections={dict.legal.terms.sections}
        lang={lang}
        homeLabel={dict.common.home}
      />
      <WebPageJsonLd
        name={dict.legal.terms.metaTitle}
        description={dict.legal.terms.metaDescription}
        url={`${SITE_URL}/${lang}${getPublicPath("termeni-si-conditii", lang)}`}
      />
    </>
  );
}
