"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * Desktop: pinned horizontal track with a progress rule. Each stage's
 * artefact performs its own small action as it arrives:
 * research terms are highlighted, the draft types itself, the old headline
 * is struck through, the counters count up, the published image opens.
 * Narrow: the same actions fire as each stage scrolls into view.
 */
export function BlogLifeMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();

      mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (ctx) => {
        if (!ctx.conditions?.motion) return;
        const stages = q<HTMLElement>("[data-bl-stage]");
        // Text changed outside GSAP's tween system — restored on revert.
        const restore: (() => void)[] = [];

        // Per-stage actions, built paused; triggered on arrival.
        const action = (s: HTMLElement) => {
          const tl = gsap.timeline({ paused: true });
          tl.from(s.querySelector("[data-bl-art]"), { y: 40, rotate: 3, autoAlpha: 0, duration: 0.9, ease: "power3.out" });
          const marks = s.querySelectorAll("[data-bl-mark]");
          if (marks.length) tl.to(marks, { backgroundSize: "100% 70%", duration: 0.5, stagger: 0.25, ease: "power2.inOut" }, 0.4);
          const typed = s.querySelector<HTMLElement>("[data-bl-typed]");
          if (typed) {
            const text = typed.textContent ?? "";
            typed.textContent = "";
            restore.push(() => (typed.textContent = text));
            const o = { n: 0 };
            tl.to(o, { n: text.length, duration: text.length * 0.035, ease: "none", onUpdate: () => (typed.textContent = text.slice(0, Math.round(o.n))) }, 0.4);
          }
          const strike = s.querySelector("[data-bl-strike]");
          if (strike) tl.from(strike, { scaleX: 0, duration: 0.5, ease: "power2.inOut" }, 0.5).from(s.querySelector("[data-bl-new]"), { y: 14, autoAlpha: 0, duration: 0.6 }, 0.9);
          s.querySelectorAll<HTMLElement>("[data-bl-count]").forEach((c) => {
            const was = c.textContent;
            restore.push(() => (c.textContent = was));
            c.textContent = "0";
            const o = { v: 0 };
            tl.to(o, { v: Number(c.dataset.blCount), duration: 1, ease: "power2.out", onUpdate: () => (c.textContent = String(Math.round(o.v))) }, 0.4);
          });
          const img = s.querySelector("[data-bl-img]");
          if (img) tl.from(img, { clipPath: "inset(0% 0% 100% 0%)", duration: 1, ease: "expo.inOut" }, 0.3);
          return tl;
        };

        gsap.from(q("header > *"), {
          y: 40,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: { trigger: ref.current, start: "top 65%" },
        });

        if (!ctx.conditions.desktop) {
          stages.forEach((s) => {
            const tl = action(s);
            gsap.timeline({ scrollTrigger: { trigger: s, start: "top 75%", onEnter: () => tl.play() } });
          });
          return () => restore.forEach((r) => r());
        }

        const track = q<HTMLElement>("[data-bl-track]")[0];
        const distance = () => track.scrollWidth - window.innerWidth;
        const move = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: q("[data-bl-pin]")[0],
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        gsap.fromTo(q("[data-bl-progress]"), { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: ref.current, start: "top top", end: () => `+=${distance()}`, scrub: true } });

        stages.forEach((s) => {
          const tl = action(s);
          gsap.timeline({ scrollTrigger: { trigger: s, containerAnimation: move, start: "left 70%", onEnter: () => tl.play() } });
        });
        return () => restore.forEach((r) => r());
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={className} data-svc-tone="ink" data-theme="dark" aria-labelledby="blog-life-title">
      {children}
    </section>
  );
}
