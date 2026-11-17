import {
  interviewsCapabilities,
  interviewsCases,
  interviewsIntro,
  interviewsMeta,
  interviewsProcess,
} from "@/content/services/interviews";
import { pageMetadata } from "@/lib/seo";
import { ServiceSchema } from "@/components/Service/ServiceSchema";
import { InterviewHero } from "@/components/Service/Interviews/InterviewHero";
import { ServiceIntro } from "@/components/Service/ServiceIntro";
import { InterviewStages } from "@/components/Service/Interviews/InterviewStages";
import { InterviewSoundbite } from "@/components/Service/Interviews/InterviewSoundbite";
import { ServiceIndex } from "@/components/Service/ServiceIndex";
import { ServiceRail } from "@/components/Service/ServiceRail";
import { ServiceProof } from "@/components/Service/ServiceProof";
import { ServiceRelated } from "@/components/Service/ServiceRelated";
import { ServiceClose } from "@/components/Service/ServiceClose";

export const metadata = pageMetadata({
  title: interviewsMeta.title,
  description: interviewsMeta.description,
  socialTitle: interviewsMeta.socialTitle,
  path: interviewsMeta.path,
});

/**
 * Media Interviews & Appearances — the on-camera chapter:
 * Hero (a viewfinder racking focus) → Why it matters → Four rooms (a
 * monitor changing channel) → The soundbite (captions synced to a
 * waveform) → What we handle → Process (a strip of film) → Proof →
 * Related → Close (a letterbox opening).
 */
export default function InterviewsPage() {
  return (
    <main id="main" className="page">
      <ServiceSchema meta={interviewsMeta} offers={interviewsCapabilities} />
      <InterviewHero />
      <ServiceIntro id="interview-intro-title" index={1} label="Why it matters" {...interviewsIntro} tone="bone" />
      <InterviewStages />
      <InterviewSoundbite />
      <ServiceIndex
        id="interview-capabilities-title"
        index={4}
        label="What we handle"
        title={[{ text: "Booked," }, { text: "briefed, brilliant.", em: true }]}
        intro="From the first pitch to the last clip, everything an appearance needs — so you can give your full attention to the conversation."
        items={interviewsCapabilities}
        tone="bone"
      />
      <ServiceRail
        id="interview-process-title"
        index={5}
        label="How it runs"
        title={[{ text: "Before the" }, { text: "red light.", em: true }]}
        intro="Six scenes, from finding your story to the clip that keeps it travelling. Most of the work happens before anyone says “rolling”."
        steps={interviewsProcess}
        tone="ink"
        variant="reel"
      />
      <ServiceProof
        id="interview-proof-title"
        index={6}
        label="On the record"
        title={[{ text: "Rooms that" }, { text: "mattered.", em: true }]}
        cases={interviewsCases}
        tone="paper"
      />
      <ServiceRelated current={interviewsMeta.path} group="media" tone="ink-2" />
      <ServiceClose
        index={7}
        lines={[[{ text: "Your story" }], [{ text: "deserves" }], [{ text: "an audience.", em: true }]]}
        sub="Tell us who you are and who you want to reach. The first conversation is free — and we'll tell you honestly which rooms you're ready for."
        tone="ink"
        reveal="letterbox"
        media={{ kind: "image", src: "/media/stills/portrait.webp" }}
      />
    </main>
  );
}
