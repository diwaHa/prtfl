export interface BrandConfig {
  letter: string;
  name: string;
  suffix: string;
}

// Site-wide metadata
export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  ogImage: string;
  twitterHandle: string;
  email: string;
  phone: string;
  timezone: string;
  location: string;
  brand: BrandConfig;
  headerCta: CTA;
  socialLinks: SocialLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

// Hero
export interface HeroContent {
  availabilityBadge: string;
  headline: string;
  highlightedText: string;
  subtitle: string;
  primaryCta: CTA;
  secondaryCta: CTA;
  trustSignals: TrustSignal[];
}

export interface CTA {
  label: string;
  href: string;
}

export interface TrustSignal {
  value: string;
  label: string;
}

// About
export interface AboutContent {
  sectionLabel: string;
  headline: string;
  description: string;
  paragraphs: string[];
  differentiators: Differentiator[];
}

export interface Differentiator {
  icon: string;
  title: string;
  description: string;
}

// Services
export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  problem: string;
  deliverables: string[];
}

export interface ServicesContent {
  sectionLabel: string;
  headline: string;
  subtitle: string;
  services: Service[];
}

// Projects
export interface Project {
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

export interface ProjectsContent {
  sectionLabel: string;
  headline: string;
  subtitle: string;
  projects: Project[];
}

// Clients
export interface Client {
  name: string;
  industry: string;
  logo?: string;
}

export interface ClientsContent {
  sectionLabel: string;
  headline: string;
  subtitle: string;
  clients: Client[];
}

// Testimonials
export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  rating: number;
}

export interface TestimonialsContent {
  sectionLabel: string;
  headline: string;
  subtitle: string;
  testimonials: Testimonial[];
}

// Process
export interface ProcessStep {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: string;
}

export interface ProcessContent {
  sectionLabel: string;
  headline: string;
  subtitle: string;
  steps: ProcessStep[];
}

// Contact
export interface ContactContent {
  sectionLabel: string;
  headline: string;
  subtitle: string;
  email: string;
  phone: string;
  location: string;
  timezone: string;
  bookCallCta: CTA;
  socialLinks: SocialLink[];
  formFields: FormField[];
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'textarea' | 'select';
  placeholder: string;
  required: boolean;
  options?: string[];
}

// Navigation
export interface NavItem {
  label: string;
  href: string;
}

// Footer
export interface FooterContent {
  tagline: string;
  copyright: string;
  navigation: NavItem[];
  closingLine: string;
  serviceLinks: NavItem[];
}

export interface UiContent {
  accessibility: { skipToContent: string };
  hero: { scrollLabel: string };
  contact: {
    formTitle: string;
    formDescription: string;
    connectLabel: string;
    emailLabel: string;
    phoneLabel: string;
    locationLabel: string;
    timezoneLabel: string;
    sendMessageLabel: string;
    sendingLabel: string;
    toasts: {
      validationError: string;
      success: string;
      error: string;
      networkError: string;
    };
  };
  services: { challengeLabel: string; deliverablesLabel: string };
  projects: {
    featuredTooltip: string;
    challengeLabel: string;
    solutionLabel: string;
    resultLabel: string;
    techStackLabel: string;
    closeCaseStudyLabel: string;
    filterAllLabel: string;
  };
  footer: {
    navigationLabel: string;
    servicesLabel: string;
    followLabel: string;
    backToTopLabel: string;
  };
}
