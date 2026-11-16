"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * Closing — the house lights come up. A signal field rises from the
 * bottom edge (scrubbed circle clip) before the line lands.
 */
export function AboutCloseMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(ref);

      mm.add(MQ.motion, () => {
        gsap.fromTo(
          q("[data-ac-field]"),
          { clipPath: "circle(0% at 50% 100%)" },
          {
            clipPath: "circle(145% at 50% 100%)",
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top bottom", end: "top 10%", scrub: 0.5 },
          },
        );
        gsap.from(q("[data-ac-line] > span"), {
          yPercent: 115,
          duration: 1.3,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: { trigger: ref.current, start: "top 35%" },
        });
        gsap.from(q("[data-ac-fade]"), {
          y: 30,
          autoAlpha: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 25%" },
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={className} data-theme="signal" aria-labelledby="close-title">
      {children}
    </section>
  );
}
