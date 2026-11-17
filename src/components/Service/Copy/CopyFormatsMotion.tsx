"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * Desktop: pin and translate the track; each word's ink (--fill) is
 * scrubbed from 0 to 100% as its panel crosses the viewport, and the word
 * drifts against the track for depth. Narrow: each word fills as it scrolls
 * through the screen.
 */
export function CopyFormatsMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();

      mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (ctx) => {
        if (!ctx.conditions?.motion) return;
        const panels = q<HTMLElement>("[data-cf-panel]");

        gsap.from(q("header > *"), {
          y: 40,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: { trigger: ref.current, start: "top 65%" },
        });

        if (!ctx.conditions.desktop) {
          panels.forEach((p) =>
            gsap.fromTo(
              p,
              { "--fill": "0%" },
              { "--fill": "100%", ease: "none", scrollTrigger: { trigger: p, start: "top 80%", end: "center 40%", scrub: true } },
            ),
          );
          return;
        }

        const track = q<HTMLElement>("[data-cf-track]")[0];
        const distance = () => track.scrollWidth - window.innerWidth;
        const move = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: q("[data-cf-pin]")[0],
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        panels.forEach((p) => {
          const st = { trigger: p, containerAnimation: move, scrub: true };
          gsap.fromTo(p, { "--fill": "0%" }, { "--fill": "100%", ease: "none", scrollTrigger: { ...st, start: "left 85%", end: "center 45%" } });
          gsap.fromTo(p.querySelector("[data-cf-word]"), { xPercent: 12 }, { xPercent: -8, ease: "none", scrollTrigger: { ...st, start: "left right", end: "right left" } });
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={className} data-svc-tone="ink" data-theme="dark" aria-labelledby="copy-formats-title">
      {children}
    </section>
  );
}
