"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * - The boards (already closed in CSS) swing open about their outer edges,
 *   the right a beat after the left, then fall away entirely.
 * - Behind them the pages settle from a slight push-in; the title rises.
 * - Scroll: the camera leans into the pages; the title lifts away.
 */
export function BookHeroMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({ delay: 0.25 });
        tl.to(q('[data-bh-board="left"]'), { rotationY: -118, duration: 1.9, ease: "power3.inOut" }, 0)
          .to(q('[data-bh-board="right"]'), { rotationY: 118, duration: 1.9, ease: "power3.inOut" }, 0.12)
          .to(q("[data-bh-board]"), { autoAlpha: 0, duration: 0.4 }, 1.55)
          .set(q("[data-bh-cover]"), { display: "none" })
          .from(q("[data-bh-media]"), { scale: 1.18, duration: 2.6, ease: "expo.out" }, 0.3)
          .from(q("[data-bh-line]"), { yPercent: 110, duration: 1.4, stagger: 0.12, ease: "power4.out" }, 1)
          .from(q("[data-bh-fade]"), { autoAlpha: 0, y: 16, duration: 1, stagger: 0.08 }, 1.3);

        const out = { trigger: ref.current, start: "top top", end: "bottom top", scrub: 0.6 };
        gsap.to(q("[data-bh-media]"), { scale: 1.14, yPercent: 8, ease: "none", scrollTrigger: out });
        gsap.to(q("#book-hero-title"), { yPercent: -14, ease: "none", scrollTrigger: out });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={className} data-svc-tone="ink" data-theme="dark" aria-labelledby="book-hero-title">
      {children}
    </section>
  );
}
