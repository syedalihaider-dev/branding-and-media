import type { MetadataRoute } from "next";
import { liveGroups, serviceGroups } from "@/content/navigation";
import { site } from "@/content/site";

/** Service pages that are live. Other groups join as they're built. */
const liveServices = serviceGroups.filter((g) => liveGroups.includes(g.id)).flatMap((g) => g.services);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/about-us`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${site.url}/contact-us`, changeFrequency: "yearly", priority: 0.8 },
    ...liveServices.map((s) => ({
      url: `${site.url}${s.href}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
