"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

interface TestimonialProps {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  rating: number;
}

interface TestimonialsSectionProps {
  sectionLabel: string;
  headline: string;
  subtitle: string;
  testimonials: TestimonialProps[];
}

export default function TestimonialsSection({
  sectionLabel,
  headline,
  subtitle,
  testimonials,
}: TestimonialsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoplay, testimonials.length]);

  const handlePrev = () => {
    setIsAutoplay(false);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setIsAutoplay(false);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className="relative section-padding border-t border-surface-border/30 bg-surface/10"
      aria-label="Client testimonials"
    >
      {/* Background radial glow */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
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

        {/* Testimonials Carousel */}
        <div
          className="max-w-4xl mx-auto relative px-4 md:px-12"
          onMouseEnter={() => setIsAutoplay(false)}
          onMouseLeave={() => setIsAutoplay(true)}
          onFocus={() => setIsAutoplay(false)}
          onBlur={() => setIsAutoplay(true)}
        >
          {/* Left Navigation */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass border border-surface-border flex items-center justify-center text-foreground-muted hover:text-foreground hover:bg-surface-light transition-all duration-200 z-10 hidden md:flex"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Carousel Slide */}
          <div className="min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full p-8 md:p-12 rounded-2xl glass border border-surface-border/50 relative"
              >
                {/* Quote Icon Background decoration */}
                <Quote size={60} className="absolute right-8 top-8 text-surface-border/20 z-0 pointer-events-none" />

                {/* Rating */}
                <div className="flex gap-1 mb-6 relative z-10">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < testimonials[activeIndex].rating
                          ? "fill-accent-amber text-accent-amber"
                          : "text-foreground-subtle"
                      }
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg md:text-xl text-foreground font-medium leading-relaxed mb-8 relative z-10 italic">
                  &ldquo;{testimonials[activeIndex].quote}&rdquo;
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center gap-4 relative z-10 border-t border-surface-border/30 pt-6">
                  {/* Visual simulated Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent-violet flex items-center justify-center text-white font-bold font-[var(--font-outfit)]">
                    {testimonials[activeIndex].author.charAt(0)}
                  </div>
                  <div>
                    <cite className="not-italic font-bold font-[var(--font-outfit)] text-foreground block">
                      {testimonials[activeIndex].author}
                    </cite>
                    <span className="text-xs text-foreground-muted">
                      {testimonials[activeIndex].role} &mdash;{" "}
                      <span className="text-accent-light">
                        {testimonials[activeIndex].company}
                      </span>
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Navigation */}
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass border border-surface-border flex items-center justify-center text-foreground-muted hover:text-foreground hover:bg-surface-light transition-all duration-200 z-10 hidden md:flex"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Carousel Indicators / Mobile Pagination */}
        <div className="flex justify-center gap-2.5 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIsAutoplay(false);
                setActiveIndex(i);
              }}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === i
                  ? "w-8 bg-accent"
                  : "w-2.5 bg-surface-light border border-surface-border hover:bg-foreground-muted/30"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
