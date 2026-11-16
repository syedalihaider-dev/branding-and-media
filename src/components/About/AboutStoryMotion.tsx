"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * Who we are — reading choreography.
 * The paragraph is "read in" by the scroll: words fill from ghosted to
 * solid at reading pace. The portrait drifts against the text (parallax)
 * and the three eras draw their rules left to right, like a timeline.
 */
export function AboutStoryMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(ref);

      mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (ctx) => {
        if (!ctx.conditions?.motion) return;
        const desktop = !!ctx.conditions.desktop;

        gsap.from(q("[data-as-line] > span"), {
          yPercent: 110,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: { trigger: q("[data-as-line]")[0], start: "top 85%" },
        });

        const words = q("[data-word]");
        gsap.fromTo(
          words,
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.05,
            scrollTrigger: {
              trigger: words[0]?.closest("p") ?? ref.current,
              start: desktop ? "top 75%" : "top 85%",
              end: desktop ? "bottom 45%" : "bottom 60%",
              scrub: true,
            },
          },
        );

        // Portrait: clip open, then drift.
        const figure = q("[data-as-figure]")[0];
        gsap.fromTo(
          figure,
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.4,
            ease: "expo.inOut",
            scrollTrigger: { trigger: figure, start: "top 80%" },
          },
        );
        gsap.fromTo(
          q("[data-as-img]"),
          { yPercent: -8, scale: 1.18 },
          {
            yPercent: 8,
            scale: 1.05,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );

        const eras = q("[data-as-era]");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: eras[0]?.parentElement ?? ref.current, start: "top 80%" },
        });
        tl.from(q("[data-as-rule]"), {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.1,
          stagger: 0.18,
          ease: "power3.inOut",
        }).from(
          eras.flatMap((e) => Array.from(e.children).slice(1)),
          { y: 26, autoAlpha: 0, duration: 0.9, stagger: 0.06, ease: "power3.out" },
          0.25,
        );
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={className} data-theme="light" aria-labelledby="story-title">
      {children}
    </section>
  );
}
