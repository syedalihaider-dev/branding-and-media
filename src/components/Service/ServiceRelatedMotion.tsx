"use client";

import { useRef, type ComponentProps } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/** Frames rise in sequence like cards dealt onto a table. */
export function ServiceRelatedMotion(props: ComponentProps<"section">) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(ref);
      mm.add(MQ.motion, () => {
        gsap.from(q("header > *"), {
          y: 30,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 1,
          scrollTrigger: { trigger: ref.current, start: "top 75%" },
        });
        gsap.from(q("[data-sr-item]"), {
          yPercent: 30,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: { trigger: q("ul")[0], start: "top 85%" },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return <section ref={ref} {...props} />;
}
