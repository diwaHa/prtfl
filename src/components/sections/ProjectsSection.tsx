"use client";

import dynamic from "next/dynamic";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { ArrowUpRight, Award, Flame, X } from "lucide-react";
import ProjectVisual from "@/components/projects/ProjectVisual";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { UiContent } from "@/types/content";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProjectsAmbientScene = dynamic(
  () => import("@/components/three/ProjectsAmbientScene"),
  { ssr: false }
);

interface ProjectProps {
  id: string;
  title: string;
  category: string;
  summary: string;
  challenge: string;
  solution: string;
  result: string;
  tools: string[];
  image: string;
  color: string;
  featured: boolean;
}

interface ProjectsSectionProps {
  sectionLabel: string;
  headline: string;
  subtitle: string;
  projects: ProjectProps[];
  labels: UiContent["projects"];
}

export default function ProjectsSection({
  sectionLabel,
  headline,
  subtitle,
  projects,
  labels,
}: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState(labels.filterAllLabel);
  const [selectedProject, setSelectedProject] = useState<ProjectProps | null>(null);
  
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  // Get unique categories
  const categories = [
    labels.filterAllLabel,
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];

  const filteredProjects =
    activeCategory === labels.filterAllLabel
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative section-padding border-t border-surface-border/30"
      aria-label="Projects showcase"
    >
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-accent-violet/5 rounded-full blur-3xl pointer-events-none" />
      {!prefersReducedMotion && <ProjectsAmbientScene />}

      <div className="container-custom relative z-[1]">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full text-xs font-medium tracking-wider uppercase text-accent border border-accent/20 bg-accent/5"
            >
              {sectionLabel}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="heading-section text-[var(--text-4xl)] md:text-[var(--text-5xl)] mb-4"
            >
              {headline}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[var(--text-base)] text-foreground-muted leading-relaxed"
            >
              {subtitle}
            </motion.p>
          </div>

          {/* Filtering Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-2 justify-start md:justify-end"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-accent text-white shadow-lg shadow-accent/25"
                    : "bg-surface-light/50 border border-surface-border/40 text-foreground-muted hover:text-foreground hover:bg-surface-light"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Project Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group relative h-[420px] rounded-2xl overflow-hidden glass cursor-pointer border border-surface-border/40 [transform-style:preserve-3d]"
                style={{ perspective: "1000px" }}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : { rotateX: -4, rotateY: 6, scale: 1.02, transition: { duration: 0.35 } }
                }
              >
                <div
                  className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 30%, ${project.color} 0%, transparent 70%)`,
                  }}
                />

                <ProjectVisual
                  title={project.title}
                  category={project.category}
                  image={project.image}
                  color={project.color}
                />

                {/* Project Info Panel */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-surface via-surface/90 to-surface/40 flex flex-col h-56 justify-between border-t border-surface-border/20">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold font-[var(--font-outfit)] text-foreground group-hover:text-accent-light transition-colors">
                        {project.title}
                      </h3>
                      {project.featured && (
                        <span className="p-1 rounded-full bg-accent-amber/10 border border-accent-amber/20 text-accent-amber" title={labels.featuredTooltip}>
                          <Flame size={12} />
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-foreground-muted line-clamp-3 leading-relaxed mb-4">
                      {project.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    {/* Tool Badges */}
                    <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                      {project.tools.slice(0, 3).map((tool) => (
                        <span key={tool} className="text-[10px] px-2 py-0.5 rounded bg-surface-light border border-surface-border text-foreground-subtle">
                          {tool}
                        </span>
                      ))}
                      {project.tools.length > 3 && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-surface-light border border-surface-border text-foreground-subtle">
                          +{project.tools.length - 3}
                        </span>
                      )}
                    </div>

                    {/* View Button */}
                    <span className="w-10 h-10 rounded-full bg-surface-light border border-surface-border/80 flex items-center justify-center text-foreground-muted group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-300">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Case Study Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4" role="dialog" aria-modal="true">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-background/80 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full max-w-3xl"
                onClick={(e) => e.stopPropagation()}
              >
              <Card className="glass max-h-[85vh] overflow-y-auto border-surface-border py-0 gap-0 shadow-2xl">
                <div className="relative h-44">
                  <ProjectVisual
                    title={selectedProject.title}
                    category={selectedProject.category}
                    image={selectedProject.image}
                    color={selectedProject.color}
                    className="h-44"
                  />
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-background/60 hover:bg-background text-foreground transition-all duration-200 border border-surface-border"
                    aria-label="Close modal"
                  >
                    <X size={18} />
                  </button>
                </div>

                <CardHeader className="px-8 pt-6 pb-0">
                  <CardTitle className="text-2xl md:text-3xl font-[var(--font-outfit)]">
                    {selectedProject.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="px-8 space-y-8">
                  {/* Summary */}
                  <div>
                    <p className="text-base text-foreground-muted leading-relaxed">
                      {selectedProject.summary}
                    </p>
                  </div>

                  {/* Challenge & Solution Grid */}
                  <div className="grid md:grid-cols-2 gap-8 border-t border-surface-border/40 pt-8">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-accent-rose mb-3 flex items-center gap-1.5">
                        <Award size={14} /> {labels.challengeLabel}
                      </h4>
                      <p className="text-sm text-foreground-subtle leading-relaxed">
                        {selectedProject.challenge}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-accent-cyan mb-3 flex items-center gap-1.5">
                        <Flame size={14} /> {labels.solutionLabel}
                      </h4>
                      <p className="text-sm text-foreground-subtle leading-relaxed">
                        {selectedProject.solution}
                      </p>
                    </div>
                  </div>

                  {/* Result & Tools */}
                  <div className="grid md:grid-cols-2 gap-8 border-t border-surface-border/40 pt-8">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-green-400 mb-3">
                        {labels.resultLabel}
                      </h4>
                      <p className="text-sm text-foreground-subtle leading-relaxed">
                        {selectedProject.result}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-accent mb-3">
                        {labels.techStackLabel}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tools.map((tool) => (
                          <span key={tool} className="text-xs px-3 py-1 rounded bg-surface-light border border-surface-border text-foreground-muted">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="px-8 py-6 bg-surface-light/20 border-t border-surface-border/40 flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedProject(null)}
                    className="rounded-full border-surface-border"
                  >
                    {labels.closeCaseStudyLabel}
                  </Button>
                </CardFooter>
              </Card>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
