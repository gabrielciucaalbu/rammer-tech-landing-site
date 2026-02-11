"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  lang: string;
}

export function LanguageSwitcher({ lang }: LanguageSwitcherProps) {
  const pathname = usePathname();

  const switchLocale = (newLang: string) => {
    // Replace the current lang segment in pathname
    const segments = pathname.split("/");
    segments[1] = newLang;
    return segments.join("/");
  };

  return (
    <div className="flex items-center gap-0.5 rounded-lg border border-border bg-muted/50 p-0.5">
      <Link
        href={switchLocale("ro")}
        className={cn(
          "px-2.5 py-1 text-xs font-semibold rounded-md transition-colors",
          lang === "ro"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        RO
      </Link>
      <Link
        href={switchLocale("en")}
        className={cn(
          "px-2.5 py-1 text-xs font-semibold rounded-md transition-colors",
          lang === "en"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        EN
      </Link>
    </div>
  );
}
