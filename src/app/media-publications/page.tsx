import {
  publicationsCapabilities,
  publicationsCases,
  publicationsIntro,
  publicationsMeta,
  publicationsProcess,
} from "@/content/services/publications";
import { pageMetadata } from "@/lib/seo";
import { ServiceSchema } from "@/components/Service/ServiceSchema";
import { PublicationsHero } from "@/components/Service/Publications/PublicationsHero";
import { ServiceIntro } from "@/components/Service/ServiceIntro";
import { PublicationsAnatomy } from "@/components/Service/Publications/PublicationsAnatomy";
import { PublicationsColumns } from "@/components/Service/Publications/PublicationsColumns";
import { ServiceIndex } from "@/components/Service/ServiceIndex";
import { ServiceRail } from "@/components/Service/ServiceRail";
import { ServiceProof } from "@/components/Service/ServiceProof";
import { ServiceRelated } from "@/components/Service/ServiceRelated";
import { ServiceClose } from "@/components/Service/ServiceClose";

export const metadata = pageMetadata({
  title: publicationsMeta.title,
  description: publicationsMeta.description,
  socialTitle: publicationsMeta.socialTitle,
  path: publicationsMeta.path,
});

/**
 * Media Publications — the printed-word chapter:
 * Hero (a broadsheet being set, then laid down) → Credibility → Anatomy of
 * a placed story (a proof marked up) → Six formats (drifting columns) →
 * What we do → Process (galley proofs) → Proof → Related → Close (columns
 * dropping into place).
 */
export default function PublicationsPage() {
  return (
    <main id="main" className="page">
      <ServiceSchema meta={publicationsMeta} offers={publicationsCapabilities} />
      <PublicationsHero />
      <ServiceIntro id="publications-intro-title" index={1} label="Credibility" {...publicationsIntro} tone="ink" />
      <PublicationsAnatomy />
      <PublicationsColumns />
      <ServiceIndex
        id="publications-capabilities-title"
        index={5}
        label="What we do"
        title={[{ text: "From story" }, { text: "to the page.", em: true }]}
        intro="Editorial thinking, writing and outreach in one team — so the story that gets pitched is the story that gets printed."
        items={publicationsCapabilities}
        tone="ink"
      />
      <ServiceRail
        id="publications-process-title"
        index={6}
        label="From pitch to print"
        title={[{ text: "Every story," }, { text: "proofed twice.", em: true }]}
        intro="Six proofs, from the first interview to the coverage on your wall. Nothing goes to an editor until it's ready to be read."
        steps={publicationsProcess}
        tone="bone"
        variant="press"
      />
      <ServiceProof
        id="publications-proof-title"
        index={7}
        label="Editorial craft"
        title={[{ text: "Words that" }, { text: "carry weight.", em: true }]}
        cases={publicationsCases}
        tone="ink-2"
      />
      <ServiceRelated current={publicationsMeta.path} group="media" tone="paper" />
      <ServiceClose
        index={8}
        lines={[[{ text: "Your story," }], [{ text: "in print.", em: true }]]}
        sub="Bring us the business, the book or the expertise. The first conversation is free — and we'll tell you which stories editors will actually want."
        tone="bone"
        reveal="columns"
        media={{ kind: "image", src: "/media/editorial/stairs.webp" }}
      />
    </main>
  );
}
