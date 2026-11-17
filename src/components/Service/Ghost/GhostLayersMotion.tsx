"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * Desktop: pinned.
 *  1. The stack lies flat in perspective, sheets almost touching.
 *  2. The layers separate in depth — conversation, structure, manuscript —
 *     each label lighting as its layer lifts.
 *  3. The stack turns to face you; the lower layers fall away and the
 *     manuscript settles front and centre.
 * Narrow: the fanned sheets deal in one after another.
 */
export function GhostLayersMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();

      mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (ctx) => {
        if (!ctx.conditions?.motion) return;
        const sheets = q<HTMLElement>("[data-gl-sheet]");
        const labels = q<HTMLElement>("[data-gl-label]");

        if (!ctx.conditions.desktop) {
          // Clip + fade only: the fan is set with CSS translate/rotate.
          gsap.from(sheets, {
            clipPath: "inset(0% 0% 100% 0%)",
            autoAlpha: 0,
            stagger: 0.18,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: q("[data-gl-stack]")[0], start: "top 80%" },
          });
          return;
        }

        const stack = q<HTMLElement>("[data-gl-stack]")[0];
        gsap.set(stack, { xPercent: -50, yPercent: -50, rotationX: 58, rotationZ: -32 });
        sheets.forEach((s, i) => gsap.set(s, { z: i * 6 }));

        const light = (a: number) => labels.forEach((l, i) => l.toggleAttribute("data-dim", i !== a));
        light(0);

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: () => `+=${window.innerHeight * 2.6}`,
            pin: q("[data-gl-pin]")[0],
            scrub: 0.8,
            anticipatePin: 1,
            onUpdate: (self) => light(Math.min(2, Math.floor(self.progress * 3))),
          },
        });

        tl.from(stack, { y: 120, autoAlpha: 0, duration: 0.5 }, 0)
          .to(sheets[1], { z: 150, duration: 1 }, 0.4)
          .to(sheets[2], { z: 300, duration: 1.4 }, 0.4)
          .to(stack, { rotationX: 0, rotationZ: 0, duration: 1.2 }, 1.7)
          .to(sheets[0], { z: -260, x: -90, autoAlpha: 0, duration: 1 }, 1.8)
          .to(sheets[1], { z: -120, x: 70, autoAlpha: 0, duration: 1 }, 1.9)
          .to(sheets[2], { z: 0, duration: 1.1 }, 1.8)
          .to({}, { duration: 0.3 });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={className} data-svc-tone="ink-2" data-theme="dark" aria-labelledby="ghost-layers-title">
      {children}
    </section>
  );
}
