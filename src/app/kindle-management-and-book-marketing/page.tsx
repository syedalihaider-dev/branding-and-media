import { kindleCases, kindleChapters, kindleIntro, kindleMeta } from "@/content/services/kindle";
import { pageMetadata } from "@/lib/seo";
import { ServiceSchema } from "@/components/Service/ServiceSchema";
import { KindleHero } from "@/components/Service/Kindle/KindleHero";
import { ServiceIntro } from "@/components/Service/ServiceIntro";
import { KindleStory } from "@/components/Service/Kindle/KindleStory";
import { ServiceIndex } from "@/components/Service/ServiceIndex";
import { ServiceProof } from "@/components/Service/ServiceProof";
import { ServiceRelated } from "@/components/Service/ServiceRelated";
import { ServiceClose } from "@/components/Service/ServiceClose";

export const metadata = pageMetadata({
  title: kindleMeta.title,
  description: kindleMeta.description,
  socialTitle: kindleMeta.socialTitle,
  path: kindleMeta.path,
});

/**
 * Kindle Management & Book Marketing — the literary chapter:
 * Hero (a book opens) → Opening page (manuscript) → The story of a launch
 * (leaves turn) → Contents (every service a chapter) → From our shelf →
 * Related → Close (the last page turns).
 */
export default function KindlePage() {
  return (
    <main id="main" className="page">
      <ServiceSchema meta={kindleMeta} offers={kindleChapters} />
      <KindleHero />
      <ServiceIntro
        id="kindle-intro-title"
        index={1}
        label="Opening page"
        {...kindleIntro}
        tone="bone"
        variant="manuscript"
      />
      <KindleStory />
      <ServiceIndex
        id="kindle-contents-title"
        index={3}
        label="Contents"
        title={[{ text: "Everything a book needs" }, { text: "to be read.", em: true }]}
        intro="From the metadata only Amazon sees to the screens above Times Square — every service, a chapter in your book's story."
        items={kindleChapters}
        tone="paper"
        variant="contents"
      />
      <ServiceProof
        id="kindle-proof-title"
        index={4}
        label="From our shelf"
        title={[{ text: "Authors," }, { text: "well represented.", em: true }]}
        cases={kindleCases}
        tone="bone"
      />
      <ServiceRelated current={kindleMeta.path} tone="paper" />
      <ServiceClose
        index={5}
        lines={[[{ text: "Let's write" }], [{ text: "the next" }], [{ text: "chapter.", em: true }]]}
        sub="Tell us about your book — finished, nearly finished or already out. The first conversation is free, and we'll start by reading."
        tone="oxblood"
        reveal="page"
      />
    </main>
  );
}
