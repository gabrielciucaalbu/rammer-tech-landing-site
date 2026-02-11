"use client";

import { useEffect, useRef, useState } from "react";
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

function useCountUp(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start]);

  return count;
}

function StatItemCard({ item, inView, variant }: { item: StatItem; inView: boolean; variant: string }) {
  const count = useCountUp(item.value, 2000, inView);

  return (
    <div className="text-center">
      <p
        className={cn(
          "text-4xl md:text-5xl font-bold tabular-nums",
          variant === "dark" ? "text-white" : "text-primary"
        )}
      >
        {count}
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
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "py-16 px-6",
        variant === "dark" ? "bg-brand-950" : "bg-muted"
      )}
    >
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {items.map((item, idx) => (
          <StatItemCard key={idx} item={item} inView={inView} variant={variant} />
        ))}
      </div>
    </div>
  );
}
