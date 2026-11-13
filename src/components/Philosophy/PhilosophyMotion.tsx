"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * Approach — travel through the three things the agency runs on.
 * Why: "humans, ideas and data" is a stack, not a list. Each word emerges
 * from depth, holds at reading distance, then passes the viewer as the
 * next arrives — a camera move built from plain CSS 3D transforms.
 */
export function PhilosophyMotion({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add({ motion: MQ.motion, mobile: MQ.mobile }, (ctx) => {
        if (!ctx.conditions?.motion) return;
        const isMobile = !!ctx.conditions.mobile;
        const q = gsap.utils.selector(ref);
        const pin = q("[data-philo-pin]")[0];
        const layers = q<HTMLElement>("[data-philo-layer]");
        const FAR = isMobile ? -1400 : -2200;
        const PAST = isMobile ? 380 : 520;

        gsap.set(layers, { z: FAR, autoAlpha: 0 });
        gsap.set(q("[data-philo-photo]"), { z: FAR * 0.7, autoAlpha: 0 });
        gsap.set(q("[data-philo-grid]"), { autoAlpha: 0, scale: 1.4 });
        gsap.set(q("[data-philo-final] > *"), { autoAlpha: 0, y: 40 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: () => `+=${window.innerHeight * (isMobile ? 2.6 : 3.4)}`,
            pin,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        layers.forEach((layer, i) => {
          const at = i * 1.6;
          tl.to(layer, { z: 0, autoAlpha: 1, duration: 1, ease: "power2.out" }, at)
            .to(layer, { z: PAST, autoAlpha: 0, duration: 0.8, ease: "power2.in" }, at + 1.4);
        });

        // People: the photograph of people in motion drifts behind the word.
        tl.to(q("[data-philo-photo]"), { z: -300, autoAlpha: 0.55, duration: 1.2, ease: "power2.out" }, 0)
          .to(q("[data-philo-photo]"), { z: PAST, autoAlpha: 0, duration: 0.9, ease: "power2.in" }, 1.4)
          // Data: a measured grid resolves behind the final word.
          .to(q("[data-philo-grid]"), { autoAlpha: 1, scale: 1, duration: 1 }, 3.2)
          .to(q("[data-philo-grid]"), { autoAlpha: 0.25, duration: 0.6 }, 4.6)
          .to(q("[data-philo-final] > *"), { autoAlpha: 1, y: 0, stagger: 0.2, duration: 0.7, ease: "power3.out" }, 4.8)
          .to({}, { duration: 0.6 });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id={id} className={className} data-theme="dark" aria-labelledby="approach-title">
      {children}
    </section>
  );
}
