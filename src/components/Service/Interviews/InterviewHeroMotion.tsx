"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ, ScrollTrigger } from "@/lib/gsap";

const FPS = 25;
const tc = (s: number) => {
  const f = Math.floor((s % 1) * FPS);
  const sec = Math.floor(s) % 60;
  const min = Math.floor(s / 60) % 60;
  const hr = Math.floor(s / 3600);
  return [hr, min, sec, f].map((n) => String(n).padStart(2, "0")).join(":");
};

/**
 * - Focus pull: the frame starts soft and over-scaled, then racks sharp.
 * - The viewfinder corners start gathered on the speaker and spring out to
 *   frame the shot; the focus box locks with a small overshoot.
 * - Headline rises from its mask; the lower-third wipes on like broadcast.
 * - Timecode runs only while the hero is on screen.
 * - Scroll: corners push wide (the camera pulls back), the image drifts.
 */
export function InterviewHeroMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const section = ref.current!;
        const corners = q<HTMLElement>("[data-ih-corner]");
        const toCentre = (el: HTMLElement) => {
          const s = section.getBoundingClientRect();
          const r = el.getBoundingClientRect();
          return { x: s.width * 0.42 - (r.left - s.left), y: s.height * 0.38 - (r.top - s.top) };
        };

        const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
        intro
          .fromTo(
            q("[data-ih-media]"),
            { scale: 1.2, filter: "blur(14px)" },
            { scale: 1, filter: "blur(0px)", duration: 2.2, clearProps: "filter" },
            0,
          )
          .from(
            corners,
            {
              x: (_: number, el: HTMLElement) => toCentre(el).x,
              y: (_: number, el: HTMLElement) => toCentre(el).y,
              autoAlpha: 0,
              duration: 1.5,
            },
            0.15,
          )
          .from(q("[data-ih-focus]"), { scale: 1.6, autoAlpha: 0, duration: 0.9, ease: "back.out(2.4)" }, 0.9)
          .from(q("[data-ih-safe]"), { autoAlpha: 0, duration: 1.2, ease: "none" }, 0.6)
          .from(q("[data-ih-line]"), { yPercent: 110, duration: 1.3, stagger: 0.1, ease: "power4.out" }, 0.45)
          .from(q("[data-ih-fade]"), { autoAlpha: 0, y: 16, duration: 0.9, stagger: 0.07 }, 0.8)
          .fromTo(
            q("[data-ih-lower]"),
            { clipPath: "inset(0% 100% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power4.inOut" },
            1.3,
          )
          .from(q("[data-ih-lower] b, [data-ih-lower] span span"), { x: -20, autoAlpha: 0, stagger: 0.08, duration: 0.6 }, 1.75);

        // Timecode — runs while visible.
        const tcEl = q<HTMLElement>("[data-ih-tc]")[0];
        let t0 = performance.now();
        let running = false;
        const tick = () => {
          tcEl.textContent = tc((performance.now() - t0) / 1000);
        };
        const run = (on: boolean) => {
          if (on === running) return;
          running = on;
          if (on) {
            t0 = performance.now() - parseTc(tcEl.textContent ?? "") * 1000;
            gsap.ticker.add(tick);
          } else gsap.ticker.remove(tick);
        };
        const st = ScrollTrigger.create({
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => run(self.isActive),
        });
        run(st.isActive);

        const out = { trigger: section, start: "top top", end: "bottom top", scrub: 0.5 };
        gsap.to(q("[data-ih-media]"), { scale: 1.12, yPercent: 6, ease: "none", scrollTrigger: out });
        gsap.to(q('[data-ih-corner="tl"]'), { x: -40, y: -30, ease: "none", scrollTrigger: out });
        gsap.to(q('[data-ih-corner="tr"]'), { x: 40, y: -30, ease: "none", scrollTrigger: out });
        gsap.to(q('[data-ih-corner="bl"]'), { x: -40, y: 30, ease: "none", scrollTrigger: out });
        gsap.to(q('[data-ih-corner="br"]'), { x: 40, y: 30, ease: "none", scrollTrigger: out });
        gsap.to(q("[data-ih-lower]"), { yPercent: -120, autoAlpha: 0, ease: "none", scrollTrigger: { ...out, end: "40% top" } });

        return () => run(false);
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={className} data-svc-tone="ink" data-theme="dark" aria-labelledby="interview-hero-title">
      {children}
    </section>
  );
}

function parseTc(s: string) {
  const [h, m, sec, f] = s.split(":").map(Number);
  return (h || 0) * 3600 + (m || 0) * 60 + (sec || 0) + (f || 0) / FPS;
}
