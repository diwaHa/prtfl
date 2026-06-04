import type { Metadata } from "next";
import { getSiteConfig } from "@/lib/content";

export function buildSiteMetadata(): Metadata {
  const site = getSiteConfig();

  return {
    metadataBase: new URL(site.url),
    title: {
      default: site.title,
      template: `%s | ${site.name}`,
    },
    description: site.description,
    keywords:
      "web development, UI/UX design, digital agency, brand identity, freelancer portfolio, web design studio",
    authors: { name: site.name },
    creator: site.name,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: site.url,
      siteName: site.name,
      title: site.title,
      description: site.description,
      images: [
        {
          url: site.ogImage,
          width: 1200,
          height: 630,
          alt: site.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: site.title,
      description: site.description,
      creator: site.twitterHandle,
      images: [site.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
