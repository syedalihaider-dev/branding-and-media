"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * Pinned; each segment turns one leaf (--turn 0 → -180deg about the
 * spine) with a slight lift mid-turn (--lift) so it arcs like paper.
 * The final leaf (epilogue) stays — the story ends on it. Snaps to pages.
 */
export function KindleStoryMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();

      mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (ctx) => {
        if (!ctx.conditions?.motion) return;

        gsap.from(q("header > *"), {
          y: 36,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: { trigger: ref.current, start: "top 70%" },
        });

        if (!ctx.conditions.desktop) {
          q<HTMLElement>("[data-ks-leaf]").forEach((leaf, i) =>
            gsap.from(leaf, {
              rotate: i % 2 ? 2.5 : -2.5,
              y: 60,
              autoAlpha: 0,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: { trigger: leaf, start: "top 88%" },
            }),
          );
          return;
        }

        gsap.from(q("[data-ks-spread]"), {
          rotationX: 40,
          y: 120,
          autoAlpha: 0,
          transformPerspective: 2000,
          duration: 1.6,
          ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 60%" },
        });

        const leaves = q<HTMLElement>("[data-ks-leaf]").slice(0, -1);
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: () => `+=${window.innerHeight * leaves.length * 0.75}`,
            pin: q("[data-ks-pin]")[0],
            scrub: 0.7,
            snap: { snapTo: 1 / leaves.length, duration: { min: 0.25, max: 0.7 }, ease: "power2.inOut" },
            anticipatePin: 1,
          },
        });
        leaves.forEach((leaf, i) => {
          tl.to(leaf, { "--turn": "-180deg", duration: 1 }, i)
            .to(leaf, { "--lift": 1, duration: 0.5, ease: "sine.out" }, i)
            .to(leaf, { "--lift": 0, duration: 0.5, ease: "sine.in" }, i + 0.5);
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className={className}
      data-svc-tone="oxblood"
      data-theme="dark"
      aria-labelledby="kindle-story-title"
    >
      {children}
    </section>
  );
}
