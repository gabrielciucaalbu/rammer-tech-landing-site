import Link from "next/link";
import {
  Code,
  Building2,
  Lightbulb,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, React.ElementType> = {
  code: Code,
  building: Building2,
  lightbulb: Lightbulb,
  shield: ShieldCheck,
};

interface ServiceDetailCardProps {
  title: string;
  description: string;
  icon: string;
  features: string[];
  cta: string;
  ctaParam: string;
  lang: string;
  index: number;
}

export function ServiceDetailCard({
  title,
  description,
  icon,
  features,
  cta,
  ctaParam,
  lang,
  index,
}: ServiceDetailCardProps) {
  const Icon = iconMap[icon] || Code;
  const isEven = index % 2 === 0;

  return (
    <section
      className={`py-16 px-6 ${isEven ? "" : "bg-muted/50"}`}
      id={`service-${ctaParam}`}
    >
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-start gap-4 mb-6">
          <div className="h-12 w-12 rounded-lg bg-accent flex items-center justify-center shrink-0">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
          {description}
        </p>

        <ul className="space-y-3 mb-8 max-w-3xl">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <Button asChild>
          <Link href={`/${lang}/contact?serviciu=${ctaParam}`}>
            {cta}
          </Link>
        </Button>
      </div>
    </section>
  );
}
