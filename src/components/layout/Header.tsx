"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import type { BrandConfig, CTA, NavItem } from "@/types/content";

interface HeaderProps {
  brand: BrandConfig;
  navItems: NavItem[];
  headerCta: CTA;
}

export default function Header({ brand, navItems, headerCta }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-surface-border/40"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-accent to-accent-violet transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass py-3" : "bg-transparent py-5"
        }`}
      >
        <nav className="container-custom flex items-center justify-between" aria-label="Main navigation">
          <a
            href="#"
            className="relative z-10 flex items-center gap-2 group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-violet flex items-center justify-center">
              <span className="text-white font-bold text-sm font-[var(--font-outfit)]">
                {brand.letter}
              </span>
            </div>
            <span className="text-lg font-semibold font-[var(--font-outfit)] text-foreground group-hover:text-accent-light transition-colors">
              {brand.name}
              <span className="text-accent">{brand.suffix}</span>
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="px-4 py-2 text-sm text-foreground-muted hover:text-foreground transition-colors rounded-lg hover:bg-surface-light/50 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent rounded-full transition-all duration-300 group-hover:w-6" />
                </a>
              </li>
            ))}
          </ul>

          <a
            href={headerCta.href}
            onClick={(e) => handleNavClick(e, headerCta.href)}
            className="hidden lg:inline-flex px-5 py-2.5 text-sm font-medium text-white rounded-full bg-gradient-to-r from-accent to-accent-violet hover:shadow-lg hover:shadow-accent/25 transition-all duration-300 hover:scale-105"
          >
            {headerCta.label}
          </a>

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden relative z-10 p-2 text-foreground hover:text-accent transition-colors"
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="relative flex flex-col items-center justify-center h-full gap-6"
            >
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                  className="text-2xl font-semibold font-[var(--font-outfit)] text-foreground hover:text-accent transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href={headerCta.href}
                onClick={(e) => handleNavClick(e, headerCta.href)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4 px-8 py-3 text-lg font-medium text-white rounded-full bg-gradient-to-r from-accent to-accent-violet"
              >
                {headerCta.label}
              </motion.a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
