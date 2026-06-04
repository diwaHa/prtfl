"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { ArrowDown, ChevronRight } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTypewriter } from "@/hooks/useTypewriter";
import StaticHeroFallback from "@/components/three/StaticHeroFallback";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent-violet/5" />
    </div>
  ),
});

interface HeroSectionProps {
  scrollLabel: string;
  availabilityBadge: string;
  headline: string;
  highlightedText: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  trustSignals: { value: string; label: string }[];
}

export default function HeroSection({
  scrollLabel,
  availabilityBadge,
  headline,
  highlightedText,
  subtitle,
  primaryCta,
  secondaryCta,
  trustSignals,
}: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const typedSubtitle = useTypewriter(subtitle, {
    enabled: !prefersReducedMotion,
    speed: 24,
  });

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {prefersReducedMotion ? (
        <StaticHeroFallback />
      ) : (
        <HeroScene reducedQuality={isMobile} />
      )}

      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/30 via-transparent to-background pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 z-[1] bg-gradient-to-t from-background to-transparent pointer-events-none" />

      <div className="relative z-10 container-custom text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full glass text-sm text-foreground-muted"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          {availabilityBadge}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="heading-display text-[var(--text-6xl)] md:text-[var(--text-7xl)] mb-6 max-w-4xl mx-auto"
        >
          {headline}{" "}
          <span className="gradient-text-wide">{highlightedText}</span>
        </motion.h1>

        <motion.p
          key={subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-[var(--text-lg)] md:text-[var(--text-xl)] text-foreground-muted max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {typedSubtitle}
          {!prefersReducedMotion && typedSubtitle.length < subtitle.length && (
            <span className="inline-block w-0.5 h-[1em] bg-accent ml-0.5 align-middle animate-pulse" aria-hidden="true" />
          )}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href={primaryCta.href}
            onClick={(e) => handleClick(e, primaryCta.href)}
            className="group inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-full bg-gradient-to-r from-accent to-accent-violet hover:shadow-xl hover:shadow-accent/25 transition-all duration-300 hover:scale-105"
          >
            {primaryCta.label}
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href={secondaryCta.href}
            onClick={(e) => handleClick(e, secondaryCta.href)}
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-foreground rounded-full border border-surface-border hover:border-accent/50 hover:bg-surface/50 transition-all duration-300"
          >
            {secondaryCta.label}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
        >
          {trustSignals.map((signal, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-bold font-[var(--font-outfit)] gradient-text">
                {signal.value}
              </div>
              <div className="text-xs md:text-sm text-foreground-subtle mt-1">
                {signal.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-foreground-subtle tracking-widest uppercase">
          {scrollLabel}
        </span>
        <motion.div
          animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="text-foreground-subtle" />
        </motion.div>
      </motion.div>
    </section>
  );
}
