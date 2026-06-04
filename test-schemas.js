const { z } = require('zod');

// We will replicate the Zod schemas and check if they parse the JSONs.
const CTASchema = z.object({
  label: z.string(),
  href: z.string(),
});

const SocialLinkSchema = z.object({
  platform: z.string(),
  url: z.string(),
  label: z.string(),
});

const TrustSignalSchema = z.object({
  value: z.string(),
  label: z.string(),
});

const DifferentiatorSchema = z.object({
  icon: z.string(),
  title: z.string(),
  description: z.string(),
});

const ServiceSchema = z.object({
  id: z.string(),
  icon: z.string(),
  title: z.string(),
  description: z.string(),
  problem: z.string(),
  deliverables: z.array(z.string()),
});

const ProjectSchema = z.object({
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

const ClientSchema = z.object({
  name: z.string(),
  industry: z.string(),
  logo: z.string().optional(),
});

const TestimonialSchema = z.object({
  id: z.string(),
  quote: z.string(),
  author: z.string(),
  role: z.string(),
  company: z.string(),
  avatar: z.string().optional(),
  rating: z.number().min(1).max(5),
});

const ProcessStepSchema = z.object({
  id: z.string(),
  number: z.number(),
  title: z.string(),
  description: z.string(),
  icon: z.string(),
});

const FormFieldSchema = z.object({
  name: z.string(),
  label: z.string(),
  type: z.enum(['text', 'email', 'textarea', 'select']),
  placeholder: z.string(),
  required: z.boolean(),
  options: z.array(z.string()).optional(),
});

const NavItemSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const BrandConfigSchema = z.object({
  letter: z.string(),
  name: z.string(),
  suffix: z.string(),
});

const SiteConfigSchema = z.object({
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

const HeroContentSchema = z.object({
  availabilityBadge: z.string(),
  headline: z.string(),
  highlightedText: z.string(),
  subtitle: z.string(),
  primaryCta: CTASchema,
  secondaryCta: CTASchema,
  trustSignals: z.array(TrustSignalSchema),
});

const AboutContentSchema = z.object({
  sectionLabel: z.string(),
  headline: z.string(),
  description: z.string(),
  paragraphs: z.array(z.string()),
  differentiators: z.array(DifferentiatorSchema),
});

const ServicesContentSchema = z.object({
  sectionLabel: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  services: z.array(ServiceSchema),
});

const ProjectsContentSchema = z.object({
  sectionLabel: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  projects: z.array(ProjectSchema),
});

const ClientsContentSchema = z.object({
  sectionLabel: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  clients: z.array(ClientSchema),
});

const TestimonialsContentSchema = z.object({
  sectionLabel: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  testimonials: z.array(TestimonialSchema),
});

const ProcessContentSchema = z.object({
  sectionLabel: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  steps: z.array(ProcessStepSchema),
});

const ContactContentSchema = z.object({
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

const FooterContentSchema = z.object({
  tagline: z.string(),
  copyright: z.string(),
  navigation: z.array(NavItemSchema),
  closingLine: z.string(),
  serviceLinks: z.array(NavItemSchema),
});

const UiContentSchema = z.object({
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

// Load and validate
const fs = require('fs');
const path = require('path');

function testValidate(file, schema) {
  try {
    const raw = fs.readFileSync(path.join(__dirname, 'src', 'content', file), 'utf8');
    const json = JSON.parse(raw);
    schema.parse(json);
    console.log(`✅ ${file} matches schema`);
  } catch (err) {
    console.error(`❌ ${file} failed validation:`, err.message || err);
    if (err.errors) console.error(JSON.stringify(err.errors, null, 2));
  }
}

console.log("Starting JSON Schema validations...");
testValidate('site.json', SiteConfigSchema);
testValidate('hero.json', HeroContentSchema);
testValidate('about.json', AboutContentSchema);
testValidate('services.json', ServicesContentSchema);
testValidate('projects.json', ProjectsContentSchema);
testValidate('clients.json', ClientsContentSchema);
testValidate('testimonials.json', TestimonialsContentSchema);
testValidate('process.json', ProcessContentSchema);
testValidate('contact.json', ContactContentSchema);
testValidate('footer.json', FooterContentSchema);
testValidate('ui.json', UiContentSchema);
