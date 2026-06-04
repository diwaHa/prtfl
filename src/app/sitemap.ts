import type { MetadataRoute } from "next";
import { getSiteConfig } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const { url } = getSiteConfig();

  return [
    {
      url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
