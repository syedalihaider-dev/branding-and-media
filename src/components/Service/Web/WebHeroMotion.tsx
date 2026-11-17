"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * Intro: headline rises; the layers drop into the drawing one by one.
 * Desktop (pinned): the axonometric rotates flat (CSS vars --rx/--rz),
 * the layer gap collapses (--gap) and the stage glides to centre and
 * scales up — the wireframe dissolves once everything has assembled.
 * Pointer adds a gentle tilt while idle. Narrow screens: the same
 * collapse, scrubbed in place without a pin.
 */
export function WebHeroMotion({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const readout = q<HTMLElement>("[data-wh-viewport]")[0];
      const setReadout = () => {
        if (readout) readout.textContent = `${window.innerWidth} × ${window.innerHeight}`;
      };
      setReadout();
      window.addEventListener("resize", setReadout);

      const mm = gsap.matchMedia();
      mm.add({ motion: MQ.motion, desktop: MQ.desktop, fine: "(pointer: fine)" }, (ctx) => {
        const { motion, desktop, fine } = ctx.conditions ?? {};
        if (!motion) return;

        const stage = q<HTMLElement>("[data-wh-stage]")[0];
        const stack = q<HTMLElement>("[data-wh-stack]")[0];
        const tilt = q<HTMLElement>("[data-wh-tilt]")[0];
        const planes = stack.children;

        const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
        intro
          .from(q("[data-wh-line]"), { yPercent: 112, duration: 1.4, stagger: 0.1 }, 0.1)
          .from(q("[data-wh-fade]"), { autoAlpha: 0, y: 20, duration: 1, stagger: 0.08 }, 0.5)
          .from(planes, { z: -400, autoAlpha: 0, duration: 1.4, stagger: 0.12, ease: "expo.out" }, 0.3)
          .from(q("[data-wh-tag]"), { autoAlpha: 0, x: -12, duration: 0.8, stagger: 0.1 }, 1);

        if (fine) {
          const rx = gsap.quickTo(tilt, "rotationX", { duration: 1.2, ease: "power3.out" });
          const ry = gsap.quickTo(tilt, "rotationY", { duration: 1.2, ease: "power3.out" });
          const onMove = (e: PointerEvent) => {
            const progress = Number(stage.dataset.progress ?? 0);
            const k = 1 - progress; // tilt fades out as the page assembles
            rx(((e.clientY / window.innerHeight) * 2 - 1) * -5 * k);
            ry(((e.clientX / window.innerWidth) * 2 - 1) * 7 * k);
          };
          window.addEventListener("pointermove", onMove, { passive: true });
          ctx.add(() => () => window.removeEventListener("pointermove", onMove));
        }

        const collapse = (tl: gsap.core.Timeline) =>
          tl
            .to(stack, { "--rx": "0deg", "--rz": "0deg", "--gap": "0vw", duration: 1, ease: "power2.inOut" }, 0)
            .to(q("[data-wh-tag]"), { autoAlpha: 0, duration: 0.25 }, 0.05)
            .to(q("[data-wh-wire]"), { autoAlpha: 0, duration: 0.3 }, 0.75);

        if (!desktop) {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: stage, start: "top 75%", end: "bottom 45%", scrub: 0.6 },
          });
          collapse(tl);
          return;
        }

        // Where the stage must travel to sit centred, and how big it can get.
        // Layout offsets (relative to the pin) ignore in-flight transforms.
        const toCentre = () => window.innerWidth / 2 - (stage.offsetLeft + stage.offsetWidth / 2);
        const toMiddle = () => window.innerHeight / 2 + 20 - (stage.offsetTop + stage.offsetHeight / 2);
        const fit = () => {
          const w = stage.offsetWidth;
          const h = stage.offsetHeight;
          return Math.min((window.innerWidth * 0.82) / w, (window.innerHeight * 0.74) / h);
        };

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: () => `+=${window.innerHeight * 1.5}`,
            pin: q("[data-wh-pin]")[0],
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              stage.dataset.progress = self.progress.toFixed(3);
            },
          },
        });
        collapse(tl);
        tl.to(stage, { x: toCentre, y: toMiddle, scale: fit, duration: 1, ease: "power2.inOut" }, 0)
          .to(q("h1"), { yPercent: -40, autoAlpha: 0, duration: 0.45 }, 0)
          .to(q("[data-wh-fade]"), { autoAlpha: 0, duration: 0.3 }, 0)
          .to(tilt, { rotationX: 0, rotationY: 0, duration: 0.5 }, 0)
          .to({}, { duration: 0.25 });
      });

      return () => {
        window.removeEventListener("resize", setReadout);
        mm.revert();
      };
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={className} data-svc-tone="ink" data-theme="dark" aria-labelledby="web-hero-title">
      {children}
    </section>
  );
}
