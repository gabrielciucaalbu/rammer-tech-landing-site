"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CtaBannerProps {
  title: string;
  subtitle?: string;
  ctaText: string;
  ctaHref: string;
  variant?: "primary" | "dark";
}

export function CtaBanner({
  title,
  subtitle,
  ctaText,
  ctaHref,
  variant = "primary",
}: CtaBannerProps) {
  return (
    <section
      className={cn(
        "py-16 px-6",
        variant === "primary"
          ? "bg-primary text-primary-foreground"
          : "bg-brand-950 text-white"
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="container mx-auto text-center max-w-3xl"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        {subtitle && (
          <p
            className={cn(
              "text-lg mb-8",
              variant === "primary"
                ? "text-primary-foreground/80"
                : "text-brand-300"
            )}
          >
            {subtitle}
          </p>
        )}
        <Button
          asChild
          size="lg"
          variant={variant === "primary" ? "secondary" : "default"}
          className="font-semibold"
        >
          <Link href={ctaHref}>{ctaText}</Link>
        </Button>
      </motion.div>
    </section>
  );
}
