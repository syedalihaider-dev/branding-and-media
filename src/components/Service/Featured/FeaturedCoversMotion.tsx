"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ, ScrollTrigger } from "@/lib/gsap";

const GAP = 700; // depth between covers (px)

/**
 * Desktop: pinned. One progress value drives every cover's depth: covers
 * wait in a receding line, the current one sits at the front with a slight
 * turn, and as you scroll it flies past the camera and the next arrives.
 * Snaps to each cover; the caption and counter follow.
 * Touch: covers in the strip lift in as it enters.
 */
export function FeaturedCoversMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();

      mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (ctx) => {
        if (!ctx.conditions?.motion) return;

        gsap.from(q("[data-fc-fade], header .kicker"), {
          y: 36,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: { trigger: ref.current, start: "top 70%" },
        });

        if (!ctx.conditions.desktop) {
          gsap.from(q("[data-fc-item]"), {
            y: 70,
            rotate: 3,
            autoAlpha: 0,
            stagger: 0.1,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: { trigger: q("[data-fc-item]")[0], start: "top 85%" },
          });
          return;
        }

        const items = q<HTMLElement>("[data-fc-item]");
        const covers = q<HTMLElement>("[data-fc-cover]");
        const count = q<HTMLElement>("[data-fc-count]")[0];
        const n = covers.length;
        let active = -1;

        const render = (p: number) => {
          covers.forEach((c, k) => {
            const d = k - p; // >0: waiting in depth, <0: passed the camera
            const z = -d * GAP;
            const opacity = d < 0 ? gsap.utils.clamp(0, 1, 1 + d / 0.45) : gsap.utils.clamp(0, 1, 1 - d * 0.28);
            const w = c.offsetWidth;
            gsap.set(c, {
              xPercent: -30,
              yPercent: -46,
              z,
              // Waiting covers fan out up and to the right so the line reads in depth.
              x: d > 0 ? d * w * 0.55 : d * w * 0.35,
              y: d > 0 ? -d * w * 0.12 : 0,
              rotationY: -12 + Math.max(0, d) * 3,
              opacity,
              visibility: opacity <= 0.01 ? "hidden" : "visible",
            });
            // Nearer covers stack above farther ones.
            items[k].style.zIndex = String(Math.round(100 - d * 10));
          });
          const a = Math.min(n - 1, Math.max(0, Math.round(p)));
          if (a !== active) {
            active = a;
            items.forEach((it, i) => it.toggleAttribute("data-active", i === a));
            count.textContent = String(a + 1).padStart(2, "0");
          }
        };

        render(0);
        ScrollTrigger.create({
          trigger: ref.current,
          start: "top top",
          end: () => `+=${window.innerHeight * (n - 1) * 0.8}`,
          pin: q("[data-fc-pin]")[0],
          scrub: 0.8,
          anticipatePin: 1,
          snap: { snapTo: 1 / (n - 1), duration: { min: 0.25, max: 0.7 }, ease: "power2.inOut" },
          onUpdate: (self) => render(self.progress * (n - 1)),
        });

        // Arrival: the first cover rises out of the dark.
        gsap.from(covers[0], {
          y: 160,
          autoAlpha: 0,
          duration: 1.6,
          ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 55%" },
          immediateRender: false,
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={className} data-svc-tone="ink-2" data-theme="dark" aria-labelledby="featured-covers-title">
      {children}
    </section>
  );
}
