"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP, MQ } from "@/lib/gsap";

/**
 * Practices — the sticky picture follows the reader. When a practice
 * crosses the middle of the screen its still wipes in from below (the
 * previous one sinks away) and the counter rolls to its number.
 */
export function AboutPracticesMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(ref);

      mm.add(MQ.motion, () => {
        gsap.from(q("header > *"), {
          y: 40,
          autoAlpha: 0,
          duration: 1.1,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: { trigger: ref.current, start: "top 70%" },
        });

        q<HTMLElement>("[data-ap-group]").forEach((g) => {
          gsap.from(g.querySelectorAll("li"), {
            x: -30,
            autoAlpha: 0,
            duration: 0.9,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: { trigger: g, start: "top 60%" },
          });
        });
      });

      mm.add(`${MQ.motion} and ${MQ.desktop}`, () => {
        const shots = q<HTMLElement>("[data-ap-shot]");
        const counter = q<HTMLElement>("[data-ap-counter]")[0];
        let current = 0;
        gsap.set(shots, { clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set(shots[0], { clipPath: "inset(0% 0% 0% 0%)" });

        const show = (i: number) => {
          if (i === current) return;
          const down = i > current;
          const prev = shots[current];
          current = i;
          gsap.set(shots[i], { zIndex: 2 });
          gsap.set(prev, { zIndex: 1 });
          gsap.fromTo(
            shots[i],
            { clipPath: down ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "expo.inOut", overwrite: true },
          );
          gsap.fromTo(
            shots[i].querySelector("img"),
            { scale: 1.25 },
            { scale: 1, duration: 1.6, ease: "expo.out", overwrite: true },
          );
          gsap.to(counter, { yPercent: (-100 / shots.length) * i, duration: 0.9, ease: "power4.inOut" });
        };

        q<HTMLElement>("[data-ap-group]").forEach((g, i) => {
          ScrollTrigger.create({
            trigger: g,
            start: "top 55%",
            end: "bottom 55%",
            onToggle: (self) => self.isActive && show(i),
          });
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={className} data-theme="light" aria-labelledby="practices-title">
      {children}
    </section>
  );
}
