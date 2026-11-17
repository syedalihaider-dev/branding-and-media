import { paidCapabilities, paidCases, paidIntro, paidMeta, paidProcess } from "@/content/services/paid";
import { pageMetadata } from "@/lib/seo";
import { ServiceSchema } from "@/components/Service/ServiceSchema";
import { PaidHero } from "@/components/Service/Paid/PaidHero";
import { ServiceIntro } from "@/components/Service/ServiceIntro";
import { PaidChannels } from "@/components/Service/Paid/PaidChannels";
import { PaidFunnel } from "@/components/Service/Paid/PaidFunnel";
import { ServiceIndex } from "@/components/Service/ServiceIndex";
import { ServiceRail } from "@/components/Service/ServiceRail";
import { ServiceProof } from "@/components/Service/ServiceProof";
import { ServiceRelated } from "@/components/Service/ServiceRelated";
import { ServiceClose } from "@/components/Service/ServiceClose";

export const metadata = pageMetadata({
  title: paidMeta.title,
  description: paidMeta.description,
  socialTitle: paidMeta.socialTitle,
  path: paidMeta.path,
});

/**
 * Paid Advertising — the performance chapter:
 * Hero (target acquired) → Thinking → Channels (type at speed) →
 * Funnel (cut stage by stage) → What we run → Process (phases that shear
 * with momentum) → Proof → Related → Close (a fast diagonal cut).
 */
export default function PaidPage() {
  return (
    <main id="main" className="page">
      <ServiceSchema meta={paidMeta} offers={paidCapabilities} />
      <PaidHero />
      <ServiceIntro id="paid-intro-title" index={1} label="The thinking" {...paidIntro} tone="bone" />
      <PaidChannels />
      <PaidFunnel />
      <ServiceIndex
        id="paid-capabilities-title"
        index={4}
        label="What we run"
        title={[{ text: "Built to" }, { text: "convert.", em: true }]}
        intro="Strategy, creative, media buying and measurement under one roof — so nobody is optimizing for the wrong number."
        items={paidCapabilities}
        tone="bone"
      />
      <ServiceRail
        id="paid-process-title"
        index={5}
        label="How campaigns run"
        title={[{ text: "Test fast." }, { text: "Scale what works.", em: true }]}
        intro="Five phases, repeated relentlessly. The budget always follows the evidence."
        steps={paidProcess}
        tone="signal"
        variant="velocity"
      />
      <ServiceProof
        id="paid-proof-title"
        index={6}
        label="On the record"
        title={[{ text: "Campaigns with" }, { text: "a job to do.", em: true }]}
        cases={paidCases}
        tone="ink"
      />
      <ServiceRelated current={paidMeta.path} tone="ink-2" />
      <ServiceClose
        index={7}
        lines={[[{ text: "Let's make" }], [{ text: "every click" }], [{ text: "count.", em: true }]]}
        sub="Tell us what a good result looks like for your business. The first conversation is free — and we'll be straight about whether paid media is the right lever."
        tone="signal"
        reveal="slash"
        media={{ kind: "image", src: "/media/stills/reach.webp" }}
      />
    </main>
  );
}
