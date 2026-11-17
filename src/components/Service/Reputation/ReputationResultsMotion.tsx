"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * The managed page wipes across the neglected one, led by a handle.
 * Desktop: pinned and scrubbed, with a short hold at each end.
 * Narrow: no pin — the wipe scrubs as the panel crosses the viewport.
 * The status in the search field flips once the wipe passes halfway.
 */
export function ReputationResultsMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();

      mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (ctx) => {
        if (!ctx.conditions?.motion) return;
        const desktop = ctx.conditions.desktop;

        gsap.from(q("[data-rr-fade]"), {
          y: 30,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: { trigger: ref.current, start: "top 65%" },
        });
        gsap.from(q("[data-rr-panel]"), {
          y: 80,
          autoAlpha: 0,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: q("[data-rr-panel]")[0], start: "top 85%" },
        });

        const layers = q<HTMLElement>("[data-rr-after]")[0].parentElement!;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: desktop
            ? {
                trigger: ref.current,
                start: "top top",
                end: () => `+=${window.innerHeight * 1.3}`,
                pin: q("[data-rr-pin]")[0],
                scrub: 0.6,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              }
            : { trigger: layers, start: "top 75%", end: "bottom 45%", scrub: 0.6, invalidateOnRefresh: true },
        });

        tl.to({}, { duration: 0.15 })
          .to(q("[data-rr-handle]"), { opacity: 1, duration: 0.05 })
          .to(q("[data-rr-after]"), { clipPath: "inset(0% 0% 0% 0%)", duration: 1 }, "<")
          .to(q("[data-rr-handle]"), { x: () => layers.offsetWidth, duration: 1 }, "<")
          .to(q("[data-rr-before] li"), { opacity: 0.5, stagger: 0.1, duration: 0.4 }, "<")
          .to(q('[data-rr-state="before"]'), { autoAlpha: 0, duration: 0.1 }, "-=0.5")
          .to(q('[data-rr-state="after"]'), { autoAlpha: 1, duration: 0.1 }, "<")
          .to(q("[data-rr-handle]"), { opacity: 0, duration: 0.1 })
          .to({}, { duration: 0.15 });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={className} data-svc-tone="bone" data-theme="light" aria-labelledby="reputation-results-title">
      {children}
    </section>
  );
}
