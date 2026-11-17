"use client";

import { useRef, type ComponentProps } from "react";
import { gsap, useGSAP, MQ, ScrollTrigger } from "@/lib/gsap";

/**
 * Each item, as it crosses the middle of the screen, becomes "current":
 * the odometer rolls to its number and the item brightens. The spine
 * fills continuously with scroll.
 */
export function ServiceLedgerMotion(props: ComponentProps<"section">) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(ref);
      mm.add(MQ.motion, () => {
        const items = q<HTMLElement>("[data-sl-item]");
        const reel = q<HTMLElement>("[data-sl-reel]")[0];
        const n = items.length;

        gsap.from(q("[data-sl-title] [data-w]"), {
          yPercent: 70,
          autoAlpha: 0,
          duration: 1.1,
          stagger: 0.05,
          ease: "power4.out",
          scrollTrigger: { trigger: ref.current, start: "top 70%" },
        });

        gsap.fromTo(
          q("[data-sl-spine]"),
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: q("ol")[0], start: "top 55%", end: "bottom 55%", scrub: true },
          },
        );

        gsap.set(items, { opacity: 0.28 });
        items.forEach((item, i) => {
          ScrollTrigger.create({
            trigger: item,
            start: "top 55%",
            end: "bottom 55%",
            onToggle: (self) => {
              gsap.to(item, { opacity: self.isActive ? 1 : 0.28, duration: 0.5, overwrite: "auto" });
              if (self.isActive) {
                gsap.to(reel, { yPercent: (-100 / n) * i, duration: 0.9, ease: "expo.out", overwrite: true });
              }
            },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return <section ref={ref} {...props} />;
}
