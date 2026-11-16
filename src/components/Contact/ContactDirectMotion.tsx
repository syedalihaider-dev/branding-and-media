"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * Direct lines. The number slides in on a wide horizontal mask (a
 * departures-board flip in one move), then studio rows tick in like a
 * board updating; on fine pointers the number leans toward the cursor.
 */
export function ContactDirectMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(ref);

      mm.add(MQ.motion, () => {
        gsap.from(q("[data-cd-digits]"), {
          yPercent: 105,
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: { trigger: q("[data-cd-phone]")[0], start: "top 80%" },
        });
        gsap.from(q("[data-cd-in]"), {
          y: 30,
          autoAlpha: 0,
          duration: 1,
          stagger: 0.1,
          scrollTrigger: { trigger: q("[data-cd-in]")[0], start: "top 85%" },
        });
        gsap.from(q("[data-cd-row]"), {
          rotationX: -90,
          autoAlpha: 0,
          transformPerspective: 600,
          transformOrigin: "50% 0%",
          duration: 0.7,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: { trigger: q("[data-cd-row]")[0], start: "top 85%" },
        });
      });

      mm.add(`${MQ.motion} and ${MQ.desktop} and (pointer: fine)`, () => {
        const phone = q<HTMLElement>("[data-cd-phone]")[0];
        const xTo = gsap.quickTo(phone, "x", { duration: 0.8, ease: "power3.out" });
        const yTo = gsap.quickTo(phone, "y", { duration: 0.8, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = phone.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * 0.04);
          yTo((e.clientY - (r.top + r.height / 2)) * 0.12);
        };
        const leave = () => {
          xTo(0);
          yTo(0);
        };
        phone.addEventListener("pointermove", move);
        phone.addEventListener("pointerleave", leave);
        return () => {
          phone.removeEventListener("pointermove", move);
          phone.removeEventListener("pointerleave", leave);
        };
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={className} data-theme="dark" aria-labelledby="direct-title">
      {children}
    </section>
  );
}
