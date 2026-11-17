"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * - Headline lines cut in from opposite sides with a skew that snaps
 *   straight (speed, then control).
 * - Reticle: fine pointers drive it (quickTo — lagged, smooth); touch gets
 *   a scripted sweep that locks onto the runner.
 * - Scroll: the frame pushes in on the target; lines split apart.
 */
export function PaidHeroMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();

      mm.add({ motion: MQ.motion, fine: "(pointer: fine)" }, (ctx) => {
        if (!ctx.conditions?.motion) return;
        const section = ref.current!;
        const reticle = q<HTMLElement>("[data-ph-reticle]")[0];
        const coords = q<HTMLElement>("[data-ph-coords]")[0];

        const intro = gsap.timeline();
        intro
          .from(q('[data-ph-row="1"] [data-ph-line]'), {
            xPercent: -60,
            skewX: 24,
            autoAlpha: 0,
            duration: 1.1,
            ease: "expo.out",
          })
          .from(
            q('[data-ph-row="2"] [data-ph-line]'),
            { xPercent: 60, skewX: -24, autoAlpha: 0, duration: 1.1, ease: "expo.out" },
            0.12,
          )
          .from(q("[data-ph-media]"), { scale: 1.25, duration: 2, ease: "expo.out" }, 0)
          .from(q("[data-ph-fade]"), { autoAlpha: 0, y: 18, duration: 0.9, stagger: 0.07 }, 0.5)
          .from(reticle, { scale: 2.4, autoAlpha: 0, duration: 0.9, ease: "expo.out" }, 0.6);

        const setCoords = (x: number, y: number) => {
          coords.textContent = `x ${x.toFixed(2)} · y ${y.toFixed(2)}`;
        };
        const xTo = gsap.quickTo(reticle, "left", { duration: 0.6, ease: "power3.out" });
        const yTo = gsap.quickTo(reticle, "top", { duration: 0.6, ease: "power3.out" });

        if (ctx.conditions.fine) {
          const onMove = (e: PointerEvent) => {
            const r = section.getBoundingClientRect();
            if (e.clientY < r.top || e.clientY > r.bottom) return;
            const x = e.clientX - r.left;
            const y = e.clientY - r.top;
            xTo(x);
            yTo(y);
            setCoords(x / r.width, y / r.height);
          };
          window.addEventListener("pointermove", onMove, { passive: true });
          ctx.add(() => () => window.removeEventListener("pointermove", onMove));
        } else {
          // Sweep, then lock on.
          const pts = [
            [0.3, 0.35],
            [0.75, 0.62],
            [0.68, 0.3],
          ];
          const sweep = gsap.timeline({ delay: 1.2, repeat: -1, repeatDelay: 2.5 });
          pts.forEach(([px, py]) =>
            sweep.to(reticle, {
              left: () => section.clientWidth * px,
              top: () => section.clientHeight * py,
              duration: 1.1,
              ease: "power3.inOut",
              onComplete: () => setCoords(px, py),
            }),
          );
        }

        const out = { trigger: section, start: "top top", end: "bottom top", scrub: 0.5 };
        gsap.to(q("[data-ph-media]"), { scale: 1.18, ease: "none", scrollTrigger: out });
        gsap.to(q('[data-ph-row="1"]'), { xPercent: -14, ease: "none", scrollTrigger: out });
        gsap.to(q('[data-ph-row="2"]'), { xPercent: 10, ease: "none", scrollTrigger: out });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={className} data-svc-tone="ink" data-theme="dark" aria-labelledby="paid-hero-title">
      {children}
    </section>
  );
}
