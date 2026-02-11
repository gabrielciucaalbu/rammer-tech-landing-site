import { Breadcrumbs } from "@/components/breadcrumbs";

interface ContactHeroProps {
  title: string;
  subtitle: string;
  lang: string;
  homeLabel: string;
  pageLabel: string;
}

export function ContactHero({
  title,
  subtitle,
  lang,
  homeLabel,
  pageLabel,
}: ContactHeroProps) {
  return (
    <section className="py-16 px-6 bg-gradient-to-b from-accent to-background">
      <div className="container mx-auto max-w-4xl">
        <Breadcrumbs
          lang={lang}
          items={[
            { label: homeLabel, href: "" },
            { label: pageLabel },
          ]}
        />
        <h1 className="text-3xl md:text-5xl font-bold mt-6 mb-4">{title}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">{subtitle}</p>
      </div>
    </section>
  );
}
