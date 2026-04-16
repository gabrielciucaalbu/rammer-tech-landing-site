const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rammertech.ro";

export async function GET() {
  const content = `# Rammer Tech

> Rammer Tech is a software development and IT consulting company based in Bucharest, Romania, specializing in custom web and mobile applications, enterprise systems (ERP, CRM), and digital transformation consulting for SMEs.

Rammer Tech was founded in 2025 by Gabriel Ciucă-Albu. The company builds custom software solutions for small and medium businesses in Romania. The website is available in Romanian (default) and English.

## Services

- [Web & Mobile Development](${SITE_URL}/en/services): Responsive web applications, SPAs, PWAs, cross-platform mobile apps, APIs, integrations, and MVPs built with React, Next.js, Node.js, and TypeScript.
- [Enterprise Solutions](${SITE_URL}/en/services): Custom ERP systems, CRM with sales pipelines, business intelligence dashboards, workflow automation, and integration with existing systems.
- [IT Consulting & Digital Strategy](${SITE_URL}/en/services): Technical audits, solution architecture, cloud migration strategy, performance optimization, and technical training.

## Company

- [About Us](${SITE_URL}/en/about): Company story, mission, vision, values, and team information.
- [Contact](${SITE_URL}/en/contact): Contact form, email (office@mail.rammertech.ro), phone (+40 736 459 926). Available Monday–Friday, 09:00–18:00 (Romania time).

## Blog

- [Blog](${SITE_URL}/ro/blog): Articles and guides about software development, IT consulting, and digital transformation (content in Romanian).
- [Cum alegi o firmă de dezvoltare software în București](${SITE_URL}/ro/blog/cum-alegi-firma-dezvoltare-software-bucuresti): Guide to choosing a software development firm in Bucharest — 7 essential criteria including experience, tech stack, communication, portfolio, pricing, support, and references.
- [Cât costă o aplicație web personalizată în România](${SITE_URL}/ro/blog/cat-costa-aplicatie-web-personalizata-romania): Custom web application costs in Romania — from 3,000 EUR for an MVP to 50,000+ EUR for enterprise systems (2026 pricing guide).
- [ERP custom vs. ERP off-the-shelf](${SITE_URL}/ro/blog/erp-custom-vs-off-the-shelf-imm): Comparison of custom ERP versus off-the-shelf ERP for Romanian SMEs, with costs, advantages, disadvantages, and decision criteria.
- [Transformare digitală pentru IMM-uri](${SITE_URL}/ro/blog/transformare-digitala-imm-ghid): Digital transformation guide for SMEs — where to start, costs, essential technologies, and common mistakes to avoid.
- [Cât durează să construiești o aplicație web](${SITE_URL}/ro/blog/cat-dureaza-dezvoltare-aplicatie-web): Web application development timelines — from 4 weeks for an MVP to 12 months for enterprise systems, with factors that influence duration.

## Technology Stack

Rammer Tech uses a modern technology stack: React, Next.js, Node.js, TypeScript, PostgreSQL, MongoDB, and cloud platforms (AWS, Vercel). The company follows agile methodology with a 6-stage process: discovery, planning, development, testing, launch, and ongoing support.

## Optional

- [Products](${SITE_URL}/en/products): Software products developed by Rammer Tech (currently in development).
- [Privacy Policy](${SITE_URL}/en/privacy-policy): Data protection and privacy information (GDPR compliant).
- [Terms & Conditions](${SITE_URL}/en/terms-and-conditions): Website and service terms.
- [RSS Feed](${SITE_URL}/feed.xml): Blog RSS feed.
- [Sitemap](${SITE_URL}/sitemap.xml): Complete site structure.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control":
        "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
