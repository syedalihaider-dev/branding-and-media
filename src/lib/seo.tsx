import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * Consistent per-page metadata. Open Graph images come from each route's
 * `opengraph-image.tsx` (file convention), so they're not repeated here.
 */
export function pageMetadata({
  title,
  description,
  path,
  socialTitle,
}: {
  title: string;
  description: string;
  path: `/${string}`;
  /** Longer, more expressive title for social cards. */
  socialTitle?: string;
}): Metadata {
  const social = socialTitle ?? `${title} — ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: site.name,
      title: social,
      description,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: social,
      description,
    },
    robots: { index: true, follow: true },
  };
}

/** BreadcrumbList JSON-LD for an inner page. */
export function breadcrumbJsonLd(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name, item: `${site.url}${path}` },
    ],
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Static, server-authored data only.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** schema.org Service for a service page, provided by the organization. */
export function serviceJsonLd({
  name,
  description,
  path,
  serviceType,
  offers,
}: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  /** Named components of the service (rendered as an OfferCatalog). */
  offers: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType,
    description,
    url: `${site.url}${path}`,
    areaServed: "Worldwide",
    provider: { "@type": "Organization", name: site.name, url: site.url },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name,
      itemListElement: offers.map((o) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: o },
      })),
    },
  };
}
