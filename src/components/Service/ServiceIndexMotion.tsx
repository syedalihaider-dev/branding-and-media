"use client";

import { useRef, type ComponentProps } from "react";
import { gsap, useGSAP, MQ, ScrollTrigger } from "@/lib/gsap";

/**
 * Title words rise in a stagger; rows are laid down one by one as they
 * enter — the rule draws across first, then the row's type settles on it.
 */
export function ServiceIndexMotion(props: ComponentProps<"section">) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(ref);
      mm.add(MQ.motion, () => {
        gsap.from(q("[data-sx-title] [data-w]"), {
          yPercent: 60,
          autoAlpha: 0,
          rotate: 3,
          duration: 1.1,
          stagger: 0.045,
          ease: "power4.out",
          scrollTrigger: { trigger: ref.current, start: "top 70%" },
        });
        gsap.from(q("[data-sx-fade]"), {
          y: 24,
          autoAlpha: 0,
          duration: 1,
          stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: "top 60%" },
        });

        const rows = q<HTMLElement>("[data-sx-row]");
        gsap.set(rows, { autoAlpha: 1 });
        rows.forEach((row) => {
          gsap.set(row.querySelector("[data-sx-rule]"), { scaleX: 0 });
          gsap.set(row.querySelectorAll(":scope > :not([data-sx-rule])"), { y: 40, autoAlpha: 0 });
        });
        ScrollTrigger.batch(rows, {
          start: "top 88%",
          once: true,
          onEnter: (batch) => {
            batch.forEach((row, i) => {
              const tl = gsap.timeline({ delay: i * 0.09 });
              tl.to(row.querySelector("[data-sx-rule]"), { scaleX: 1, duration: 1.2, ease: "expo.out" }).to(
                row.querySelectorAll(":scope > :not([data-sx-rule])"),
                { y: 0, autoAlpha: 1, duration: 1, stagger: 0.06, ease: "power4.out" },
                0.1,
              );
            });
          },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return <section ref={ref} {...props} />;
}
