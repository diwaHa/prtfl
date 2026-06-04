"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface ClientProps {
  name: string;
  industry: string;
}

interface ClientsSectionProps {
  sectionLabel: string;
  headline: string;
  subtitle: string;
  clients: ClientProps[];
}

export default function ClientsSection({
  sectionLabel,
  headline,
  subtitle,
  clients,
}: ClientsSectionProps) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Double the clients list for seamless infinite marquee effect
  const marqueeClients = [...clients, ...clients];

  return (
    <section
      id="clients"
      ref={containerRef}
      className="relative py-16 md:py-24 border-t border-surface-border/30 bg-surface/10 overflow-hidden"
      aria-label="Client partners"
    >
      <div className="container-custom relative mb-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
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
            className="heading-section text-[var(--text-3xl)] md:text-[var(--text-4xl)] mb-4"
          >
            {headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm text-foreground-muted leading-relaxed"
          >
            {subtitle}
          </motion.p>
        </div>
      </div>

      {/* Infinite Marquee Container */}
      <div className="relative w-full flex overflow-x-hidden pointer-events-none select-none">
        {/* Shadow overlays for smooth edge fading */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex gap-8 py-4 animate-[marquee_40s_linear_infinite] whitespace-nowrap min-w-full hover:[animation-play-state:paused] pointer-events-auto">
          {marqueeClients.map((client, i) => (
            <div
              key={i}
              className="inline-flex flex-col items-center justify-center min-w-[200px] px-8 py-6 rounded-xl glass hover:bg-surface-light border-surface-border/40 transition-all duration-300 group cursor-default"
            >
              <span className="text-lg font-extrabold font-[var(--font-outfit)] text-foreground-subtle group-hover:text-accent-light group-hover:scale-105 transition-all duration-300">
                {client.name}
              </span>
              <span className="text-[10px] tracking-wider text-foreground-subtle uppercase mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {client.industry}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
