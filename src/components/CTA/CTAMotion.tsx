"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * CTA — the spotlight.
 * Why: "Let's get you famous" is about being seen. The work sits in the
 * dark and a stage light follows the visitor's cursor (or wanders on its
 * own on touch). The light is a transformed overlay — no per-frame mask
 * repaint — so it stays on the compositor.
 */
export function CTAMotion({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(ref);

      mm.add(MQ.motion, () => {
        const section = ref.current!;
        const lamp = q<HTMLElement>("[data-cta-lamp]")[0];

        gsap.from(q("[data-cta-line] > span"), {
          yPercent: 110,
          duration: 1.3,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: { trigger: section, start: "top 60%" },
        });
        gsap.from(q("[data-cta-fade]"), {
          y: 30,
          autoAlpha: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 40%" },
        });

        // The light opens up as you arrive.
        gsap.fromTo(
          lamp,
          { scale: 0.35 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: section, start: "top bottom", end: "top top", scrub: true },
          },
        );

        const xTo = gsap.quickTo(lamp, "x", { duration: 0.9, ease: "power3.out" });
        const yTo = gsap.quickTo(lamp, "y", { duration: 0.9, ease: "power3.out" });
        const fine = window.matchMedia("(pointer: fine)").matches;

        const center = () => {
          const r = section.getBoundingClientRect();
          xTo(r.width * 0.62);
          yTo(r.height * 0.45);
        };
        center();

        let wander: gsap.core.Tween | null = null;
        const onMove = (e: PointerEvent) => {
          const r = section.getBoundingClientRect();
          xTo(e.clientX - r.left);
          yTo(e.clientY - r.top);
        };

        if (fine) {
          section.addEventListener("pointermove", onMove, { passive: true });
          section.addEventListener("pointerleave", center);
        } else {
          // Touch: a slow, roaming follow-spot.
          const proxy = { t: 0 };
          wander = gsap.to(proxy, {
            t: Math.PI * 2,
            duration: 14,
            repeat: -1,
            ease: "none",
            paused: true,
            onUpdate: () => {
              const r = section.getBoundingClientRect();
              xTo(r.width * (0.5 + Math.cos(proxy.t) * 0.3));
              yTo(r.height * (0.45 + Math.sin(proxy.t * 2) * 0.18));
            },
          });
        }

        // Magnetic call button — small pull toward the cursor.
        const magnets = q<HTMLElement>("[data-magnetic]");
        const cleanups = magnets.map((el) => {
          const mx = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
          const my = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            mx((e.clientX - (r.left + r.width / 2)) * 0.18);
            my((e.clientY - (r.top + r.height / 2)) * 0.25);
          };
          const leave = () => {
            mx(0);
            my(0);
          };
          if (fine) {
            el.addEventListener("pointermove", move);
            el.addEventListener("pointerleave", leave);
          }
          return () => {
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerleave", leave);
          };
        });

        // Only animate the wandering light while visible.
        const io = new IntersectionObserver(([entry]) => {
          if (!wander) return;
          if (entry.isIntersecting) wander.play();
          else wander.pause();
        });
        io.observe(section);

        return () => {
          io.disconnect();
          section.removeEventListener("pointermove", onMove);
          section.removeEventListener("pointerleave", center);
          cleanups.forEach((c) => c());
        };
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id={id} className={className} data-theme="dark" aria-labelledby="contact-title">
      {children}
    </section>
  );
}
