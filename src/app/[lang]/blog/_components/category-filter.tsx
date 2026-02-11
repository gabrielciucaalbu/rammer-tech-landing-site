"use client";

import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: Record<string, string>;
  active: string;
  onChange: (category: string) => void;
}

export function CategoryFilter({
  categories,
  active,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {Object.entries(categories).map(([key, label]) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-full border transition-colors",
            active === key
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-card text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
