"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * Counter-scrolling city lines. Rows alternate direction and travel at
 * slightly different speeds, scrubbed to the section's passage through
 * the viewport (transform-only, one tween per row).
 */
export function AboutGlobalMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(ref);

      mm.add(MQ.motion, () => {
        gsap.from(q("header > *"), {
          y: 40,
          autoAlpha: 0,
          duration: 1.1,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: { trigger: ref.current, start: "top 70%" },
        });

        q<HTMLElement>("[data-ag-track]").forEach((track, i) => {
          const dir = i % 2 ? 1 : -1;
          const travel = 22 + i * 6;
          gsap.fromTo(
            track,
            { xPercent: dir === -1 ? 0 : -travel },
            {
              xPercent: dir === -1 ? -travel : 0,
              ease: "none",
              scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 0.5 },
            },
          );
        });

        gsap.from(q("[data-ag-row]"), {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 1.2,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: { trigger: q("[data-ag-row]")[0], start: "top 85%" },
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={className} data-theme="dark" aria-labelledby="global-title">
      {children}
    </section>
  );
}
