"use client";

import { motion } from "framer-motion";
import { Users, Cpu, TrendingUp } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  users: Users,
  cpu: Cpu,
  "trending-up": TrendingUp,
};

interface ValueItem {
  title: string;
  description: string;
  icon: string;
}

interface ValuePropositionProps {
  title: string;
  items: ValueItem[];
}

export function ValueProposition({ title, items }: ValuePropositionProps) {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          {title}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, idx) => {
            const Icon = iconMap[item.icon] || Users;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.15 }}
                className="text-center"
              >
                <div className="mx-auto h-14 w-14 rounded-full bg-accent flex items-center justify-center mb-4">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
