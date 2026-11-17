import { featuredCapabilities, featuredIntro, featuredMeta, featuredProcess } from "@/content/services/featured";
import { pageMetadata } from "@/lib/seo";
import { ServiceSchema } from "@/components/Service/ServiceSchema";
import { FeaturedHero } from "@/components/Service/Featured/FeaturedHero";
import { ServiceIntro } from "@/components/Service/ServiceIntro";
import { FeaturedCovers } from "@/components/Service/Featured/FeaturedCovers";
import { FeaturedPress } from "@/components/Service/Featured/FeaturedPress";
import { ServiceIndex } from "@/components/Service/ServiceIndex";
import { ServiceLedger } from "@/components/Service/ServiceLedger";
import { ServiceRelated } from "@/components/Service/ServiceRelated";
import { ServiceClose } from "@/components/Service/ServiceClose";

export const metadata = pageMetadata({
  title: featuredMeta.title,
  description: featuredMeta.description,
  socialTitle: featuredMeta.socialTitle,
  path: featuredMeta.path,
});

/**
 * Featured Media Placements — the spotlight chapter:
 * Hero (a single beam finds its subject) → Mention vs feature → The
 * placements (covers flying out of depth) → As seen in (a turning drum of
 * real press names) → What we do → Process (a measured ledger) → Related →
 * Close (a spotlight cone falling on the brand film).
 */
export default function FeaturedPage() {
  return (
    <main id="main" className="page">
      <ServiceSchema meta={featuredMeta} offers={featuredCapabilities} />
      <FeaturedHero />
      <ServiceIntro id="featured-intro-title" index={1} label="Recognition" {...featuredIntro} tone="bone" />
      <FeaturedCovers />
      <FeaturedPress />
      <ServiceIndex
        id="featured-capabilities-title"
        index={4}
        label="What we do"
        title={[{ text: "Made for" }, { text: "the spotlight.", em: true }]}
        intro="Premium placements are earned, not bought. Everything below exists to make you the obvious choice for the page."
        items={featuredCapabilities}
        tone="paper"
      />
      <ServiceLedger
        id="featured-process-title"
        index={5}
        label="The road to the feature"
        title={[{ text: "Five steps" }, { text: "to the page.", em: true }]}
        steps={featuredProcess}
        tone="ink"
      />
      <ServiceRelated current={featuredMeta.path} group="media" tone="ink-2" />
      <ServiceClose
        index={6}
        lines={[[{ text: "Step into" }], [{ text: "the light.", em: true }]]}
        sub="Tell us what you've built and who should know about it. The first conversation is free — and we'll be candid about which features you're ready for now."
        tone="ink"
        reveal="spot"
        media={{ kind: "video" }}
      />
    </main>
  );
}
