import { blogCapabilities, blogCases, blogIntro, blogMeta } from "@/content/services/blog";
import { photos } from "@/content/editorialImages";
import { pageMetadata } from "@/lib/seo";
import { ServiceSchema } from "@/components/Service/ServiceSchema";
import { BlogHero } from "@/components/Service/Blog/BlogHero";
import { ServiceIntro } from "@/components/Service/ServiceIntro";
import { BlogLife } from "@/components/Service/Blog/BlogLife";
import { ServiceIndex } from "@/components/Service/ServiceIndex";
import { ServiceProof } from "@/components/Service/ServiceProof";
import { ServiceRelated } from "@/components/Service/ServiceRelated";
import { ServiceClose } from "@/components/Service/ServiceClose";

export const metadata = pageMetadata({
  title: blogMeta.title,
  description: blogMeta.description,
  socialTitle: blogMeta.socialTitle,
  path: blogMeta.path,
});

/**
 * Blog & Article Writing — the contemporary chapter:
 * Hero (a headline moving through drifting article fragments) → Worth
 * reading → The life of an article (one headline, brief to byline — this
 * page's process) → What we write → Proof → Related (Media Copywriting
 * first) → Close (rising like a feed).
 */
export default function BlogPage() {
  return (
    <main id="main" className="page">
      <ServiceSchema meta={blogMeta} offers={blogCapabilities} />
      <BlogHero />
      <ServiceIntro id="blog-intro-title" index={1} label="Worth reading" {...blogIntro} tone="ink-2" />
      <BlogLife />
      <ServiceIndex
        id="blog-capabilities-title"
        index={3}
        label="What we write"
        title={[{ text: "Content that" }, { text: "compounds.", em: true }]}
        intro="Each article keeps working long after it's published — answering questions, earning links and bringing the right readers back to you."
        items={blogCapabilities}
        tone="bone"
      />
      <ServiceProof
        id="blog-proof-title"
        index={4}
        label="On the record"
        title={[{ text: "Read, found," }, { text: "trusted.", em: true }]}
        cases={blogCases}
        tone="paper"
      />
      <ServiceRelated current={blogMeta.path} group="editorial" lead="/media-copywriting" tone="ink-2" />
      <ServiceClose
        index={5}
        lines={[[{ text: "Publish" }], [{ text: "something" }], [{ text: "worth reading.", em: true }]]}
        sub="Tell us who you want to reach and what you know. The first conversation is free — we'll come with topic ideas, not a sales deck."
        tone="ink"
        reveal="feed"
        media={{ kind: "image", src: photos.blogReader.src }}
      />
    </main>
  );
}
