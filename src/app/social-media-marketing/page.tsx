import { socialCapabilities, socialIntro, socialMeta } from "@/content/services/social";
import { pageMetadata } from "@/lib/seo";
import { ServiceSchema } from "@/components/Service/ServiceSchema";
import { SocialHero } from "@/components/Service/Social/SocialHero";
import { ServiceIntro } from "@/components/Service/ServiceIntro";
import { SocialFormats } from "@/components/Service/Social/SocialFormats";
import { SocialAudiences } from "@/components/Service/Social/SocialAudiences";
import { ServiceIndex } from "@/components/Service/ServiceIndex";
import { SocialLoop } from "@/components/Service/Social/SocialLoop";
import { ServiceRelated } from "@/components/Service/ServiceRelated";
import { ServiceClose } from "@/components/Service/ServiceClose";

export const metadata = pageMetadata({
  title: socialMeta.title,
  description: socialMeta.description,
  socialTitle: socialMeta.socialTitle,
  path: socialMeta.path,
});

/**
 * Social Media Marketing — the campaign-studio chapter:
 * Hero (a feed that reacts to you) → Point of view → Formats (a reel you
 * scroll through) → Two audiences → What we do → The loop (a dial that
 * turns) → Related → Close (a post that opens to full screen).
 */
export default function SocialPage() {
  return (
    <main id="main" className="page">
      <ServiceSchema meta={socialMeta} offers={socialCapabilities} />
      <SocialHero />
      <ServiceIntro id="social-intro-title" index={1} label="Point of view" {...socialIntro} tone="blush" />
      <SocialFormats />
      <SocialAudiences />
      <ServiceIndex
        id="social-capabilities-title"
        index={4}
        label="What we do"
        title={[{ text: "Strategy to" }, { text: "screen.", em: true }]}
        intro="Everything a brand needs to be worth following — planned together, made together, measured together."
        items={socialCapabilities}
        tone="bone"
      />
      <SocialLoop />
      <ServiceRelated current={socialMeta.path} tone="blush" />
      <ServiceClose
        index={6}
        lines={[[{ text: "Give them" }], [{ text: "something to" }], [{ text: "talk about.", em: true }]]}
        sub="Bring us your brand, your book or your business. The first conversation is free — and it's usually where the best idea turns up."
        tone="ink"
        reveal="card"
        media={{ kind: "video" }}
      />
    </main>
  );
}
