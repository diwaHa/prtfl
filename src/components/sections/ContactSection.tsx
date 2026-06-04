"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Calendar,
  Send,
  Twitter,
  Linkedin,
  Github,
  Compass,
} from "lucide-react";
import { toast } from "sonner";
import { contactFormSchema } from "@/lib/contact-schema";
import { ZodError } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { UiContent } from "@/types/content";

const socialIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Twitter,
  LinkedIn: Linkedin,
  GitHub: Github,
  Dribbble: Compass,
};

const fieldClassName = cn(
  "rounded-xl border-surface-border bg-surface text-foreground",
  "placeholder:text-foreground-subtle focus-visible:border-accent focus-visible:ring-accent/30"
);

interface SocialLinkProps {
  platform: string;
  url: string;
  label: string;
}

interface FormFieldProps {
  name: string;
  label: string;
  type: "text" | "email" | "textarea" | "select";
  placeholder: string;
  required: boolean;
  options?: string[];
}

interface ContactSectionProps {
  sectionLabel: string;
  headline: string;
  subtitle: string;
  email: string;
  phone: string;
  location: string;
  timezone: string;
  bookCallCta: { label: string; href: string };
  socialLinks: SocialLinkProps[];
  formFields: FormFieldProps[];
  labels: UiContent["contact"];
}

export default function ContactSection({
  sectionLabel,
  headline,
  subtitle,
  email,
  phone,
  location,
  timezone,
  bookCallCta,
  socialLinks,
  formFields,
  labels,
}: ContactSectionProps) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState<Record<string, string>>({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFieldErrors({});

    try {
      contactFormSchema.parse(formData);
    } catch (err) {
      setIsSubmitting(false);
      if (err instanceof ZodError) {
        const errors: Record<string, string> = {};
        err.errors.forEach((issue) => {
          const key = issue.path[0]?.toString();
          if (key && !errors[key]) errors[key] = issue.message;
        });
        setFieldErrors(errors);
        toast.error(labels.toasts.validationError);
      }
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setFormData({
          name: "",
          email: "",
          company: "",
          budget: "",
          message: "",
        });
        toast.success(labels.toasts.success);
      } else {
        toast.error(result.error || labels.toasts.error);
      }
    } catch {
      toast.error(labels.toasts.networkError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative section-padding border-t border-surface-border/30 bg-surface/20"
      aria-label="Contact us"
    >
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-cyan/3 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Left — Form (per plan) */}
          <motion.div
            className="lg:col-span-7 lg:order-1"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="glass border-surface-border/50 bg-surface/40 py-0 gap-0">
              <CardHeader className="px-8 pt-8 pb-0">
                <CardTitle className="font-[var(--font-outfit)] text-xl">
                  {labels.formTitle}
                </CardTitle>
                <CardDescription className="text-foreground-muted">
                  {labels.formDescription}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {formFields.map((field) => (
                    <div key={field.name} className="space-y-2">
                      <label
                        htmlFor={field.name}
                        className="text-xs font-semibold text-foreground-muted"
                      >
                        {field.label}{" "}
                        {field.required && (
                          <span className="text-accent-rose">*</span>
                        )}
                      </label>
                      {fieldErrors[field.name] && (
                        <p className="text-xs text-accent-rose" role="alert">
                          {fieldErrors[field.name]}
                        </p>
                      )}

                      {field.type === "textarea" ? (
                        <Textarea
                          id={field.name}
                          name={field.name}
                          required={field.required}
                          placeholder={field.placeholder}
                          value={formData[field.name] || ""}
                          onChange={handleChange}
                          rows={5}
                          aria-invalid={!!fieldErrors[field.name]}
                          className={fieldClassName}
                        />
                      ) : field.type === "select" ? (
                        <select
                          id={field.name}
                          name={field.name}
                          required={field.required}
                          value={formData[field.name] || ""}
                          onChange={handleChange}
                          aria-invalid={!!fieldErrors[field.name]}
                          className={cn(fieldClassName, "h-9 w-full px-3 py-1 text-sm")}
                        >
                          <option value="" disabled>
                            {field.placeholder}
                          </option>
                          {field.options?.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <Input
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          required={field.required}
                          placeholder={field.placeholder}
                          value={formData[field.name] || ""}
                          onChange={handleChange}
                          aria-invalid={!!fieldErrors[field.name]}
                          className={fieldClassName}
                        />
                      )}
                    </div>
                  ))}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-accent to-accent-violet text-white font-bold hover:opacity-90 hover:shadow-xl hover:shadow-accent/25 border-0"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {labels.sendingLabel}
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        {labels.sendMessageLabel}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right — Contact details */}
          <div className="lg:col-span-5 lg:order-2 space-y-10">
            <div>
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
                className="text-[var(--text-base)] text-foreground-muted leading-relaxed"
              >
                {subtitle}
              </motion.p>
            </div>

            <div className="space-y-4">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-surface-border/40 hover:border-accent/40 group transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-xs text-foreground-subtle block">{labels.emailLabel}</span>
                  <span className="text-sm font-semibold text-foreground">{email}</span>
                </div>
              </a>

              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-surface-border/40 hover:border-accent/40 group transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-xs text-foreground-subtle block">{labels.phoneLabel}</span>
                  <span className="text-sm font-semibold text-foreground">{phone}</span>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-surface-border/40">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="text-xs text-foreground-subtle block">{labels.locationLabel}</span>
                  <span className="text-sm font-semibold text-foreground">{location}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-surface-border/40">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <Clock size={18} />
                </div>
                <div>
                  <span className="text-xs text-foreground-subtle block">{labels.timezoneLabel}</span>
                  <span className="text-sm font-semibold text-foreground">{timezone}</span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">
                {labels.connectLabel}
              </p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link) => {
                  const IconComp = socialIcons[link.platform] || Compass;
                  return (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-surface border border-surface-border flex items-center justify-center text-foreground-muted hover:text-accent hover:border-accent/40 transition-all duration-300"
                      aria-label={link.label}
                    >
                      <IconComp size={18} />
                    </a>
                  );
                })}
              </div>
            </div>

            <a
              href={bookCallCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-surface-light border border-surface-border hover:border-accent/60 text-sm font-semibold text-foreground hover:bg-surface transition-all duration-300 shadow-lg"
            >
              <Calendar size={18} className="text-accent" />
              <span>{bookCallCta.label}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
