"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ProjectFilters } from "./project-filters";
import type { Project } from "@/data/projects";

interface ProjectGridProps {
  projects: Project[];
  filters: Record<string, string>;
  viewDetails: string;
  lang: string;
}

export function ProjectGrid({
  projects,
  filters,
  viewDetails,
  lang,
}: ProjectGridProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const locale = lang as "ro" | "en";

  return (
    <div className="space-y-10">
      <ProjectFilters
        filters={filters}
        active={activeFilter}
        onChange={setActiveFilter}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl border border-border bg-card overflow-hidden group hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video bg-muted relative overflow-hidden">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title[locale]}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">
                      {project.title[locale]}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {filters[project.category] || project.category}
                  </Badge>
                </div>
                <h3 className="font-semibold text-lg mb-1">
                  {project.title[locale]}
                </h3>
                <p className="text-sm text-muted-foreground mb-1">
                  {project.client[locale]}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {project.description[locale]}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="text-[10px]"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
