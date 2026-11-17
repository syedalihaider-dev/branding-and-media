import { copyCapabilities, copyCases, copyIntro, copyMeta, copyProcess } from "@/content/services/copywriting";
import { photos } from "@/content/editorialImages";
import { pageMetadata } from "@/lib/seo";
import { ServiceSchema } from "@/components/Service/ServiceSchema";
import { CopyHero } from "@/components/Service/Copy/CopyHero";
import { ServiceIntro } from "@/components/Service/ServiceIntro";
import { CopyFormats } from "@/components/Service/Copy/CopyFormats";
import { CopyVoice } from "@/components/Service/Copy/CopyVoice";
import { ServiceIndex } from "@/components/Service/ServiceIndex";
import { ServiceRail } from "@/components/Service/ServiceRail";
import { ServiceProof } from "@/components/Service/ServiceProof";
import { ServiceRelated } from "@/components/Service/ServiceRelated";
import { ServiceClose } from "@/components/Service/ServiceClose";

export const metadata = pageMetadata({
  title: copyMeta.title,
  description: copyMeta.description,
  socialTitle: copyMeta.socialTitle,
  path: copyMeta.path,
});

/**
 * Media Copywriting — the sharp chapter:
 * Hero (an editor choosing the verb; a word made of photograph) → The right
 * words → Six formats (type takes over the viewport) → Three voices (one
 * message, rewritten live) → What we write → Process → Proof → Related
 * (Blog & Article Writing first) → Close (a marker stroke).
 */
export default function CopywritingPage() {
  return (
    <main id="main" className="page">
      <ServiceSchema meta={copyMeta} offers={copyCapabilities} />
      <CopyHero />
      <ServiceIntro id="copy-intro-title" index={1} label="The right words" {...copyIntro} tone="ink-2" />
      <CopyFormats />
      <CopyVoice />
      <ServiceIndex
        id="copy-capabilities-title"
        index={4}
        label="Capabilities"
        title={[{ text: "Clear before" }, { text: "clever.", em: true }]}
        intro="From the message itself to the last subject line — strategy and writing from the same team, so nothing is lost in translation."
        items={copyCapabilities}
        tone="bone"
      />
      <ServiceRail
        id="copy-process-title"
        index={5}
        label="How we write"
        title={[{ text: "Fewer words," }, { text: "more said.", em: true }]}
        intro="Six steps from brief to final file. Most of the writing happens before the first draft."
        steps={copyProcess}
        tone="signal"
        variant="velocity"
      />
      <ServiceProof
        id="copy-proof-title"
        index={6}
        label="In the wild"
        title={[{ text: "One idea," }, { text: "said well.", em: true }]}
        cases={copyCases}
        tone="ink"
      />
      <ServiceRelated current={copyMeta.path} group="editorial" lead="/blog-article-writing" tone="ink-2" />
      <ServiceClose
        index={7}
        lines={[[{ text: "Say it" }], [{ text: "like you" }], [{ text: "mean it.", em: true }]]}
        sub="Send us the brief — or the problem. The first conversation is free, and you'll leave it with a clearer message than you arrived with."
        tone="signal"
        reveal="highlight"
        media={{ kind: "image", src: photos.copyDictionary.src }}
      />
    </main>
  );
}
