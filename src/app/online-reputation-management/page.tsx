import {
  reputationCapabilities,
  reputationCases,
  reputationIntro,
  reputationMeta,
  reputationProcess,
} from "@/content/services/reputation";
import { pageMetadata } from "@/lib/seo";
import { ServiceSchema } from "@/components/Service/ServiceSchema";
import { ReputationHero } from "@/components/Service/Reputation/ReputationHero";
import { ServiceIntro } from "@/components/Service/ServiceIntro";
import { ReputationResults } from "@/components/Service/Reputation/ReputationResults";
import { ServiceIndex } from "@/components/Service/ServiceIndex";
import { ServiceLedger } from "@/components/Service/ServiceLedger";
import { ServiceProof } from "@/components/Service/ServiceProof";
import { ServiceRelated } from "@/components/Service/ServiceRelated";
import { ServiceClose } from "@/components/Service/ServiceClose";

export const metadata = pageMetadata({
  title: reputationMeta.title,
  description: reputationMeta.description,
  socialTitle: reputationMeta.socialTitle,
  path: reputationMeta.path,
});

/**
 * Online Reputation Management — the calm chapter:
 * Hero (a headline and its rippling reflection, stilled by scroll) →
 * Why perception matters → First impressions (before / after) → What we
 * look after → Process (a steady ledger) → Proof & voices → Related →
 * Close (a mirror opening from the centre).
 */
export default function ReputationPage() {
  return (
    <main id="main" className="page">
      <ServiceSchema meta={reputationMeta} offers={reputationCapabilities} />
      <ReputationHero />
      <ServiceIntro id="reputation-intro-title" index={1} label="Perception" {...reputationIntro} tone="ink-2" />
      <ReputationResults />
      <ServiceIndex
        id="reputation-capabilities-title"
        index={3}
        label="What we look after"
        title={[{ text: "Calm," }, { text: "deliberate, ongoing.", em: true }]}
        intro="No promises to make the internet forget. Instead: a clear picture, considered responses and a presence strong enough to lead the conversation."
        items={reputationCapabilities}
        tone="ink"
      />
      <ServiceLedger
        id="reputation-process-title"
        index={4}
        label="How we work"
        title={[{ text: "A practice," }, { text: "not a project.", em: true }]}
        steps={reputationProcess}
        tone="bone"
      />
      <ServiceProof
        id="reputation-proof-title"
        index={5}
        label="Trust, earned"
        title={[{ text: "Names worth" }, { text: "searching.", em: true }]}
        cases={reputationCases}
        tone="ink-2"
      />
      <ServiceRelated current={reputationMeta.path} group="media" tone="bone" />
      <ServiceClose
        index={6}
        lines={[[{ text: "Be seen" }], [{ text: "as you are.", em: true }]]}
        sub="Search your name, then tell us what you'd like people to find. The first conversation is free, confidential and without obligation."
        tone="ink"
        reveal="mirror"
        media={{ kind: "image", src: "/media/stills/lens.webp" }}
      />
    </main>
  );
}
