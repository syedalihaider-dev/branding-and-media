"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { prefetchFor, primaryNav, type ServiceGroup } from "@/content/navigation";
import { site } from "@/content/site";
import styles from "./MobileMenu.module.css";

type GroupId = ServiceGroup["id"];

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Full-screen menu for touch and narrow screens. The three service
 * categories open in place as accordions (one at a time) so the whole
 * site map is reachable without leaving the sheet.
 */
export function MobileMenu({
  open,
  pathname,
  onNavigate,
}: {
  open: boolean;
  pathname: string;
  onNavigate: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<GroupId | null>(null);

  // Collapse accordions whenever the sheet closes.
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (!open) setExpanded(null);
  }

  useEffect(() => {
    if (!open) return;
    const first = ref.current?.querySelector<HTMLElement>("a, button");
    first?.focus({ preventScroll: true });
    ref.current?.scrollTo({ top: 0 });
  }, [open]);

  return (
    <div
      ref={ref}
      id="mobile-menu"
      className={styles.menu}
      data-open={open}
      aria-hidden={!open}
      inert={!open}
      data-lenis-prevent
    >
      <nav aria-label="Mobile">
        <ol className={styles.list}>
          {primaryNav.map((item, i) => {
            const style = { "--i": i } as React.CSSProperties;
            if (item.kind === "link") {
              return (
                <li key={item.href} className={styles.row} style={style}>
                  <Link
                    href={item.href}
                    className={styles.top}
                    aria-current={pathname === item.href ? "page" : undefined}
                    onClick={onNavigate}
                  >
                    <span className={styles.index}>{pad(i + 1)}</span>
                    <span className={styles.label}>{item.label}</span>
                  </Link>
                </li>
              );
            }
            const { group } = item;
            const isOpen = expanded === group.id;
            const panelId = `mobile-${group.id}`;
            return (
              <li key={group.id} className={styles.row} style={style}>
                <button
                  type="button"
                  className={styles.top}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setExpanded(isOpen ? null : group.id)}
                >
                  <span className={styles.index}>{pad(i + 1)}</span>
                  <span className={styles.label}>
                    {group.lockup[0]} <span className="serif italic">{group.lockup[1]}</span>
                  </span>
                  <span className={styles.plus} aria-hidden="true" />
                </button>
                <div id={panelId} className={styles.sub} data-open={isOpen} inert={!isOpen}>
                  <div className={styles.subInner}>
                    <p className={styles.subDesc}>{group.description}</p>
                    <ul>
                      {group.services.map((s, si) => (
                        <li key={s.href}>
                          <Link
                            href={s.href}
                            prefetch={prefetchFor(s.href)}
                            className={styles.subLink}
                            aria-current={pathname === s.href ? "page" : undefined}
                            onClick={onNavigate}
                          >
                            <span className={styles.subNum}>{pad(si + 1)}</span>
                            <span>{s.label}</span>
                            <span className={styles.subArrow} aria-hidden="true">
                              →
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </nav>

      <div className={styles.foot}>
        <p className="label">Talk to the studio</p>
        <a href={site.phone.href} className={styles.phone}>
          {site.phone.display}
        </a>
        <address className={styles.addr}>
          {site.address.street}, {site.address.locality}, {site.address.region} {site.address.postalCode}
        </address>
        <Link href="/contact-us" className={styles.start} onClick={onNavigate}>
          <span>Start a project</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
