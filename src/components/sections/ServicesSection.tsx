"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Zap, Lightbulb, Shield, Users, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Zap,
  Lightbulb,
  Shield,
  Users,
};

interface ServiceProps {
  id: string;
  icon: string;
  title: string;
  description: string;
  problem: string;
  deliverables: string[];
}

interface ServicesSectionProps {
  sectionLabel: string;
  headline: string;
  subtitle: string;
  services: ServiceProps[];
  challengeLabel: string;
  deliverablesLabel: string;
}

export default function ServicesSection({
  sectionLabel,
  headline,
  subtitle,
  services,
  challengeLabel,
  deliverablesLabel,
}: ServicesSectionProps) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative section-padding border-t border-surface-border/30 bg-surface/20"
      aria-label="Services we offer"
    >
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
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

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => {
            const IconComp = iconMap[service.icon] || Zap;
            return (
              <motion.div key={service.id} variants={cardVariants} className="h-full">
                <Card
                  className={cn(
                    "group relative h-full flex flex-col overflow-hidden glass card-hover",
                    "border-surface-border/40 bg-surface/40 py-0 gap-0",
                    "hover:border-accent/30 transition-colors duration-300"
                  )}
                >
                  <CardContent className="flex flex-col flex-grow p-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/15 to-accent-cyan/15 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComp size={22} className="text-accent-light" />
                    </div>

                    <h3 className="text-xl font-bold font-[var(--font-outfit)] mb-4 text-foreground group-hover:text-accent-light transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-sm text-foreground-muted mb-6 leading-relaxed flex-grow">
                      {service.description}
                    </p>

                    <div className="mb-6 p-4 rounded-xl bg-surface-light/40 border border-surface-border/40">
                      <span className="text-[10px] font-bold tracking-wider uppercase text-accent-rose block mb-1">
                        {challengeLabel}
                      </span>
                      <p className="text-xs text-foreground-subtle italic leading-relaxed">
                        &ldquo;{service.problem}&rdquo;
                      </p>
                    </div>

                    <div>
                      <span className="text-xs font-semibold tracking-wider text-foreground-muted block mb-3">
                        {deliverablesLabel}
                      </span>
                      <ul className="space-y-2">
                        {service.deliverables.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-xs text-foreground-subtle">
                            <ArrowRight size={12} className="text-accent shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
