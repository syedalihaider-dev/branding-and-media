"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * - The photograph surfaces from black; each line is "inked" — a soft mask
 *   sweeps through it, line after line, as if the words were being written.
 * - The ghost line breathes in as an outline; the signature line draws and
 *   "You." is set.
 * - Scroll: the ghost line dissolves — blur, spacing, gone — while the rest
 *   of the headline stays put. Our part disappears; yours remains.
 */
export function GhostHeroMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const tl = gsap.timeline();
        tl.from(q("[data-gh-media]"), { autoAlpha: 0, scale: 1.08, duration: 2.6, ease: "power2.out" }, 0)
          .fromTo(q("[data-gh-ink]"), { "--m": "0%" }, { "--m": "130%", duration: 1.8, stagger: 0.55, ease: "power2.inOut" }, 0.4)
          .fromTo(q("[data-gh-ghost]"), { "--m": "0%" }, { "--m": "130%", duration: 2.2, ease: "sine.inOut" }, 1.4)
          .from(q("[data-gh-ghost-in]"), { autoAlpha: 0, duration: 1.6, ease: "sine.inOut" }, 1.4)
          .from(q("[data-gh-fade]"), { autoAlpha: 0, y: 14, duration: 1, stagger: 0.1 }, 1.6)
          .from(q("[data-gh-signline]"), { scaleX: 0, duration: 1, ease: "expo.inOut" }, 2.2)
          .from(q("[data-gh-sign]"), { autoAlpha: 0, x: -14, filter: "blur(6px)", duration: 1, clearProps: "filter" }, 2.8);

        const out = { trigger: ref.current, start: "top top", end: "70% top", scrub: 0.6 };
        gsap.to(q("[data-gh-ghost]"), { filter: "blur(14px)", letterSpacing: "0.12em", opacity: 0, ease: "none", scrollTrigger: out });
        gsap.to(q("[data-gh-media] img"), { scale: 1.12, yPercent: 6, ease: "none", scrollTrigger: { ...out, end: "bottom top" } });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={className} data-svc-tone="ink" data-theme="dark" aria-labelledby="ghost-hero-title">
      {children}
    </section>
  );
}
