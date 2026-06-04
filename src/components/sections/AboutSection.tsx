"use client";

import dynamic from "next/dynamic";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Zap, Shield, Users, Lightbulb } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const AboutAccentScene = dynamic(
  () => import("@/components/three/AboutAccentScene"),
  {
    ssr: false,
    loading: () => (
      <div className="h-48 md:h-64 w-full rounded-2xl glass border border-surface-border/40 bg-accent/5 animate-pulse" />
    ),
  }
);

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Zap,
  Shield,
  Users,
  Lightbulb,
};

interface AboutSectionProps {
  sectionLabel: string;
  headline: string;
  description: string;
  paragraphs: string[];
  differentiators: {
    icon: string;
    title: string;
    description: string;
  }[];
}

export default function AboutSection({
  sectionLabel,
  headline,
  description,
  paragraphs,
  differentiators,
}: AboutSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="about"
      ref={ref}
      className="relative section-padding overflow-hidden"
      aria-label="About us"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full text-xs font-medium tracking-wider uppercase text-accent border border-accent/20 bg-accent/5"
            >
              {sectionLabel}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="heading-section text-[var(--text-4xl)] md:text-[var(--text-5xl)] mb-6"
            >
              {headline}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[var(--text-lg)] text-foreground-muted mb-8 leading-relaxed"
            >
              {description}
            </motion.p>

            <div className="space-y-4">
              {paragraphs.map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="text-foreground-subtle leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </div>

          <div className="space-y-6 lg:pt-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              {prefersReducedMotion ? (
                <div
                  className="h-48 md:h-64 w-full rounded-2xl glass border border-surface-border/40 bg-gradient-to-br from-accent/10 to-accent-violet/10 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <div className="w-24 h-24 border border-accent/30 rounded-2xl rotate-45 opacity-50" />
                </div>
              ) : (
                <AboutAccentScene />
              )}
            </motion.div>

            {differentiators.map((item, i) => {
              const IconComp = iconMap[item.icon] || Zap;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.35 + i * 0.15 }}
                  className="group p-6 rounded-xl glass card-hover"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-accent/20 to-accent-violet/20 flex items-center justify-center group-hover:from-accent/30 group-hover:to-accent-violet/30 transition-all duration-300">
                      <IconComp size={22} className="text-accent-light" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold font-[var(--font-outfit)] text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-foreground-muted leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
