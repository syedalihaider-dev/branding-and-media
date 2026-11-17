"use client";

import { useRef, type ComponentProps } from "react";
import { gsap, useGSAP, MQ, ScrollTrigger } from "@/lib/gsap";

/**
 * The drum turns one full revolution (plus a little) across the section's
 * scroll; each name's brightness follows how squarely it faces you, and
 * the front name takes the light. Header copy settles on entry.
 */
export function FeaturedPressMotion(props: ComponentProps<"section">) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const drum = q<HTMLElement>("[data-fp-drum]")[0];
        const names = q<HTMLElement>("[data-fp-name]");
        const n = names.length;
        const step = 360 / n;
        const total = 360 + step; // end on the second name — the list keeps going
        let front = -1;

        const render = (rot: number) => {
          gsap.set(drum, { rotationX: rot });
          names.forEach((el, i) => {
            // Angle of this face from the viewer, wrapped to [-180, 180]
            const a = ((((i * step - rot) % 360) + 540) % 360) - 180;
            const facing = Math.cos((a * Math.PI) / 180);
            el.style.opacity = String(Math.max(0.06, facing) ** 2.2);
          });
          const f = ((Math.round(rot / step) % n) + n) % n;
          if (f !== front) {
            names[front]?.removeAttribute("data-front");
            names[f].setAttribute("data-front", "");
            front = f;
          }
        };
        render(0);

        ScrollTrigger.create({
          trigger: ref.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          onUpdate: (self) => render(self.progress * total),
        });

        gsap.from(q("[data-fp-fade], .kicker"), {
          y: 36,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: { trigger: ref.current, start: "top 60%" },
        });

        return () =>
          names.forEach((el) => {
            el.style.opacity = "";
            el.removeAttribute("data-front");
          });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      data-svc-tone="ink"
      data-theme="dark"
      aria-labelledby="featured-press-title"
      {...props}
    />
  );
}
