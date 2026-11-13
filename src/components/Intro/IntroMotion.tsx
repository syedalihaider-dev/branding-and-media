"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP, MQ } from "@/lib/gsap";
import { setHeaderTheme } from "@/components/Header/headerTheme";

/**
 * Intro choreography — one name, four states.
 * Why: instead of describing the process, the visitor watches it happen
 * to a single word. A scribbled idea gets measured (strategy), locked up
 * (brand), then scaled into the world (impact). Each beat lives in one
 * scrubbed timeline so it can be reversed and scrubbed precisely.
 */
export function IntroMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add({ motion: MQ.motion, mobile: MQ.mobile }, (ctx) => {
        if (!ctx.conditions?.motion) return;
        const isMobile = !!ctx.conditions.mobile;
        const q = gsap.utils.selector(ref);
        const pin = q("[data-intro-pin]")[0] as HTMLElement;
        const stages = q("[data-intro-stage]");
        const ticks = q("[data-intro-tick] i");
        const chars = q("[data-intro-char]");

        // Initial states (only when motion is allowed — static layout otherwise)
        gsap.set(stages.slice(1), { autoAlpha: 0, yPercent: 30 });
        gsap.set(q("[data-intro-typeset]"), { autoAlpha: 1 });
        gsap.set(chars, { yPercent: 110 });
        gsap.set(q("[data-intro-mark]"), { scale: 0, autoAlpha: 0 });
        gsap.set(q("[data-intro-meta]"), { autoAlpha: 0, y: 20 });
        gsap.set(q("[data-intro-guides] span"), { scaleX: 0, scaleY: 0 });
        gsap.set(q("[data-intro-note]"), { autoAlpha: 0, y: 12 });
        gsap.set(q("[data-intro-channel]"), { autoAlpha: 0, scale: 0.4 });
        gsap.set(q("[data-intro-scribble]"), { strokeDasharray: 1, strokeDashoffset: 1 });
        gsap.set(q("[data-intro-idea]"), { autoAlpha: 0, y: 30, rotate: -6 });
        gsap.set(ticks, { scaleX: 0 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut", duration: 1 },
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: () => `+=${window.innerHeight * (isMobile ? 3.2 : 4)}`,
            pin,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Header theme follows the stage (bone → ink at the Brand beat).
        const syncTheme = (self: ScrollTrigger) => {
          if (!self.isActive) return;
          setHeaderTheme((tl.scrollTrigger?.progress ?? 0) > 0.47 ? "dark" : "light");
        };
        ScrollTrigger.create({
          trigger: ref.current,
          start: "top 34px",
          end: "bottom 34px",
          onToggle: syncTheme,
          onUpdate: syncTheme,
        });

        const stageSwap = (from: number, to: number, at: number) => {
          tl.to(stages[from], { autoAlpha: 0, yPercent: -30, duration: 0.5 }, at)
            .to(stages[to], { autoAlpha: 1, yPercent: 0, duration: 0.6 }, at + 0.3)
            .to(ticks[to], { scaleX: 1, duration: 0.6 }, at + 0.3);
        };

        // ── 01 Idea ───────────────────────────────────────────
        tl.to(q("[data-intro-idea]"), { autoAlpha: 1, y: 0, rotate: -4, ease: "power3.out" }, 0)
          .to(ticks[0], { scaleX: 1, duration: 0.6 }, 0)
          .to(q("[data-intro-scribble]"), { strokeDashoffset: 0, duration: 0.8 }, 0.4)
          .to({}, { duration: 0.6 });

        // ── 02 Strategy ───────────────────────────────────────
        const s2 = 1.8;
        stageSwap(0, 1, s2);
        tl.to(q("[data-intro-idea]"), { autoAlpha: 0, y: -60, rotate: 0, filter: "blur(6px)", duration: 0.6 }, s2)
          .to(chars, { yPercent: 0, stagger: 0.04, duration: 0.7, ease: "power3.out" }, s2 + 0.3)
          .to(q("[data-intro-guides] span"), { scaleX: 1, scaleY: 1, stagger: 0.08, duration: 0.8 }, s2 + 0.2)
          .to(q("[data-intro-note]"), { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.5 }, s2 + 0.6)
          .to({}, { duration: 0.5 });

        // ── 03 Brand ──────────────────────────────────────────
        const s3 = 3.8;
        stageSwap(1, 2, s3);
        tl.to(q("[data-intro-guides] span"), { scaleX: 0, scaleY: 0, duration: 0.5, stagger: 0.04 }, s3)
          .to(q("[data-intro-note]"), { autoAlpha: 0, y: -12, duration: 0.4, stagger: 0.05 }, s3)
          .to(pin, { backgroundColor: "#0e0d0b", color: "#ede8df", duration: 0.7 }, s3 + 0.1)
          .to(q("[data-intro-mark]"), { scale: 1, autoAlpha: 1, duration: 0.7, ease: "back.out(1.6)" }, s3 + 0.5)
          .to(q("[data-intro-meta]"), { autoAlpha: 1, y: 0, duration: 0.6 }, s3 + 0.7)
          .to({}, { duration: 0.5 });

        // ── 04 Impact ─────────────────────────────────────────
        const s4 = 5.8;
        stageSwap(2, 3, s4);
        tl.to(q("[data-intro-meta]"), { autoAlpha: 0, duration: 0.4 }, s4)
          .to(q("[data-intro-mark]"), { autoAlpha: 0, scale: 0.6, duration: 0.4 }, s4)
          .to(
            q("[data-intro-typeset]"),
            {
              scale: isMobile ? 1 : 1.3,
              // Break out of the column: centre the name on the viewport.
              x: (_i: number, el: HTMLElement) => {
                const r = el.getBoundingClientRect();
                return window.innerWidth / 2 - (r.left + r.width / 2);
              },
              duration: 1.2,
            },
            s4 + 0.1,
          )
          .to(
            q("[data-intro-channel]"),
            { autoAlpha: 1, scale: 1, stagger: { each: 0.1, from: "random" }, duration: 0.6, ease: "back.out(1.4)" },
            s4 + 0.4,
          )
          .to({}, { duration: 0.8 });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={className} data-theme-static="light" aria-labelledby="intro-title">
      {children}
    </section>
  );
}
