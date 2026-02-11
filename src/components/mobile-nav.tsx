"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { Dictionary } from "@/dictionaries/get-dictionary";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  lang: string;
  dict: Dictionary;
  navLinks: readonly { key: string; href: string }[];
  isActive: (href: string) => boolean;
}

export function MobileNav({
  open,
  onClose,
  lang,
  dict,
  navLinks,
  isActive,
}: MobileNavProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-80 p-0">
        <SheetHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-bold text-lg">Rammer Tech</SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </SheetHeader>
        <nav className="flex flex-col gap-1 p-6 pt-4">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={`/${lang}${link.href}`}
              onClick={onClose}
              className={cn(
                "px-4 py-3 text-base font-medium rounded-lg transition-colors",
                isActive(link.href)
                  ? "text-primary bg-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
            >
              {dict.navigation[link.key as keyof typeof dict.navigation]}
            </Link>
          ))}
          <div className="mt-4 pt-4 border-t border-border">
            <Button asChild className="w-full" size="lg">
              <Link href={`/${lang}/contact`} onClick={onClose}>
                {dict.navigation.contact}
              </Link>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
