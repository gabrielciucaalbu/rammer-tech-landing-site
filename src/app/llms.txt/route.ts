const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rammertech.ro";

export async function GET() {
  const content = `# Rammer Tech

> Rammer Tech is a software development and IT consulting company based in Bucharest, Romania, specializing in custom web and mobile applications, enterprise systems (ERP, CRM), and digital transformation consulting for SMEs.

Rammer Tech was founded in 2025. The company builds custom software solutions for small and medium businesses in Romania. The website is available in Romanian (default) and English.

## Services

- [Web & Mobile Development](${SITE_URL}/en/services): Responsive web applications, SPAs, PWAs, cross-platform mobile apps, APIs, third-party integrations, and MVPs.
- [Enterprise Solutions](${SITE_URL}/en/services): Custom ERP systems, CRM with sales pipelines, business intelligence dashboards, workflow automation, and integration with existing systems.
- [IT Consulting & Digital Strategy](${SITE_URL}/en/services): Technical audits, solution architecture, cloud migration strategy, performance optimization, and technical training.

## Company

- [About Us](${SITE_URL}/en/about): Company story, mission, vision, values, and what sets Rammer Tech apart.
- [Contact](${SITE_URL}/en/contact): Contact form, email (office@mail.rammertech.ro), phone (+40 736 459 926). Schedule: Monday–Friday, 09:00–18:00.

## Blog

- [Blog](${SITE_URL}/ro/blog): Articles and guides about software development, IT consulting, and digital transformation (content in Romanian).
- [Cum alegi o firmă de dezvoltare software în București: 7 criterii esențiale](${SITE_URL}/ro/blog/cum-alegi-firma-dezvoltare-software-bucuresti): Guide to choosing a software development firm in Bucharest — 7 essential criteria including experience, tech stack, communication, portfolio, pricing, support, and references.
- [Cât costă o aplicație web personalizată în România? Ghid complet 2026](${SITE_URL}/ro/blog/cat-costa-aplicatie-web-personalizata-romania): Custom web application costs in Romania — from 3,000 EUR for an MVP to 50,000+ EUR for enterprise systems (2026 pricing guide).
- [ERP custom vs. ERP off-the-shelf: ce alegi pentru IMM-ul tău?](${SITE_URL}/ro/blog/erp-custom-vs-off-the-shelf-imm): Comparison of custom ERP versus off-the-shelf ERP for Romanian SMEs, with costs, advantages, disadvantages, and decision criteria.
- [Transformare digitală pentru IMM-uri: de unde să începi](${SITE_URL}/ro/blog/transformare-digitala-imm-ghid): Digital transformation guide for SMEs — where to start, costs, essential technologies, and common mistakes to avoid.
- [Cât durează să construiești o aplicație web? Tot ce trebuie să știi](${SITE_URL}/ro/blog/cat-dureaza-dezvoltare-aplicatie-web): Web application development timelines — from 4 weeks to 12 months depending on complexity, with development stages and the factors that influence duration.

## Technology Stack

Rammer Tech uses a modern technology stack: React, Next.js, Node.js, TypeScript, PostgreSQL, MongoDB, and cloud platforms (AWS, Vercel). The company follows agile methodology with a 6-stage process: discovery, planning, development, testing, launch, and ongoing support.

## Optional

- [Products](${SITE_URL}/en/products): Software products developed by Rammer Tech. Available now:
  - [Mortgage refinancing calculator](https://calculatorrefinantare.ro/) (English: https://calculatorrefinantare.ro/en/): Compare your current mortgage with up to 6 refinancing offers and see the savings, costs and break-even point.
  - [Scribae](https://www.scribae.ro/): Proofreading for notarial deeds. It checks .docx documents before signing and returns the same file with proposed changes marked as native Word Track Changes, with data residency in the EU.
  - [MicroTaxe](https://microtaxe.ro/): Issue invoices, send them to e-Factura and see your company's real taxes, with the formula and the legal article for every figure.
- [Privacy Policy](${SITE_URL}/en/privacy-policy): How personal data is collected, used, and protected, in compliance with GDPR.
- [Terms & Conditions](${SITE_URL}/en/terms-and-conditions): Terms for using the website: services, intellectual property, and applicable law.
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
