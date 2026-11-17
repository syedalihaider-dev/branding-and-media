"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ, ScrollTrigger } from "@/lib/gsap";

/**
 * Desktop: pinned. The proof slides up and straightens; then scroll marks
 * up one part at a time — the rest of the page dims, the matching margin
 * note lights. Snaps to each mark.
 * Narrow: the proof settles from a tilt, notes stagger in.
 */
export function PublicationsAnatomyMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();

      mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (ctx) => {
        if (!ctx.conditions?.motion) return;

        gsap.from(q("header > *"), {
          y: 30,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: { trigger: ref.current, start: "top 65%" },
        });
        gsap.from(q("[data-pa-sheet]"), {
          y: 140,
          rotate: 6,
          autoAlpha: 0,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 55%" },
        });

        if (!ctx.conditions.desktop) {
          gsap.from(q("[data-pa-note]"), {
            y: 30,
            autoAlpha: 0,
            stagger: 0.1,
            duration: 0.9,
            scrollTrigger: { trigger: q("[data-pa-note]")[0], start: "top 85%" },
          });
          return;
        }

        const parts = q<HTMLElement>("[data-pa-part]");
        const notes = q<HTMLElement>("[data-pa-note]");
        const n = parts.length;
        const setPart = parts.map((p) => gsap.quickTo(p, "opacity", { duration: 0.35, ease: "power2.out" }));
        const setNote = notes.map((p) => gsap.quickTo(p, "opacity", { duration: 0.35, ease: "power2.out" }));
        let current = -2;

        const activate = (a: number) => {
          if (a === current) return;
          current = a;
          parts.forEach((p, i) => {
            p.toggleAttribute("data-active", i === a);
            setPart[i](a < 0 || i === a ? 1 : 0.22);
          });
          notes.forEach((_, i) => setNote[i](a < 0 || i === a ? 1 : 0.28));
        };

        ScrollTrigger.create({
          trigger: ref.current,
          start: "top top",
          end: () => `+=${window.innerHeight * n * 0.6}`,
          pin: q("[data-pa-pin]")[0],
          anticipatePin: 1,
          snap: { snapTo: (v) => (Math.round(v * n - 0.5) + 0.5) / n, duration: { min: 0.2, max: 0.5 } },
          onUpdate: (self) => activate(Math.min(n - 1, Math.floor(self.progress * n))),
          onLeaveBack: () => activate(-1),
        });
        activate(-1);
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={className} data-svc-tone="ink-2" data-theme="dark" aria-labelledby="publications-anatomy-title">
      {children}
    </section>
  );
}
