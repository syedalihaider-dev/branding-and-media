"use client";

import { useRef, type ComponentProps } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

const SHAPES: Record<string, [string, string]> = {
  iris: ["circle(0% at 50% 55%)", "circle(150% at 50% 55%)"],
  card: ["inset(30% 38% 22% 38% round 18px)", "inset(0% 0% 0% 0% round 0px)"],
  slash: ["polygon(0% 100%, 0% 100%, 0% 100%, 0% 100%)", "polygon(0% 100%, 0% -40%, 140% -40%, 100% 100%)"],
  page: ["polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)", "polygon(-20% 0%, 100% 0%, 100% 100%, 0% 100%)"],
  letterbox: ["inset(41% 6% 41% 6%)", "inset(0% 0% 0% 0%)"],
  mirror: ["inset(0% 50% 0% 50%)", "inset(0% 0% 0% 0%)"],
  spot: ["ellipse(0% 0% at 50% 0%)", "ellipse(150% 135% at 50% 0%)"],
};

/**
 * The field is scrubbed in as the section approaches; the headline lands
 * once it has arrived. Shutter and columns are multi-element reveals:
 * shutter's twelve blinds rise in an alternating wave; columns' six drop
 * from the top like a page being set.
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

        if (reveal === "columns") {
          // Newsprint columns drop into place, outer columns last.
          const cols = q<HTMLElement>("[data-sc-blind]");
          gsap.fromTo(
            cols,
            { yPercent: -101 },
            { yPercent: 0, ease: "none", stagger: { each: 0.08, from: "center" }, scrollTrigger: scrub },
          );
          gsap.fromTo(q("[data-sc-media]"), { autoAlpha: 0 }, { autoAlpha: 1, ease: "none", scrollTrigger: scrub });
        } else if (reveal === "shutter") {
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
