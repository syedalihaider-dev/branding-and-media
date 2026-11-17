"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * One timeline, one segment per step: the ring rotates -360/N, labels
 * counter-rotate to stay upright, the arc fills, and the centre text
 * crossfades. Snaps to steps so it always rests on a readable stage.
 */
export function SocialLoopMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();

      mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (ctx) => {
        if (!ctx.conditions?.motion) return;
        gsap.from(q("header > *"), {
          y: 40,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: { trigger: ref.current, start: "top 70%" },
        });
        if (!ctx.conditions.desktop) return;

        const steps = q<HTMLElement>("[data-sl-step]");
        const labels = q<HTMLElement>("[data-sl-label]");
        const n = steps.length;
        const per = 360 / n;

        gsap.set(steps, { autoAlpha: 0, y: 30 });
        gsap.set(steps[0], { autoAlpha: 1, y: 0 });
        gsap.set(labels, { opacity: 0.4 });
        gsap.set(labels[0], { opacity: 1 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut", duration: 1 },
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: () => `+=${window.innerHeight * (n - 1) * 0.6}`,
            pin: q("[data-sl-pin]")[0],
            scrub: 0.6,
            snap: { snapTo: 1 / (n - 1), duration: { min: 0.2, max: 0.6 }, ease: "power2.inOut" },
            anticipatePin: 1,
          },
        });

        gsap.set(q("[data-sl-arc]"), { strokeDashoffset: 1 });
        for (let i = 1; i < n; i++) {
          const at = i - 1;
          tl.to(q("[data-sl-dial]"), { "--spin": `${per * i}deg` }, at)
            .to(q("[data-sl-arc]"), { strokeDashoffset: 1 - i / n }, at)
            .to(steps[i - 1], { autoAlpha: 0, y: -30, duration: 0.45 }, at)
            .to(steps[i], { autoAlpha: 1, y: 0, duration: 0.45 }, at + 0.5)
            .to(labels[i - 1], { opacity: 0.4, duration: 0.4 }, at)
            .to(labels[i], { opacity: 1, duration: 0.4 }, at + 0.5);
        }
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={className} data-svc-tone="ink" data-theme="dark" aria-labelledby="social-loop-title">
      {children}
    </section>
  );
}
