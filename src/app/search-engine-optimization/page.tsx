import { seoCapabilities, seoCases, seoIntro, seoMeta, seoProcess } from "@/content/services/seo";
import { pageMetadata } from "@/lib/seo";
import { ServiceSchema } from "@/components/Service/ServiceSchema";
import { SeoHero } from "@/components/Service/Seo/SeoHero";
import { ServiceIntro } from "@/components/Service/ServiceIntro";
import { SeoClimb } from "@/components/Service/Seo/SeoClimb";
import { SeoNetwork } from "@/components/Service/Seo/SeoNetwork";
import { ServiceIndex } from "@/components/Service/ServiceIndex";
import { ServiceLedger } from "@/components/Service/ServiceLedger";
import { ServiceProof } from "@/components/Service/ServiceProof";
import { ServiceRelated } from "@/components/Service/ServiceRelated";
import { ServiceClose } from "@/components/Service/ServiceClose";

export const metadata = pageMetadata({
  title: seoMeta.title,
  description: seoMeta.description,
  socialTitle: seoMeta.socialTitle,
  path: seoMeta.path,
});

/**
 * Search Engine Optimization — the precision chapter:
 * Hero (a query, answered) → Thinking → The climb (technical, content,
 * authority) → Topics not keywords (a cluster drawn) → What we optimize →
 * Ledger (method, line by line) → Case file → Related → Close (the lens opens).
 */
export default function SeoPage() {
  return (
    <main id="main" className="page">
      <ServiceSchema meta={seoMeta} offers={seoCapabilities} />
      <SeoHero />
      <ServiceIntro id="seo-intro-title" index={1} label="The thinking" {...seoIntro} tone="ink" />
      <SeoClimb />
      <SeoNetwork />
      <ServiceIndex
        id="seo-capabilities-title"
        index={4}
        label="What we optimize"
        title={[{ text: "Every signal," }, { text: "aligned.", em: true }]}
        intro="Search visibility is the sum of many small, correct decisions. These are the ones we make for you."
        items={seoCapabilities}
        tone="bone"
      />
      <ServiceLedger
        id="seo-process-title"
        index={5}
        label="The method"
        title={[{ text: "Six steps." }, { text: "No tricks.", em: true }]}
        steps={seoProcess}
        tone="ink-2"
      />
      <ServiceProof
        id="seo-proof-title"
        index={6}
        label="In practice"
        title={[{ text: "Found by the people" }, { text: "who matter.", em: true }]}
        cases={seoCases}
        tone="paper"
      />
      <ServiceRelated current={seoMeta.path} tone="bone" />
      <ServiceClose
        index={7}
        lines={[[{ text: "Let's get" }], [{ text: "you" }, { text: "found.", em: true }]]}
        sub="Start with an honest look at where you stand. Our first conversation is free — bring your website, we'll bring the questions."
        tone="signal"
        reveal="iris"
        media={{ kind: "image", src: "/media/stills/lens.webp" }}
      />
    </main>
  );
}
