"use client";

import { useRef, type ComponentProps } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

const SHAPES: Record<string, [string, string]> = {
  iris: ["circle(0% at 50% 55%)", "circle(150% at 50% 55%)"],
  card: ["inset(30% 38% 22% 38% round 18px)", "inset(0% 0% 0% 0% round 0px)"],
  slash: ["polygon(0% 100%, 0% 100%, 0% 100%, 0% 100%)", "polygon(0% 100%, 0% -40%, 140% -40%, 100% 100%)"],
  page: ["polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)", "polygon(-20% 0%, 100% 0%, 100% 100%, 0% 100%)"],
};

/**
 * The field is scrubbed in as the section approaches; the headline lands
 * once it has arrived. Shutter is the only multi-element reveal: twelve
 * blinds rise in a staggered wave, alternating direction like a grid
 * snapping into place.
 */
export function ServiceCloseMotion(props: ComponentProps<"section">) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(ref);
      const reveal = ref.current?.dataset.reveal ?? "iris";

      mm.add(MQ.motion, () => {
        const scrub = { trigger: ref.current, start: "top bottom", end: "top 5%", scrub: 0.5 };

        if (reveal === "shutter") {
          const blinds = q<HTMLElement>("[data-sc-blind]");
          blinds.forEach((b, i) => gsap.set(b, { transformOrigin: i % 2 ? "50% 0%" : "50% 100%" }));
          gsap.fromTo(blinds, { scaleY: 0 }, { scaleY: 1, ease: "none", stagger: 0.05, scrollTrigger: scrub });
          gsap.fromTo(q("[data-sc-media]"), { autoAlpha: 0 }, { autoAlpha: 1, ease: "none", scrollTrigger: scrub });
        } else {
          const [from, to] = SHAPES[reveal] ?? SHAPES.iris;
          gsap.fromTo(q("[data-sc-field]"), { clipPath: from }, { clipPath: to, ease: "none", scrollTrigger: scrub });
          gsap.fromTo(
            q("[data-sc-media]"),
            { scale: 1.25 },
            { scale: 1, ease: "none", scrollTrigger: { ...scrub, end: "bottom bottom" } },
          );
        }

        gsap.from(q("[data-sc-line] > span"), {
          yPercent: 115,
          duration: 1.3,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: { trigger: ref.current, start: "top 30%" },
        });
        gsap.from(q("[data-sc-fade]"), {
          y: 30,
          autoAlpha: 0,
          duration: 1,
          scrollTrigger: { trigger: ref.current, start: "top 20%" },
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return <section ref={ref} {...props} />;
}
