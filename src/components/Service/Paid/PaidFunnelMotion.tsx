"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/** Edge widths (as % of the shape) from the top of band 0 to the bottom of the last band. */
const EDGES = [100, 80, 62, 46, 32];

const trapezoid = (top: number, bottom: number) => {
  const a = (100 - top) / 2;
  const b = (100 - bottom) / 2;
  return `polygon(${a}% 0%, ${100 - a}% 0%, ${100 - b}% 100%, ${b}% 100%)`;
};

/**
 * Phase 1: rectangles narrow into the funnel (polygon tween, same vertex
 * count both ends). Phase 2: stages light one at a time; notes follow.
 */
export function PaidFunnelMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();

      mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (ctx) => {
        if (!ctx.conditions?.motion) return;
        const bands = q<HTMLElement>("[data-pf-band]");
        const notes = q<HTMLElement>("[data-pf-note]");

        gsap.set(bands, { clipPath: trapezoid(100, 100) });
        gsap.set(notes, { opacity: 0.3 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: ctx.conditions.desktop
            ? {
                trigger: ref.current,
                start: "top top",
                end: () => `+=${window.innerHeight * 2}`,
                pin: q("[data-pf-pin]")[0],
                scrub: 0.6,
                anticipatePin: 1,
              }
            : { trigger: ref.current, start: "top 60%", end: "bottom 60%", scrub: 0.6 },
        });

        // Narrow screens keep the funnel wider so stage names never clip.
        const edges = ctx.conditions.desktop ? EDGES : EDGES.map((e) => 100 - (100 - e) * 0.55);
        bands.forEach((b, i) => tl.to(b, { clipPath: trapezoid(edges[i], edges[i + 1]), duration: 1 }, 0));
        bands.forEach((b, i) => {
          const at = 1 + i * 0.8;
          tl.to(b, { "--lit": 1, duration: 0.4 }, at).to(notes[i], { opacity: 1, duration: 0.3 }, at);
          if (i > 0) tl.to(notes[i - 1], { opacity: 0.45, duration: 0.3 }, at);
        });
        tl.to({}, { duration: 0.4 });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={className} data-svc-tone="ink" data-theme="dark" aria-labelledby="paid-funnel-title">
      {children}
    </section>
  );
}
