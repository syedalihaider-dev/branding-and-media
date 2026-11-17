"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * - Type is "set": each letter drops into its line from above in a
 *   slightly irregular order, like a compositor working along the stick.
 * - Rules draw left to right; the column rule drops; the photograph is
 *   developed from black (exposure) while it opens from the top.
 * - Scroll: the sheet tilts back about its foot and recedes — the paper
 *   laid down on the desk — while the photo drifts inside its frame.
 */
export function PublicationsHeroMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();

      mm.add({ motion: MQ.motion, mobile: MQ.mobile }, (ctx) => {
        if (!ctx.conditions?.motion) return;
        const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
        intro
          .from(q("[data-pb-rule]"), { scaleX: 0, duration: 1.4, stagger: 0.15, ease: "expo.inOut" }, 0)
          .from(
            q("[data-pb-ch]"),
            {
              yPercent: -110,
              duration: 0.9,
              stagger: { each: 0.035, from: "start", ease: "power1.in" },
              ease: "power3.out",
            },
            0.35,
          )
          .fromTo(
            q("[data-pb-photo]"),
            { clipPath: "inset(0% 0% 100% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" },
            0.6,
          )
          .from(q("[data-pb-img] img"), { filter: "grayscale(1) contrast(1.2) brightness(0)", duration: 2, ease: "power2.out" }, 0.9)
          .from(q("[data-pb-col]"), { scaleY: 0, duration: 1.2, ease: "expo.inOut" }, 0.8)
          .from(q("[data-pb-fade]"), { y: 18, autoAlpha: 0, duration: 1, stagger: 0.08 }, 0.9);

        if (ctx.conditions.mobile) return;

        const out = { trigger: ref.current, start: "top top", end: "bottom top", scrub: 0.6 };
        gsap.to(q("[data-pb-sheet]"), { rotationX: 24, scale: 0.86, yPercent: 8, ease: "none", scrollTrigger: out });
        gsap.fromTo(q("[data-pb-img]"), { yPercent: -5 }, { yPercent: 8, ease: "none", scrollTrigger: out });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={className} data-svc-tone="paper" data-theme="light" aria-labelledby="publications-hero-title">
      {children}
    </section>
  );
}
