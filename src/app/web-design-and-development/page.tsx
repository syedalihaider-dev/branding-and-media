import { webCapabilities, webCases, webIntro, webMeta, webProcess } from "@/content/services/web";
import { pageMetadata } from "@/lib/seo";
import { ServiceSchema } from "@/components/Service/ServiceSchema";
import { WebHero } from "@/components/Service/Web/WebHero";
import { ServiceIntro } from "@/components/Service/ServiceIntro";
import { WebResponsive } from "@/components/Service/Web/WebResponsive";
import { ServiceIndex } from "@/components/Service/ServiceIndex";
import { ServiceRail } from "@/components/Service/ServiceRail";
import { ServiceProof } from "@/components/Service/ServiceProof";
import { ServiceRelated } from "@/components/Service/ServiceRelated";
import { ServiceClose } from "@/components/Service/ServiceClose";

export const metadata = pageMetadata({
  title: webMeta.title,
  description: webMeta.description,
  socialTitle: webMeta.socialTitle,
  path: webMeta.path,
});

/**
 * Web Design & Development — the architecture chapter:
 * Hero (layers assemble into a site) → Thinking (read in) →
 * Responsive (a frame that reflows live) → What we build (index) →
 * How (a blueprint you travel along) → Built by us → Related → Close (grid assembles).
 */
export default function WebDesignPage() {
  return (
    <main id="main" className="page">
      <ServiceSchema meta={webMeta} offers={webCapabilities} />
      <WebHero />
      <ServiceIntro id="web-intro-title" index={1} label="The thinking" {...webIntro} tone="ink" />
      <WebResponsive />
      <ServiceIndex
        id="web-capabilities-title"
        index={3}
        label="What we build"
        title={[{ text: "Sites, stores" }, { text: "& systems.", em: true }]}
        intro="From a single author site to a full e-commerce platform — every build starts from the same question: what does the person on the other side need?"
        items={webCapabilities}
        tone="ink-2"
      />
      <ServiceRail
        id="web-process-title"
        index={4}
        label="How a site gets built"
        title={[{ text: "From blueprint" }, { text: "to browser.", em: true }]}
        intro="Six stages, each signed off before the next begins — so nothing important is decided by accident."
        steps={webProcess}
        tone="ink"
        variant="blueprint"
      />
      <ServiceProof
        id="web-proof-title"
        index={5}
        label="Built by us"
        title={[{ text: "Homes on the web," }, { text: "built to last.", em: true }]}
        cases={webCases}
        tone="bone"
      />
      <ServiceRelated current={webMeta.path} tone="ink-2" />
      <ServiceClose
        index={6}
        lines={[[{ text: "Let's build" }], [{ text: "something worth" }], [{ text: "visiting.", em: true }]]}
        sub="Tell us what your website needs to do. The first conversation — our Ice Breaker — is free, and you'll leave it with a clearer brief than you arrived with."
        tone="signal"
        reveal="shutter"
      />
    </main>
  );
}
