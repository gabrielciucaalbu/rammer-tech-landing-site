"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/dictionaries/get-dictionary";

interface CookieBannerProps {
  lang: string;
  dict: Dictionary;
}

export function CookieBanner({ lang, dict }: CookieBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay so it doesn't flash on load
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = (choice: "all" | "necessary") => {
    localStorage.setItem("cookie-consent", choice);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card shadow-lg"
        >
          <div className="container mx-auto px-6 py-4 flex flex-col sm:flex-row items-center gap-4">
            <p className="text-sm text-muted-foreground flex-1">
              {dict.cookieBanner.message}{" "}
              <Link
                href={`/${lang}/politica-confidentialitate`}
                className="underline hover:text-foreground transition-colors"
              >
                {dict.cookieBanner.learnMore}
              </Link>
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAccept("necessary")}
              >
                {dict.cookieBanner.necessaryOnly}
              </Button>
              <Button size="sm" onClick={() => handleAccept("all")}>
                {dict.cookieBanner.acceptAll}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
