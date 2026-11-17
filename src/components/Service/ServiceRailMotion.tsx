"use client";

import { useRef, type ComponentProps } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { scrollState } from "@/lib/scrollState";

/**
 * Desktop: pin and translate the track. Each numeral drifts against the
 * track (parallax via containerAnimation) and the progress rail fills.
 * Velocity variant: panels shear with scroll speed, settling when still.
 * Touch / narrow: no pin — steps rise in as they enter.
 */
export function ServiceRailMotion(props: ComponentProps<"section">) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(ref);
      const velocity = ref.current?.dataset.variant === "velocity";

      mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (ctx) => {
        if (!ctx.conditions?.motion) return;

        gsap.from(q("[data-sr-title] [data-w]"), {
          yPercent: 80,
          autoAlpha: 0,
          duration: 1.1,
          stagger: 0.05,
          ease: "power4.out",
          scrollTrigger: { trigger: ref.current, start: "top 65%" },
        });

        if (!ctx.conditions.desktop) {
          q<HTMLElement>("[data-sr-step]").forEach((step) => {
            gsap.from(step, {
              y: 60,
              autoAlpha: 0,
              duration: 1.1,
              ease: "power4.out",
              scrollTrigger: { trigger: step, start: "top 85%" },
            });
          });
          return;
        }

        const track = q<HTMLElement>("[data-sr-track]")[0];
        const distance = () => track.scrollWidth - window.innerWidth;

        const move = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: q("[data-sr-pin]")[0],
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.fromTo(
          q("[data-sr-progress]"),
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top top", end: () => `+=${distance()}`, scrub: true },
          },
        );

        q<HTMLElement>("[data-sr-step]").forEach((step) => {
          gsap.fromTo(
            step.querySelector("[data-sr-num]"),
            { xPercent: 40 },
            {
              xPercent: -30,
              ease: "none",
              scrollTrigger: {
                trigger: step,
                containerAnimation: move,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
          gsap.from(step.querySelectorAll("h3, p"), {
            y: 40,
            autoAlpha: 0,
            stagger: 0.08,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: step, containerAnimation: move, start: "left 75%" },
          });
        });

        if (velocity) {
          const steps = q<HTMLElement>("[data-sr-step]");
          const skewTo = gsap.quickTo(steps, "skewX", { duration: 0.5, ease: "power3.out" });
          const tick = () => {
            skewTo(gsap.utils.clamp(-10, 10, -scrollState.velocity * 0.35));
          };
          gsap.ticker.add(tick);
          return () => gsap.ticker.remove(tick);
        }
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return <section ref={ref} {...props} />;
}
