import { aboutMeta } from "@/content/about";
import { site } from "@/content/site";
import { breadcrumbJsonLd, JsonLd, pageMetadata } from "@/lib/seo";
import { AboutHero } from "@/components/About/AboutHero";
import { AboutStory } from "@/components/About/AboutStory";
import { AboutBeliefs } from "@/components/About/AboutBeliefs";
import { AboutApproach } from "@/components/About/AboutApproach";
import { AboutPractices } from "@/components/About/AboutPractices";
import { AboutGlobal } from "@/components/About/AboutGlobal";
import { AboutClose } from "@/components/About/AboutClose";

export const metadata = pageMetadata({
  title: aboutMeta.title,
  description: aboutMeta.description,
  socialTitle: aboutMeta.socialTitle,
  path: "/about-us",
});

const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: `About ${site.name}`,
  url: `${site.url}/about-us`,
  description: aboutMeta.description,
  about: { "@type": "Organization", name: site.name, url: site.url },
};

/**
 * About — the brand-story chapter:
 * Hero (step through the headline into the film) → Who we are (read in) →
 * What we believe (inked manifesto) → How we work (stacked sheets) →
 * What we do (sticky practices) → Where we are (moving map of type) →
 * Next chapter (the lights come up).
 */
export default function AboutPage() {
  return (
    <main id="main" className="page">
      <JsonLd data={aboutPageJsonLd} />
      <JsonLd data={breadcrumbJsonLd("About Us", "/about-us")} />
      <AboutHero />
      <AboutStory />
      <AboutBeliefs />
      <AboutApproach />
      <AboutPractices />
      <AboutGlobal />
      <AboutClose />
    </main>
  );
}
