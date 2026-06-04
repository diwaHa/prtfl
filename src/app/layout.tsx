import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { buildSiteMetadata } from "@/lib/metadata";
import { getUiContent } from "@/lib/content";
import JsonLd from "@/components/seo/JsonLd";
import AppProviders from "@/components/providers/AppProviders";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = buildSiteMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ui = getUiContent();

  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <JsonLd />
        <a href="#main-content" className="skip-link">
          {ui.accessibility.skipToContent}
        </a>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
