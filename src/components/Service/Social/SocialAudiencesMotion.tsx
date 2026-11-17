"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * Halves arrive from opposite edges (scrubbed); the pinned-post frames
 * rotate in from a tilt like something just stuck to a board.
 */
export function SocialAudiencesMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();
      mm.add({ motion: MQ.motion, wide: "(min-width: 900px)" }, (ctx) => {
        if (!ctx.conditions?.motion) return;
        const halves = q<HTMLElement>("[data-sa-half]");
        const scrub = { trigger: ref.current, start: "top bottom", end: "top 15%", scrub: 0.6 };

        if (ctx.conditions.wide) {
          gsap.from(halves[0], { xPercent: -45, ease: "none", scrollTrigger: scrub });
          gsap.from(halves[1], { xPercent: 45, ease: "none", scrollTrigger: scrub });
        } else {
          halves.forEach((h) =>
            gsap.from(h, { clipPath: "inset(0 0 100% 0)", ease: "none", scrollTrigger: { ...scrub, trigger: h } }),
          );
        }

        q<HTMLElement>("[data-sa-post]").forEach((post, i) => {
          gsap.from(post, {
            rotate: i ? 14 : -14,
            yPercent: 30,
            scale: 0.8,
            ease: "back.out(1.2)",
            duration: 1.3,
            scrollTrigger: { trigger: post, start: "top 85%" },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={className} data-theme="light" aria-labelledby="social-audiences-title">
      {children}
    </section>
  );
}
