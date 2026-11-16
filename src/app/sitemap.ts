import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Service pages join the sitemap as they're built.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/about-us`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${site.url}/contact-us`, changeFrequency: "yearly", priority: 0.8 },
  ];
}
