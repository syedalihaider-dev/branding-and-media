"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { scrollState } from "@/lib/scrollState";

/**
 * Each column is two copies of its frames; a linear tween slides it by
 * half its height forever (seamless loop). Scroll energy multiplies the
 * timeScale, so the feed surges while you scroll and drifts when you stop.
 * Loops pause when the hero is off screen.
 */
export function SocialHeroMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, (ctx) => {
        const loops = q<HTMLElement>("[data-sh-loop]").map((el, i) => {
          const up = i % 2 === 0;
          return gsap.fromTo(
            el,
            { yPercent: up ? 0 : -50 },
            { yPercent: up ? -50 : 0, duration: 46 + i * 7, ease: "none", repeat: -1 },
          );
        });

        const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
        intro
          .from(q("[data-sh-col]"), {
            yPercent: (i: number) => (i % 2 ? -30 : 30),
            autoAlpha: 0,
            duration: 1.8,
            stagger: 0.1,
            ease: "expo.out",
          })
          .from(q("[data-sh-line]"), { yPercent: 112, duration: 1.3, stagger: 0.1 }, 0.3)
          .from(q("[data-sh-fade]"), { autoAlpha: 0, y: 20, duration: 1, stagger: 0.08 }, 0.7);

        let active = true;
        const tick = () => {
          if (!active) return;
          const boost = 1 + scrollState.energy * 9;
          loops.forEach((t) => t.timeScale(t.timeScale() + (boost - t.timeScale()) * 0.08));
        };
        gsap.ticker.add(tick);

        gsap.to(q("[data-sh-wall]"), {
          scale: 1.08,
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            onToggle: (self) => {
              active = self.isActive;
              loops.forEach((t) => (active ? t.resume() : t.pause()));
            },
          },
        });
        gsap.to(q("h1"), {
          yPercent: -30,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
        });

        ctx.add(() => () => gsap.ticker.remove(tick));
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={className} data-svc-tone="ink" data-theme="dark" aria-labelledby="social-hero-title">
      {children}
    </section>
  );
}
