"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/** Your slot at each stage: start, after technical, after content, after authority. */
const STAGES = [7, 4, 2, 0];

/**
 * Rows are absolutely stacked and moved by `--slot` → y. Each stage
 * recomputes every competitor's slot (they step down once you pass them),
 * lights the matching pillar and rolls the position counter.
 */
export function SeoClimbMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();

      mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (ctx) => {
        if (!ctx.conditions?.motion) {
          // Static: the climb is shown complete (see CSS) — match the counter.
          const pos = q<HTMLElement>("[data-sc-pos]")[0];
          if (pos) pos.textContent = "01";
          return;
        }
        const you = q<HTMLElement>("[data-sc-you]")[0];
        const rows = q<HTMLElement>("[data-sc-row]");
        const pillars = q<HTMLElement>("[data-pillar]");
        const pos = q<HTMLElement>("[data-sc-pos]")[0];
        const counter = { v: STAGES[0] + 1 };

        gsap.set(pillars, { opacity: 0.25 });

        const tl = gsap.timeline({
          defaults: { duration: 1, ease: "power3.inOut" },
          scrollTrigger: ctx.conditions.desktop
            ? {
                trigger: ref.current,
                start: "top top",
                end: () => `+=${window.innerHeight * 2}`,
                pin: q("[data-sc-pin]")[0],
                scrub: 0.6,
                anticipatePin: 1,
              }
            : { trigger: q("[data-sc-results]")[0], start: "top 75%", end: "bottom 25%", scrub: 0.6 },
        });

        tl.to({}, { duration: 0.4 });
        STAGES.slice(1).forEach((slot, s) => {
          const at = tl.duration();
          tl.to(you, { "--slot": slot }, at);
          rows.forEach((row, i) => tl.to(row, { "--slot": i < slot ? i : i + 1 }, at));
          tl.to(
            counter,
            {
              v: slot + 1,
              onUpdate: () => void (pos.textContent = String(Math.round(counter.v)).padStart(2, "0")),
            },
            at,
          );
          tl.to(pillars, { opacity: (i: number) => (i === s ? 1 : i < s ? 0.45 : 0.25), duration: 0.5 }, at);
          tl.to({}, { duration: 0.5 });
        });
        tl.to(you, { "--glow": 1, duration: 0.4 });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className={className}
      data-svc-tone="paper"
      data-theme="light"
      aria-labelledby="seo-climb-title"
    >
      {children}
    </section>
  );
}
