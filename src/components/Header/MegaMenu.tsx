"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { prefetchFor, serviceGroups, type ServiceGroup } from "@/content/navigation";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import styles from "./MegaMenu.module.css";

type GroupId = ServiceGroup["id"];

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Desktop mega menu — one panel, three "chapters".
 * Why: each category is a small editorial spread rather than a list:
 * the category set as a headline, the services as a numbered index, and
 * a still from the showreel that wipes in for whichever service has focus.
 * Disclosure pattern (button + region), not an ARIA menu: links stay links.
 */
export function MegaMenu({
  active,
  primed,
  pathname,
  onNavigate,
}: {
  active: GroupId | null;
  primed: boolean;
  pathname: string;
  onNavigate: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);
  const [hover, setHover] = useState<Record<GroupId, number>>({ growth: 0, media: 0, editorial: 0 });

  // Entrance choreography each time a chapter becomes active.
  useGSAP(
    () => {
      if (!active) return;
      const reduce = window.matchMedia(MQ.reduce).matches;
      const pane = ref.current!.querySelector<HTMLElement>(`[data-pane="${active}"]`);
      if (!pane || reduce) return;
      const d = wasOpen.current ? 0 : 0.18;
      gsap.fromTo(
        pane.querySelectorAll("[data-mm-line] > span"),
        { yPercent: 115 },
        { yPercent: 0, duration: 0.95, stagger: 0.07, ease: "power4.out", delay: d },
      );
      gsap.fromTo(
        pane.querySelectorAll("[data-mm-fade]"),
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.06, delay: d + 0.2 },
      );
      gsap.fromTo(
        pane.querySelectorAll("[data-mm-item]"),
        { autoAlpha: 0, y: 22 },
        { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.05, ease: "power3.out", delay: d + 0.06 },
      );
      gsap.fromTo(
        pane.querySelector("[data-mm-preview]"),
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "expo.out", delay: d + 0.08 },
      );
      placeIndicator(pane, hover[active], true);
    },
    { dependencies: [active], scope: ref },
  );

  useEffect(() => {
    wasOpen.current = active !== null;
  }, [active]);

  const focusItem = (group: GroupId, index: number, el: HTMLElement) => {
    setHover((h) => (h[group] === index ? h : { ...h, [group]: index }));
    const pane = el.closest<HTMLElement>("[data-pane]");
    if (pane) placeIndicator(pane, index, false);
  };

  return (
    <div ref={ref} className={styles.mega} data-open={active ? "true" : "false"}>
      <div className={styles.inner}>
        {serviceGroups.map((g, gi) => {
          const on = active === g.id;
          const current = hover[g.id];
          return (
            <div
              key={g.id}
              id={`mega-${g.id}`}
              role="region"
              aria-label={g.label}
              className={styles.pane}
              data-pane={g.id}
              data-active={on}
              inert={!on}
            >
              <div className={styles.intro}>
                <p className={`label ${styles.kicker}`} data-mm-fade>
                  <span className={styles.kickerIndex}>{pad(gi + 1)}</span>
                  <span>/ {pad(serviceGroups.length)}</span>
                  <span className={styles.rule} />
                  <span>Services</span>
                </p>
                <p className={styles.title}>
                  <span className={styles.line} data-mm-line>
                    <span>{g.lockup[0]}</span>
                  </span>
                  <span className={styles.line} data-mm-line>
                    <span className="serif italic">{g.lockup[1]}</span>
                  </span>
                </p>
                <p className={styles.desc} data-mm-fade>
                  {g.description}
                </p>
                <p className={`label ${styles.count}`} data-mm-fade>
                  {pad(g.services.length)} disciplines
                </p>
              </div>

              <ol className={styles.list}>
                <span className={styles.indicator} data-mm-indicator aria-hidden="true" />
                {g.services.map((s, i) => (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      prefetch={prefetchFor(s.href)}
                      className={styles.item}
                      data-mm-item
                      data-hover={current === i}
                      aria-current={pathname === s.href ? "page" : undefined}
                      onPointerEnter={(e) => focusItem(g.id, i, e.currentTarget)}
                      onFocus={(e) => focusItem(g.id, i, e.currentTarget)}
                      onClick={onNavigate}
                    >
                      <span className={styles.num}>{pad(i + 1)}</span>
                      <span className={styles.body}>
                        <span className={styles.name}>{s.label}</span>
                        <span className={styles.blurb}>{s.blurb}</span>
                      </span>
                      <span className={styles.arrow} aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>

              <figure className={styles.preview} data-mm-preview aria-hidden="true">
                <div className={styles.frame}>
                  {primed &&
                    g.services.map((s, i) => (
                      <div key={s.href} className={styles.shot} data-on={current === i}>
                        <Image src={s.still.src} alt="" fill sizes="(min-width: 1180px) 24vw, 1px" />
                      </div>
                    ))}
                </div>
                <figcaption className={styles.caption}>
                  <span className={styles.captionIndex}>
                    {pad(current + 1)} — {pad(g.services.length)}
                  </span>
                  <span className={styles.captionText}>{g.services[current]?.label}</span>
                </figcaption>
              </figure>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function placeIndicator(pane: HTMLElement, index: number, instant: boolean) {
  const bar = pane.querySelector<HTMLElement>("[data-mm-indicator]");
  const item = pane.querySelectorAll<HTMLElement>("[data-mm-item]")[index];
  if (!bar || !item) return;
  const li = item.parentElement!;
  gsap.to(bar, {
    y: li.offsetTop,
    height: li.offsetHeight,
    duration: instant ? 0 : 0.55,
    ease: "power3.out",
    overwrite: true,
  });
}
