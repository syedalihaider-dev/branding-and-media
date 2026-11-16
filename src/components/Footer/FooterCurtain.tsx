"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Enables the curtain reveal only when the whole footer fits in the
 * viewport — otherwise its fixed inner layer would be cropped. Writes a
 * CSS variable + data attribute; no React state.
 */
export function FooterCurtain({
  children,
  className,
  innerClassName,
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = ref.current;
    const inner = innerRef.current;
    if (!footer || !inner) return;
    const wide = window.matchMedia("(min-width: 900px)");

    const measure = () => {
      // Measure in normal flow first.
      footer.dataset.curtain = "off";
      const h = inner.offsetHeight;
      const fits = wide.matches && h <= window.innerHeight;
      footer.style.setProperty("--footer-h", `${h}px`);
      footer.dataset.curtain = fits ? "on" : "off";
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(inner);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <footer ref={ref} className={className} data-theme="light" data-curtain="off">
      <div ref={innerRef} className={innerClassName}>
        {children}
      </div>
    </footer>
  );
}
