import { z } from 'zod';

// Reusable Schemas
export const CTASchema = z.object({
  label: z.string(),
  href: z.string(),
});

export const SocialLinkSchema = z.object({
  platform: z.string(),
  url: z.string(),
  label: z.string(),
});

export const TrustSignalSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export const DifferentiatorSchema = z.object({
  icon: z.string(),
  title: z.string(),
  description: z.string(),
});

export const ServiceSchema = z.object({
  id: z.string(),
  icon: z.string(),
  title: z.string(),
  description: z.string(),
  problem: z.string(),
  deliverables: z.array(z.string()),
});

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  summary: z.string(),
  challenge: z.string(),
  solution: z.string(),
  result: z.string(),
  tools: z.array(z.string()),
  image: z.string(),
  color: z.string(),
  featured: z.boolean(),
});

export const ClientSchema = z.object({
  name: z.string(),
  industry: z.string(),
  logo: z.string().optional(),
});

export const TestimonialSchema = z.object({
  id: z.string(),
  quote: z.string(),
  author: z.string(),
  role: z.string(),
  company: z.string(),
  avatar: z.string().optional(),
  rating: z.number().min(1).max(5),
});

export const ProcessStepSchema = z.object({
  id: z.string(),
  number: z.number(),
  title: z.string(),
  description: z.string(),
  icon: z.string(),
});

export const FormFieldSchema = z.object({
  name: z.string(),
  label: z.string(),
  type: z.enum(['text', 'email', 'textarea', 'select']),
  placeholder: z.string(),
  required: z.boolean(),
  options: z.array(z.string()).optional(),
});

export const NavItemSchema = z.object({
  label: z.string(),
  href: z.string(),
});

// Top-level Schemas
export const BrandConfigSchema = z.object({
  letter: z.string(),
  name: z.string(),
  suffix: z.string(),
});

export const SiteConfigSchema = z.object({
  name: z.string(),
  title: z.string(),
  description: z.string(),
  url: z.string(),
  ogImage: z.string(),
  twitterHandle: z.string(),
  email: z.string(),
  phone: z.string(),
  timezone: z.string(),
  location: z.string(),
  brand: BrandConfigSchema,
  headerCta: CTASchema,
  socialLinks: z.array(SocialLinkSchema),
});

export const HeroContentSchema = z.object({
  availabilityBadge: z.string(),
  headline: z.string(),
  highlightedText: z.string(),
  subtitle: z.string(),
  primaryCta: CTASchema,
  secondaryCta: CTASchema,
  trustSignals: z.array(TrustSignalSchema),
});

export const AboutContentSchema = z.object({
  sectionLabel: z.string(),
  headline: z.string(),
  description: z.string(),
  paragraphs: z.array(z.string()),
  differentiators: z.array(DifferentiatorSchema),
});

export const ServicesContentSchema = z.object({
  sectionLabel: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  services: z.array(ServiceSchema),
});

export const ProjectsContentSchema = z.object({
  sectionLabel: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  projects: z.array(ProjectSchema),
});

export const ClientsContentSchema = z.object({
  sectionLabel: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  clients: z.array(ClientSchema),
});

export const TestimonialsContentSchema = z.object({
  sectionLabel: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  testimonials: z.array(TestimonialSchema),
});

export const ProcessContentSchema = z.object({
  sectionLabel: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  steps: z.array(ProcessStepSchema),
});

export const ContactContentSchema = z.object({
  sectionLabel: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  email: z.string(),
  phone: z.string(),
  location: z.string(),
  timezone: z.string(),
  bookCallCta: CTASchema,
  socialLinks: z.array(SocialLinkSchema),
  formFields: z.array(FormFieldSchema),
});

export const FooterContentSchema = z.object({
  tagline: z.string(),
  copyright: z.string(),
  navigation: z.array(NavItemSchema),
  closingLine: z.string(),
  serviceLinks: z.array(NavItemSchema),
});

export const UiContentSchema = z.object({
  accessibility: z.object({ skipToContent: z.string() }),
  hero: z.object({ scrollLabel: z.string() }),
  contact: z.object({
    formTitle: z.string(),
    formDescription: z.string(),
    connectLabel: z.string(),
    emailLabel: z.string(),
    phoneLabel: z.string(),
    locationLabel: z.string(),
    timezoneLabel: z.string(),
    sendMessageLabel: z.string(),
    sendingLabel: z.string(),
    toasts: z.object({
      validationError: z.string(),
      success: z.string(),
      error: z.string(),
      networkError: z.string(),
    }),
  }),
  services: z.object({
    challengeLabel: z.string(),
    deliverablesLabel: z.string(),
  }),
  projects: z.object({
    featuredTooltip: z.string(),
    challengeLabel: z.string(),
    solutionLabel: z.string(),
    resultLabel: z.string(),
    techStackLabel: z.string(),
    closeCaseStudyLabel: z.string(),
    filterAllLabel: z.string(),
  }),
  footer: z.object({
    navigationLabel: z.string(),
    servicesLabel: z.string(),
    followLabel: z.string(),
    backToTopLabel: z.string(),
  }),
});
