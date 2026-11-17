import { ghostCapabilities, ghostIntro, ghostMeta, ghostProcess } from "@/content/services/ghostwriting";
import { photos } from "@/content/editorialImages";
import { pageMetadata } from "@/lib/seo";
import { ServiceSchema } from "@/components/Service/ServiceSchema";
import { GhostHero } from "@/components/Service/Ghost/GhostHero";
import { ServiceIntro } from "@/components/Service/ServiceIntro";
import { GhostLayers } from "@/components/Service/Ghost/GhostLayers";
import { GhostRedact } from "@/components/Service/Ghost/GhostRedact";
import { ServiceIndex } from "@/components/Service/ServiceIndex";
import { ServiceLedger } from "@/components/Service/ServiceLedger";
import { ServiceRelated } from "@/components/Service/ServiceRelated";
import { ServiceClose } from "@/components/Service/ServiceClose";

export const metadata = pageMetadata({
  title: ghostMeta.title,
  description: ghostMeta.description,
  socialTitle: ghostMeta.socialTitle,
  path: ghostMeta.path,
});

/**
 * Ghostwriting — the quiet chapter:
 * Hero (words inked out of the dark; the ghost line dissolves) → Time, not
 * material → From conversation to manuscript (layers of paper in depth) →
 * Discretion (our name, redacted) → What we write → Process → Related
 * (Book Writing & Editing first) → Close (ink spreading).
 */
export default function GhostwritingPage() {
  return (
    <main id="main" className="page">
      <ServiceSchema meta={ghostMeta} offers={ghostCapabilities} />
      <GhostHero />
      <ServiceIntro id="ghost-intro-title" index={1} label="The gap" {...ghostIntro} tone="bone" variant="manuscript" />
      <GhostLayers />
      <GhostRedact />
      <ServiceIndex
        id="ghost-capabilities-title"
        index={4}
        label="What we write"
        title={[{ text: "Anything with" }, { text: "your name on it.", em: true }]}
        intro="Long or short, published or private — written to sound like you, because it is built from you."
        items={ghostCapabilities}
        tone="paper"
      />
      <ServiceLedger
        id="ghost-process-title"
        index={5}
        label="How we work"
        title={[{ text: "We listen" }, { text: "first.", em: true }]}
        steps={ghostProcess}
        tone="ink"
      />
      <ServiceRelated current={ghostMeta.path} group="editorial" lead="/book-writing-editing" tone="ink-2" />
      <ServiceClose
        index={6}
        lines={[[{ text: "Tell us" }], [{ text: "your story.", em: true }]]}
        sub="The first conversation is free and completely confidential. Tell us what you want to write — we'll tell you how we'd write it with you."
        tone="ink"
        reveal="ink"
        media={{ kind: "image", src: photos.ghostLetter.src }}
      />
    </main>
  );
}
