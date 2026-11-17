"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ, ScrollTrigger } from "@/lib/gsap";

/**
 * Scrubbed playback: progress drives the playhead across the waveform,
 * lights the bars behind it and "says" the words in time — each word
 * snaps to full ink as the playhead reaches its share of the clip.
 * The giant quotation mark swings in first, like a cue.
 */
export function InterviewSoundbiteMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const words = q<HTMLElement>("[data-ib-word]");
        const bars = q<HTMLElement>("[data-ib-bar]");
        const head = q<HTMLElement>("[data-ib-head]")[0];
        const wave = head.parentElement!;

        gsap.from(q("[data-ib-mark]"), {
          rotate: -24,
          yPercent: 30,
          autoAlpha: 0,
          duration: 1.4,
          ease: "back.out(1.6)",
          scrollTrigger: { trigger: ref.current, start: "top 60%" },
        });
        gsap.from(q("[data-ib-fade]"), {
          y: 24,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 1,
          scrollTrigger: { trigger: ref.current, start: "top 70%" },
        });

        const setWord = words.map((w) => gsap.quickTo(w, "opacity", { duration: 0.25, ease: "power2.out" }));
        let lastBar = -1;

        ScrollTrigger.create({
          trigger: wave,
          start: "top 85%",
          end: "top 30%",
          scrub: true,
          onUpdate: (self) => {
            const p = self.progress;
            gsap.set(head, { x: p * wave.clientWidth });
            const lit = Math.round(p * bars.length);
            if (lit !== lastBar) {
              bars.forEach((b, i) => b.toggleAttribute("data-on", i < lit));
              lastBar = lit;
            }
            words.forEach((_, i) => setWord[i](p * words.length > i + 0.15 ? 1 : 0.16));
          },
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={className} data-svc-tone="signal" data-theme="signal" aria-labelledby="interview-bite-title">
      {children}
    </section>
  );
}
