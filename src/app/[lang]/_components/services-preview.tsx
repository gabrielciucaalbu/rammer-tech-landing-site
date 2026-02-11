"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Code,
  Building2,
  Lightbulb,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, React.ElementType> = {
  code: Code,
  building: Building2,
  lightbulb: Lightbulb,
  shield: ShieldCheck,
};

interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

interface ServicesPreviewProps {
  title: string;
  viewAll: string;
  learnMore: string;
  items: ServiceItem[];
  lang: string;
}

export function ServicesPreview({
  title,
  viewAll,
  learnMore,
  items,
  lang,
}: ServicesPreviewProps) {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          {title}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {items.map((item, idx) => {
            const Icon = iconMap[item.icon] || Code;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group rounded-xl border border-border bg-card p-6 hover:shadow-lg hover:border-primary/20 transition-all"
              >
                <div className="h-12 w-12 rounded-lg bg-accent flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
                <Link
                  href={`/${lang}/servicii`}
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  {learnMore}
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <Button asChild variant="outline" size="lg">
            <Link href={`/${lang}/servicii`}>
              {viewAll}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
