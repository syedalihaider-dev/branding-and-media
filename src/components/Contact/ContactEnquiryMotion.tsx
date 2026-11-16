"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * Enquiry sheet. Its top edge lifts in on a slight angle as it rises
 * over the hero (a sheet of paper, not a hard cut); then the left column
 * settles in and the form fields arrive one by one, top to bottom.
 */
export function ContactEnquiryMotion({
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
        gsap.fromTo(
          ref.current,
          { clipPath: "polygon(0% 6%, 100% 0%, 100% 100%, 0% 100%)" },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top bottom", end: "top 20%", scrub: true },
          },
        );

        gsap.from(q("[data-ce-in]"), {
          y: 40,
          autoAlpha: 0,
          duration: 1.1,
          stagger: 0.09,
          ease: "power4.out",
          scrollTrigger: { trigger: ref.current, start: "top 55%" },
        });

        const fields = q("[data-ce-form] [data-reveal]");
        gsap.from(fields, {
          y: 34,
          autoAlpha: 0,
          duration: 1,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: q("[data-ce-form]")[0], start: "top 70%" },
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id={id} className={className} data-theme="light" aria-labelledby="enquiry-title">
      {children}
    </section>
  );
}
