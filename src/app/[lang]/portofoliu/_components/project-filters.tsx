"use client";

import { cn } from "@/lib/utils";

interface ProjectFiltersProps {
  filters: Record<string, string>;
  active: string;
  onChange: (filter: string) => void;
}

export function ProjectFilters({
  filters,
  active,
  onChange,
}: ProjectFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {Object.entries(filters).map(([key, label]) => (
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
