import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";

// Sections
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ClientsSection from "@/components/sections/ClientsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import ContactSection from "@/components/sections/ContactSection";

// Content Loader
import {
  getSiteConfig,
  getHeroContent,
  getAboutContent,
  getServicesContent,
  getProjectsContent,
  getClientsContent,
  getTestimonialsContent,
  getProcessContent,
  getContactContent,
  getFooterContent,
  getNavigationContent,
  getUiContent,
} from "@/lib/content";

export default function Home() {
  // Load content from server JSON layer
  const siteConfig = getSiteConfig();
  const heroContent = getHeroContent();
  const aboutContent = getAboutContent();
  const servicesContent = getServicesContent();
  const projectsContent = getProjectsContent();
  const clientsContent = getClientsContent();
  const testimonialsContent = getTestimonialsContent();
  const processContent = getProcessContent();
  const contactContent = getContactContent();
  const footerContent = getFooterContent();
  const navigation = getNavigationContent();
  const ui = getUiContent();

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-background text-foreground noise-overlay">
        <Header
          brand={siteConfig.brand}
          navItems={navigation}
          headerCta={siteConfig.headerCta}
        />

        {/* Main Content Area */}
        <main id="main-content" className="relative z-10">
          {/* Hero */}
          <HeroSection
            scrollLabel={ui.hero.scrollLabel}
            availabilityBadge={heroContent.availabilityBadge}
            headline={heroContent.headline}
            highlightedText={heroContent.highlightedText}
            subtitle={heroContent.subtitle}
            primaryCta={heroContent.primaryCta}
            secondaryCta={heroContent.secondaryCta}
            trustSignals={heroContent.trustSignals}
          />

          {/* About */}
          <AboutSection
            sectionLabel={aboutContent.sectionLabel}
            headline={aboutContent.headline}
            description={aboutContent.description}
            paragraphs={aboutContent.paragraphs}
            differentiators={aboutContent.differentiators}
          />

          {/* Services */}
          <ServicesSection
            sectionLabel={servicesContent.sectionLabel}
            headline={servicesContent.headline}
            subtitle={servicesContent.subtitle}
            services={servicesContent.services}
            challengeLabel={ui.services.challengeLabel}
            deliverablesLabel={ui.services.deliverablesLabel}
          />

          {/* Projects */}
          <ProjectsSection
            sectionLabel={projectsContent.sectionLabel}
            headline={projectsContent.headline}
            subtitle={projectsContent.subtitle}
            projects={projectsContent.projects}
            labels={ui.projects}
          />

          {/* Clients */}
          <ClientsSection
            sectionLabel={clientsContent.sectionLabel}
            headline={clientsContent.headline}
            subtitle={clientsContent.subtitle}
            clients={clientsContent.clients}
          />

          {/* Testimonials */}
          <TestimonialsSection
            sectionLabel={testimonialsContent.sectionLabel}
            headline={testimonialsContent.headline}
            subtitle={testimonialsContent.subtitle}
            testimonials={testimonialsContent.testimonials}
          />

          {/* How We Work */}
          <ProcessSection
            sectionLabel={processContent.sectionLabel}
            headline={processContent.headline}
            subtitle={processContent.subtitle}
            steps={processContent.steps}
          />

          {/* Contact */}
          <ContactSection
            sectionLabel={contactContent.sectionLabel}
            headline={contactContent.headline}
            subtitle={contactContent.subtitle}
            email={contactContent.email}
            phone={contactContent.phone}
            location={contactContent.location}
            timezone={contactContent.timezone}
            bookCallCta={contactContent.bookCallCta}
            socialLinks={contactContent.socialLinks}
            formFields={contactContent.formFields}
            labels={ui.contact}
          />
        </main>

        {/* Footer */}
        <Footer
          brand={siteConfig.brand}
          tagline={footerContent.tagline}
          copyright={footerContent.copyright}
          navigation={footerContent.navigation}
          serviceLinks={footerContent.serviceLinks}
          closingLine={footerContent.closingLine}
          socialLinks={siteConfig.socialLinks}
          labels={ui.footer}
        />
      </div>
    </SmoothScroll>
  );
}
