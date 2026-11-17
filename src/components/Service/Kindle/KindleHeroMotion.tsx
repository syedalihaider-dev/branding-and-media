"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * Intro: the book swings in from a steep angle and settles; lines rise.
 * Desktop (pinned): the book turns to face the reader, glides to centre
 * and the cover opens (--open → -165deg) onto the title page while the
 * headline steps aside. Pointer adds a slight idle tilt.
 * Narrow: no pin — the cover opens as the book scrolls through view.
 */
export function KindleHeroMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();

      mm.add({ motion: MQ.motion, desktop: MQ.desktop, fine: "(pointer: fine)" }, (ctx) => {
        const { motion, desktop, fine } = ctx.conditions ?? {};
        if (!motion) return;
        const stage = q<HTMLElement>("[data-kh-stage]")[0];
        const turn = q<HTMLElement>("[data-kh-turn]")[0];
        const book = q<HTMLElement>("[data-book]")[0];

        gsap
          .timeline({ defaults: { ease: "power4.out" } })
          .from(q("[data-kh-line]"), { yPercent: 112, duration: 1.4, stagger: 0.1 }, 0.1)
          .from(q("[data-kh-fade]"), { autoAlpha: 0, y: 20, duration: 1, stagger: 0.08 }, 0.5)
          // Animate the CSS vars, not rotation: .turn's transform is built from them.
          .from(turn, { "--ry": "-85deg", "--rx": "24deg", duration: 2.2, ease: "expo.out" }, 0.2)
          .from(stage, { y: 80, autoAlpha: 0, duration: 1.6, ease: "expo.out" }, 0.2)
          .from(q("[data-kh-shadow]"), { scaleX: 0.3, autoAlpha: 0, duration: 2, ease: "expo.out" }, 0.2);

        if (fine) {
          gsap.set(stage, { transformPerspective: 1800 });
          const tiltX = gsap.quickTo(stage, "rotationX", { duration: 1.4, ease: "power3.out" });
          const tiltY = gsap.quickTo(stage, "rotationY", { duration: 1.4, ease: "power3.out" });
          const onMove = (e: PointerEvent) => {
            tiltX(((e.clientY / window.innerHeight) * 2 - 1) * -4);
            tiltY(((e.clientX / window.innerWidth) * 2 - 1) * 6);
          };
          window.addEventListener("pointermove", onMove, { passive: true });
          ctx.add(() => () => window.removeEventListener("pointermove", onMove));
        }

        if (!desktop) {
          gsap
            .timeline({ scrollTrigger: { trigger: stage, start: "top 70%", end: "bottom 40%", scrub: 0.6 } })
            .to(turn, { "--ry": "-4deg", "--rx": "2deg", duration: 1 }, 0)
            .to(book, { "--open": "-160deg", duration: 1, ease: "power2.inOut" }, 0.2);
          return;
        }

        // The open book is twice as wide: shift so the spread sits centred.
        const toCentre = () => window.innerWidth / 2 - (stage.offsetLeft + stage.offsetWidth / 2) + book.offsetWidth / 2;

        gsap
          .timeline({
            defaults: { ease: "power2.inOut" },
            scrollTrigger: {
              trigger: ref.current,
              start: "top top",
              end: () => `+=${window.innerHeight * 1.5}`,
              pin: q("[data-kh-pin]")[0],
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })
          .to(q("h1"), { xPercent: -12, autoAlpha: 0, duration: 0.5 }, 0)
          .to(q("[data-kh-fade]"), { autoAlpha: 0, duration: 0.3 }, 0)
          .to(turn, { "--ry": "-2deg", "--rx": "4deg", duration: 0.6 }, 0)
          .to(stage, { x: toCentre, scale: 1.12, duration: 0.8 }, 0.1)
          .to(book, { "--open": "-165deg", duration: 0.8 }, 0.45)
          .to(q("[data-kh-shadow]"), { scaleX: 2, duration: 0.8 }, 0.45)
          .to({}, { duration: 0.25 });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={className} data-svc-tone="paper" data-theme="light" aria-labelledby="kindle-hero-title">
      {children}
    </section>
  );
}
