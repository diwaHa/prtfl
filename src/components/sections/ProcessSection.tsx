"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Search, Calendar, Palette, Code, CheckSquare, Rocket, LifeBuoy } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Search,
  Calendar,
  Palette,
  Code,
  CheckSquare,
  Rocket,
  LifeBuoy,
};

interface ProcessStepProps {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: string;
}

interface ProcessSectionProps {
  sectionLabel: string;
  headline: string;
  subtitle: string;
  steps: ProcessStepProps[];
}

export default function ProcessSection({
  sectionLabel,
  headline,
  subtitle,
  steps,
}: ProcessSectionProps) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative section-padding border-t border-surface-border/30 bg-surface/5"
      aria-label="Our workflow process"
    >
      {/* Background glow overlay */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-accent/3 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
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
            className="heading-section text-[var(--text-4xl)] md:text-[var(--text-5xl)] mb-6"
          >
            {headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[var(--text-lg)] text-foreground-muted leading-relaxed"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Timeline Stepper Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative max-w-5xl mx-auto space-y-12 md:space-y-0 md:grid md:grid-cols-7 md:gap-4"
        >
          {/* Animated Connecting Line (Desktop) */}
          <div className="absolute top-1/2 left-[5%] right-[5%] h-0.5 bg-gradient-to-r from-accent via-accent-violet to-accent-cyan opacity-25 z-0 hidden md:block" />

          {steps.map((step) => {
            const IconComp = iconMap[step.icon] || Code;
            return (
              <motion.div
                key={step.id}
                variants={stepVariants}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                {/* Step Circle Bubble */}
                <div className="w-16 h-16 rounded-full bg-surface border border-surface-border flex items-center justify-center mb-6 group-hover:border-accent group-hover:scale-110 transition-all duration-300 relative glow-accent-sm shadow-xl">
                  {/* Step number badge */}
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-accent text-[10px] font-extrabold flex items-center justify-center text-white">
                    0{step.number}
                  </span>
                  <IconComp size={20} className="text-foreground group-hover:text-accent-light transition-colors" />
                </div>

                {/* Title */}
                <h3 className="text-base font-bold font-[var(--font-outfit)] text-foreground mb-3 group-hover:text-accent-light transition-colors">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-foreground-muted leading-relaxed max-w-[200px] md:max-w-none px-2">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
