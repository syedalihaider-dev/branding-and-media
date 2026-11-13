"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP, MQ } from "@/lib/gsap";
import { scrollState } from "@/lib/scrollState";

/**
 * Clients — momentum and attention.
 * Why: press names stream past like a news ticker that reacts to how fast
 * you move (fame is momentum); the client wall "lights up" name by name
 * as you read it; testimonials resolve word by word so they're read, not
 * skimmed.
 */
export function ClientsMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(ref);

      mm.add(MQ.motion, () => {
        // ── Velocity marquee — one ticker callback for both rows ──
        const rows = q<HTMLElement>("[data-marquee]").map((row) => {
          const inner = row.querySelector<HTMLElement>("[data-marquee-inner]")!;
          return {
            inner,
            dir: Number(row.dataset.marquee),
            x: 0,
            setX: gsap.quickSetter(inner, "xPercent"),
            setSkew: gsap.quickSetter(inner, "skewX", "deg"),
          };
        });
        const wrap = gsap.utils.wrap(-50, 0);
        let skew = 0;
        const tick = (_t: number, dt: number) => {
          const v = scrollState.velocity;
          const speed = 0.012 + Math.min(Math.abs(v) * 0.004, 0.25);
          const sign = v < -0.5 ? -1 : 1;
          skew += (Math.max(-8, Math.min(8, v * -0.25)) - skew) * 0.1;
          rows.forEach((r) => {
            r.x = wrap(r.x - speed * r.dir * sign * (dt / 16.67));
            r.setX(r.x);
            r.setSkew(skew);
          });
        };
        // Only run while the section is on screen.
        ScrollTrigger.create({
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? gsap.ticker.add(tick) : gsap.ticker.remove(tick)),
        });

        // ── Client wall: names light up in reading order ──
        gsap.fromTo(
          q("[data-wall-item]"),
          { opacity: 0.16 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { trigger: q("[data-wall]")[0], start: "top 80%", end: "bottom 45%", scrub: true },
          },
        );

        // ── Testimonials: words resolve as they cross the reading line ──
        q<HTMLElement>("[data-quote]").forEach((quote) => {
          gsap.fromTo(
            quote.querySelectorAll("[data-word]"),
            { opacity: 0.14 },
            {
              opacity: 1,
              stagger: 0.05,
              ease: "none",
              scrollTrigger: { trigger: quote, start: "top 78%", end: "bottom 55%", scrub: true },
            },
          );
        });

        return () => gsap.ticker.remove(tick);
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={className} data-theme="light" aria-labelledby="clients-title">
      {children}
    </section>
  );
}
