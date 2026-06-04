import { SiteConfig, HeroContent, AboutContent, ServicesContent, ProjectsContent, ClientsContent, TestimonialsContent, ProcessContent, ContactContent, FooterContent, NavItem, UiContent } from "@/types/content";
import { SiteConfigSchema, HeroContentSchema, AboutContentSchema, ServicesContentSchema, ProjectsContentSchema, ClientsContentSchema, TestimonialsContentSchema, ProcessContentSchema, ContactContentSchema, FooterContentSchema, NavItemSchema, UiContentSchema } from "./schemas";
import { z } from "zod";

import siteData from "@/content/site.json";
import heroData from "@/content/hero.json";
import aboutData from "@/content/about.json";
import servicesData from "@/content/services.json";
import projectsData from "@/content/projects.json";
import clientsData from "@/content/clients.json";
import testimonialsData from "@/content/testimonials.json";
import processData from "@/content/process.json";
import contactData from "@/content/contact.json";
import footerData from "@/content/footer.json";
import navigationData from "@/content/navigation.json";
import uiData from "@/content/ui.json";

export function getSiteConfig(): SiteConfig {
  return SiteConfigSchema.parse(siteData);
}

export function getHeroContent(): HeroContent {
  return HeroContentSchema.parse(heroData);
}

export function getAboutContent(): AboutContent {
  return AboutContentSchema.parse(aboutData);
}

export function getServicesContent(): ServicesContent {
  return ServicesContentSchema.parse(servicesData);
}

export function getProjectsContent(): ProjectsContent {
  return ProjectsContentSchema.parse(projectsData);
}

export function getClientsContent(): ClientsContent {
  return ClientsContentSchema.parse(clientsData);
}

export function getTestimonialsContent(): TestimonialsContent {
  return TestimonialsContentSchema.parse(testimonialsData);
}

export function getProcessContent(): ProcessContent {
  return ProcessContentSchema.parse(processData);
}

export function getContactContent(): ContactContent {
  return ContactContentSchema.parse(contactData);
}

export function getFooterContent(): FooterContent {
  return FooterContentSchema.parse(footerData);
}

export function getNavigationContent(): NavItem[] {
  return z.array(NavItemSchema).parse(navigationData);
}

export function getUiContent(): UiContent {
  return UiContentSchema.parse(uiData);
}
