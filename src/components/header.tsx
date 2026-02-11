"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";
import { LanguageSwitcher } from "@/components/language-switcher";
import type { Dictionary } from "@/dictionaries/get-dictionary";

interface HeaderProps {
  lang: string;
  dict: Dictionary;
}

const navLinks = [
  { key: "home", href: "" },
  { key: "services", href: "/servicii" },
  { key: "about", href: "/despre-noi" },
  { key: "portfolio", href: "/portofoliu" },
  { key: "seap", href: "/seap-sicap" },
  { key: "products", href: "/produse" },
  { key: "blog", href: "/blog" },
] as const;

export function Header({ lang, dict }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    const fullPath = `/${lang}${href}`;
    if (href === "") return pathname === `/${lang}` || pathname === `/${lang}/`;
    return pathname.startsWith(fullPath);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-6 md:h-16">
        {/* Logo */}
        <Link href={`/${lang}`} className="flex items-center gap-2 shrink-0">
          <Image
            src="/Rammer Tech LOGO.png"
            alt="Rammer Tech"
            width={40}
            height={40}
            className="h-8 w-8 md:h-10 md:w-10"
            priority
          />
          <span className="font-bold text-lg tracking-tight text-foreground">
            Rammer Tech
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={`/${lang}${link.href}`}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive(link.href)
                  ? "text-primary bg-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
            >
              {dict.navigation[link.key as keyof typeof dict.navigation]}
            </Link>
          ))}
        </nav>

        {/* Desktop Right */}
        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher lang={lang} />
          <Button asChild size="sm">
            <Link href={`/${lang}/contact`}>{dict.navigation.contact}</Link>
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex lg:hidden items-center gap-2">
          <LanguageSwitcher lang={lang} />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        lang={lang}
        dict={dict}
        navLinks={navLinks}
        isActive={isActive}
      />
    </header>
  );
}
