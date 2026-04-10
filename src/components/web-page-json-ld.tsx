const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rammertech.ro";

interface WebPageJsonLdProps {
  name: string;
  description: string;
  url: string;
  inLanguage: string;
  datePublished?: string;
  dateModified?: string;
}

export function WebPageJsonLd({
  name,
  description,
  url,
  inLanguage,
  datePublished,
  dateModified,
}: WebPageJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    inLanguage,
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    isPartOf: {
      "@type": "WebSite",
      url: SITE_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
