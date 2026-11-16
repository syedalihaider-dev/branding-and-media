"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * Manifesto choreography.
 *  - each statement is inked in left → right (clip-path), scrubbed, so the
 *    sentence completes as it reaches the reading line
 *  - fine pointers: a single still follows the cursor and swaps to the
 *    hovered conviction, tilting with velocity (one element, transforms only)
 */
export function AboutBeliefsMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(ref);

      mm.add(MQ.motion, () => {
        q<HTMLElement>("[data-ab-row]").forEach((row) => {
          const fill = row.querySelector("[data-ab-fill]");
          gsap.fromTo(
            fill,
            { clipPath: "inset(0% 100% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "none",
              scrollTrigger: { trigger: row, start: "top 88%", end: "top 38%", scrub: 0.6 },
            },
          );
          gsap.from(row.querySelectorAll(":scope > span, :scope > p"), {
            autoAlpha: 0,
            y: 20,
            duration: 1,
            stagger: 0.1,
            scrollTrigger: { trigger: row, start: "top 75%" },
          });
        });

        gsap.from(q("header > *"), {
          y: 40,
          autoAlpha: 0,
          duration: 1.2,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: { trigger: ref.current, start: "top 70%" },
        });
      });

      mm.add(`${MQ.motion} and ${MQ.desktop} and (pointer: fine)`, () => {
        const section = ref.current!;
        const follower = q<HTMLElement>("[data-ab-follower]")[0];
        const imgs = q<HTMLElement>("[data-ab-img]");
        const xTo = gsap.quickTo(follower, "x", { duration: 0.7, ease: "power3.out" });
        const yTo = gsap.quickTo(follower, "y", { duration: 0.7, ease: "power3.out" });
        const rTo = gsap.quickTo(follower, "rotation", { duration: 0.9, ease: "power3.out" });
        let lastX = 0;
        let current = -1;
        gsap.set(follower, { autoAlpha: 0, scale: 0.7 });

        const show = (i: number) => {
          if (i === current) return;
          current = i;
          imgs.forEach((img, j) =>
            gsap.to(img, {
              clipPath: j === i ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
              duration: j === i ? 0.7 : 0.5,
              ease: "expo.out",
              overwrite: true,
            }),
          );
          gsap.to(follower, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power3.out", overwrite: "auto" });
        };
        const hide = () => {
          current = -1;
          gsap.to(follower, { autoAlpha: 0, scale: 0.7, duration: 0.4, overwrite: "auto" });
        };

        const onMove = (e: PointerEvent) => {
          const r = section.getBoundingClientRect();
          const x = e.clientX - r.left;
          xTo(x);
          yTo(e.clientY - r.top);
          rTo(gsap.utils.clamp(-10, 10, (e.clientX - lastX) * 0.6));
          lastX = e.clientX;
          const row = (e.target as HTMLElement).closest<HTMLElement>("[data-ab-row]");
          if (row) show(Number(row.dataset.abRow));
          else hide();
        };
        gsap.set(imgs, { clipPath: "inset(100% 0% 0% 0%)" });
        section.addEventListener("pointermove", onMove, { passive: true });
        section.addEventListener("pointerleave", hide);
        return () => {
          section.removeEventListener("pointermove", onMove);
          section.removeEventListener("pointerleave", hide);
        };
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={className} data-theme="dark" aria-labelledby="beliefs-title">
      {children}
    </section>
  );
}
