"use client";

import { ArrowUp, Twitter, Linkedin, Github, Compass } from "lucide-react";
import type { BrandConfig, NavItem, SocialLink, UiContent } from "@/types/content";

const socialIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Twitter,
  LinkedIn: Linkedin,
  GitHub: Github,
  Dribbble: Compass,
};

interface FooterProps {
  brand: BrandConfig;
  tagline: string;
  copyright: string;
  navigation: NavItem[];
  serviceLinks: NavItem[];
  closingLine: string;
  socialLinks: SocialLink[];
  labels: UiContent["footer"];
}

export default function Footer({
  brand,
  tagline,
  copyright,
  navigation,
  serviceLinks,
  closingLine,
  socialLinks,
  labels,
}: FooterProps) {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const formattedCopyright = copyright.replace(
    "{year}",
    new Date().getFullYear().toString()
  );

  return (
    <footer
      className="relative bg-surface/40 border-t border-surface-border/30 pt-16 pb-8"
      role="contentinfo"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4 space-y-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTop();
              }}
              className="flex items-center gap-2 group w-fit"
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
            <p className="text-sm text-foreground-muted max-w-sm leading-relaxed">
              {tagline}
            </p>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              {labels.navigationLabel}
            </h4>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-sm text-foreground-subtle hover:text-accent transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              {labels.servicesLabel}
            </h4>
            <ul className="space-y-2">
              {serviceLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-sm text-foreground-subtle hover:text-accent transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              {labels.followLabel}
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((link) => {
                const IconComp = socialIcons[link.platform] || Compass;
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-surface border border-surface-border flex items-center justify-center text-foreground-muted hover:text-accent hover:border-accent/40 hover:scale-105 transition-all duration-300"
                    aria-label={link.label}
                  >
                    <IconComp size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="section-divider opacity-50 mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-foreground-subtle">{formattedCopyright}</div>

          <div className="text-[10px] text-foreground-subtle/80 italic">
            {closingLine}
          </div>

          <button
            onClick={handleScrollTop}
            className="group w-10 h-10 rounded-xl bg-surface border border-surface-border flex items-center justify-center text-foreground-muted hover:text-accent hover:border-accent/40 hover:scale-105 transition-all duration-300"
            aria-label={labels.backToTopLabel}
          >
            <ArrowUp
              size={18}
              className="group-hover:-translate-y-0.5 transition-transform"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
