"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SeapHighlightProps {
  title: string;
  description: string;
  features: string[];
  cta: string;
  lang: string;
}

export function SeapHighlight({
  title,
  description,
  features,
  cta,
  lang,
}: SeapHighlightProps) {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-950 dark:to-brand-900">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {description}
            </p>
            <Button asChild size="lg" className="font-semibold">
              <Link href={`/${lang}/seap-sicap`}>
                {cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 + idx * 0.1 }}
                className="flex items-start gap-3 bg-background/60 backdrop-blur-sm rounded-lg p-4 border border-border/50"
              >
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm font-medium">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
