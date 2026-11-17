"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * Title words rise; the column rules draw down; each story's top rule
 * draws in as it arrives. Wide screens: the three columns drift at
 * different rates (outer columns slower, middle quicker) — layered
 * newsprint sliding into register.
 */
export function PublicationsColumnsMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();

      mm.add({ motion: MQ.motion, wide: "(min-width: 900px)" }, (ctx) => {
        if (!ctx.conditions?.motion) return;

        gsap.from(q("[data-pc-title], header p"), {
          y: 50,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: { trigger: ref.current, start: "top 70%" },
        });

        q<HTMLElement>("[data-pc-story]").forEach((s) => {
          gsap.from(s.children, {
            y: 30,
            autoAlpha: 0,
            stagger: 0.07,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: s, start: "top 85%" },
          });
        });

        if (!ctx.conditions.wide) return;

        gsap.from(q("[data-pc-rule]"), {
          scaleY: 0,
          duration: 1.8,
          stagger: 0.2,
          ease: "expo.inOut",
          scrollTrigger: { trigger: q("[data-pc-col]")[0], start: "top 80%" },
        });

        const drift = [40, -70, 10];
        q<HTMLElement>("[data-pc-col]").forEach((col, i) => {
          gsap.fromTo(
            col,
            { y: drift[i] },
            {
              y: -drift[i],
              ease: "none",
              scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={className} data-svc-tone="paper" data-theme="light" aria-labelledby="publications-columns-title">
      {children}
    </section>
  );
}
