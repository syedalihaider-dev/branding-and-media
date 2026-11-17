"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * - Search line: types a query, holds, deletes, types the next (loop).
 *   Writes textContent directly — no React renders.
 * - Headline: characters resolve from wide to condensed (wdth 125 → 70).
 * - Scroll: the lens magnifies and drifts; "Be the" stretches back out
 *   as the page moves on — the type keeps evolving with you.
 */
export function SeoHeroMotion({
  children,
  className,
  queries,
}: {
  children: ReactNode;
  className?: string;
  queries: string[];
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
        intro
          .from(q("[data-sh-line]"), { yPercent: 112, duration: 1.4, stagger: 0.12 }, 0.15)
          .fromTo(
            q("[data-sh-ch]"),
            { fontVariationSettings: '"wdth" 125' },
            { fontVariationSettings: '"wdth" 70', duration: 1.8, stagger: 0.05, ease: "expo.out" },
            0.2,
          )
          .from(q("[data-sh-fade]"), { autoAlpha: 0, y: 20, duration: 1, stagger: 0.08 }, 0.5)
          .fromTo(
            q("[data-sh-lens]"),
            { clipPath: "circle(0% at 50% 50%)" },
            { clipPath: "circle(50% at 50% 50%)", duration: 1.6, ease: "expo.out" },
            0.4,
          )
          .from(q("[data-sh-lens-img]"), { scale: 1.6, duration: 2.2, ease: "expo.out" }, 0.4);

        // Typing loop
        const el = q<HTMLElement>("[data-sh-query]")[0];
        const typer = { n: 0 };
        const loop = gsap.timeline({ repeat: -1, delay: 1.6 });
        queries.forEach((text, i) => {
          const next = queries[(i + 1) % queries.length];
          loop
            .to({}, { duration: 2.2 })
            .fromTo(
              typer,
              { n: text.length },
              {
                n: 0,
                duration: text.length * 0.025,
                ease: "none",
                immediateRender: false,
                onUpdate: () => void (el.textContent = text.slice(0, Math.round(typer.n))),
              },
            )
            .fromTo(
              typer,
              { n: 0 },
              {
                n: next.length,
                duration: next.length * 0.055,
                ease: "none",
                immediateRender: false,
                onUpdate: () => void (el.textContent = next.slice(0, Math.round(typer.n))),
              },
            );
        });

        // Scroll: magnify + stretch
        const out = { trigger: ref.current, start: "top top", end: "bottom top", scrub: 0.6 };
        gsap.to(q("[data-sh-lens]"), { scale: 1.35, yPercent: 18, ease: "none", scrollTrigger: out });
        gsap.to(q("[data-sh-lens-img]"), { rotate: 12, ease: "none", scrollTrigger: out });
        gsap.to(q("[data-sh-ch]"), {
          fontVariationSettings: '"wdth" 112',
          stagger: 0.02,
          ease: "none",
          scrollTrigger: out,
        });
        gsap.to(q(".accent[data-sh-line]"), { xPercent: -8, ease: "none", scrollTrigger: out });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={className} data-svc-tone="bone" data-theme="light" aria-labelledby="seo-hero-title">
      {children}
    </section>
  );
}
