"use client";

import { motion } from "framer-motion";

interface WorkflowStep {
  title: string;
  description: string;
}

interface WorkflowTimelineProps {
  title: string;
  steps: WorkflowStep[];
}

const stepIcons = ["1", "2", "3", "4", "5", "6"];

export function WorkflowTimeline({ title, steps }: WorkflowTimelineProps) {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          {title}
        </motion.h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />

          <div className="space-y-8">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`relative flex items-start gap-4 md:gap-8 ${
                  idx % 2 === 0
                    ? "md:flex-row"
                    : "md:flex-row-reverse md:text-right"
                }`}
              >
                {/* Content */}
                <div className="flex-1 md:w-1/2 pl-16 md:pl-0">
                  <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Circle */}
                <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold z-10 -translate-x-1/2">
                  {stepIcons[idx]}
                </div>

                {/* Spacer for alternate side */}
                <div className="hidden md:block flex-1 md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
