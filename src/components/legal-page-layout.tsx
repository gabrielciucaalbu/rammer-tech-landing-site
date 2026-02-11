import { Breadcrumbs } from "@/components/breadcrumbs";

interface LegalSection {
  title: string;
  content: string;
}

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
  lang: string;
  homeLabel: string;
}

export function LegalPageLayout({
  title,
  lastUpdated,
  sections,
  lang,
  homeLabel,
}: LegalPageLayoutProps) {
  return (
    <div className="container mx-auto px-6 py-12">
      <Breadcrumbs
        lang={lang}
        items={[
          { label: homeLabel, href: "" },
          { label: title },
        ]}
      />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-12">
        {/* Table of Contents - Desktop sidebar */}
        <aside className="hidden lg:block">
          <nav className="sticky top-24 space-y-1">
            <p className="text-sm font-semibold text-foreground mb-3">
              {title}
            </p>
            {sections.map((section, idx) => (
              <a
                key={idx}
                href={`#section-${idx}`}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <article className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
          <p className="text-sm text-muted-foreground mb-10">{lastUpdated}</p>

          <div className="space-y-10">
            {sections.map((section, idx) => (
              <section key={idx} id={`section-${idx}`}>
                <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
              </section>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
