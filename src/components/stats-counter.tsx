import { cn } from "@/lib/utils";

interface StatItem {
  value: number;
  suffix?: string;
  label: string;
}

interface StatsCounterProps {
  items: StatItem[];
  variant?: "default" | "dark";
}

function StatItemCard({ item, variant }: { item: StatItem; variant: string }) {
  return (
    <div className="text-center">
      <p
        className={cn(
          "text-4xl md:text-5xl font-bold tabular-nums",
          variant === "dark" ? "text-white" : "text-primary"
        )}
      >
        {item.value}
        {item.suffix}
      </p>
      <p
        className={cn(
          "text-sm mt-2 font-medium",
          variant === "dark" ? "text-brand-300" : "text-muted-foreground"
        )}
      >
        {item.label}
      </p>
    </div>
  );
}

export function StatsCounter({ items, variant = "default" }: StatsCounterProps) {
  return (
    <div
      className={cn(
        "py-16 px-6",
        variant === "dark" ? "bg-brand-950" : "bg-muted"
      )}
    >
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {items.map((item, idx) => (
          <StatItemCard key={idx} item={item} variant={variant} />
        ))}
      </div>
    </div>
  );
}
