"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * Stacked-sheet choreography. Panels are CSS-sticky (works without JS);
 * motion adds depth: the outgoing sheet sinks back and dims while the
 * incoming numeral swings up out of the page in 3D.
 */
export function AboutApproachMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(ref);

      mm.add(MQ.motion, () => {
        const panels = q<HTMLElement>("[data-ap-panel]");

        gsap.from(q("header > *"), {
          y: 40,
          autoAlpha: 0,
          duration: 1.1,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: { trigger: ref.current, start: "top 70%" },
        });

        panels.forEach((panel, i) => {
          const enter = { trigger: panel, start: "top bottom", end: "top top", scrub: 0.6 };

          // Numeral rises from the page like a hinged plate.
          gsap.fromTo(
            panel.querySelector("[data-ap-num]"),
            { rotationX: -75, yPercent: 35, transformPerspective: 1400, transformOrigin: "50% 100%" },
            { rotationX: 0, yPercent: 0, ease: "none", scrollTrigger: enter },
          );
          gsap.from(panel.querySelectorAll("[data-ap-title], [data-ap-body]"), {
            y: 60,
            autoAlpha: 0,
            stagger: 0.08,
            duration: 1.1,
            ease: "power4.out",
            scrollTrigger: { trigger: panel, start: "top 45%", toggleActions: "play none none reverse" },
          });

          // The previous sheet recedes as this one covers it.
          const prev = panels[i - 1];
          if (prev) {
            gsap.to(prev.querySelector("[data-ap-inner]"), {
              scale: 0.9,
              yPercent: -4,
              ease: "none",
              scrollTrigger: enter,
            });
            gsap.to(prev.querySelector("[data-ap-dim]"), { opacity: 0.7, ease: "none", scrollTrigger: enter });
          }
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={className} aria-labelledby="approach-steps-title">
      {children}
    </section>
  );
}
