import { contactMeta } from "@/content/contact";
import { site } from "@/content/site";
import { breadcrumbJsonLd, JsonLd, pageMetadata } from "@/lib/seo";
import { ContactHero } from "@/components/Contact/ContactHero";
import { ContactEnquiry } from "@/components/Contact/ContactEnquiry";
import { ContactDirect } from "@/components/Contact/ContactDirect";

export const metadata = pageMetadata({
  title: contactMeta.title,
  description: contactMeta.description,
  socialTitle: contactMeta.socialTitle,
  path: "/contact-us",
});

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contact ${site.name}`,
  url: `${site.url}/contact-us`,
  description: contactMeta.description,
  mainEntity: {
    "@type": "Organization",
    name: site.name,
    url: site.url,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-332-203-2361",
      contactType: "customer service",
      areaServed: "Worldwide",
      availableLanguage: "English",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
  },
};

/**
 * Contact — the collaboration chapter:
 * Hero (a promise that makes room for you) → Enquiry (the sheet slides
 * over) → Direct lines (number, HQ, studios on local time).
 */
export default function ContactPage() {
  return (
    <main id="main" className="page">
      <JsonLd data={contactPageJsonLd} />
      <JsonLd data={breadcrumbJsonLd("Contact Us", "/contact-us")} />
      <ContactHero />
      <ContactEnquiry />
      <ContactDirect />
    </main>
  );
}
