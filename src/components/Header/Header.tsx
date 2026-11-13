"use client";

import { useEffect, useRef, useState } from "react";
import { nav, officeCount, site } from "@/content/site";
import { MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { lockScroll, scrollToTarget } from "@/lib/smoothScroll";
import { setHeaderTheme, type HeaderTheme } from "./headerTheme";
import styles from "./Header.module.css";

export function Header() {
  const ref = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  // Hide on scroll down, reveal on scroll up; adopt the theme of the
  // section underneath. All DOM writes — zero React renders while scrolling.
  useGSAP(
    () => {
      const header = ref.current!;
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const y = self.scroll();
          header.dataset.scrolled = y > 40 ? "true" : "false";
          header.dataset.hidden = self.direction === 1 && y > 240 ? "true" : "false";
        },
      });

      const sections = themedSections();
      sections.forEach((section) => {
        const theme = (section.dataset.theme ?? section.dataset.themeStatic) as HeaderTheme;
        ScrollTrigger.create({
          trigger: section,
          start: "top 34px",
          end: "bottom 34px",
          refreshPriority: -1,
          onToggle: (self) => self.isActive && setHeaderTheme(theme),
        });
      });
    },
    { scope: ref },
  );

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const first = menuRef.current?.querySelector<HTMLElement>("a");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const toggle = toggleRef.current;
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    // Wait a frame so scroll is unlocked before Lenis animates.
    requestAnimationFrame(() => scrollToTarget(href));
  };

  return (
    <header
      ref={ref}
      id="site-header"
      className={styles.header}
      data-theme="dark"
      data-open={open}
    >
      <a href="#top" className={styles.brand} onClick={go("#top")} aria-label={`${site.name} — home`}>
        <span className={styles.mark} aria-hidden="true" />
        <span className={styles.wordmark}>
          Branding <span className="serif italic">&amp;</span> Media
        </span>
      </a>

      <nav className={styles.nav} aria-label="Primary">
        <ul>
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={go(item.href)} className={styles.link}>
                <span data-text={item.label}>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <a href="#contact" onClick={go("#contact")} className={styles.cta}>
        <span className={styles.ctaDot} aria-hidden="true" />
        Start a project
      </a>

      <button
        ref={toggleRef}
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
      >
        <span className={styles.toggleText}>{open ? "Close" : "Menu"}</span>
        <span className={styles.toggleIcon} aria-hidden="true" />
      </button>

      <div
        ref={menuRef}
        id="mobile-menu"
        className={styles.menu}
        aria-hidden={!open}
        inert={!open}
      >
        <ul className={styles.menuList}>
          {nav.map((item, i) => (
            <li key={item.href} style={{ "--i": i } as React.CSSProperties}>
              <a href={item.href} onClick={go(item.href)}>
                <span className={styles.menuIndex}>0{i + 1}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className={styles.menuFoot}>
          <a href={site.phone.href}>{site.phone.display}</a>
          <span>
            {site.address.locality}, {site.address.region} — and {officeCount - 1} more cities
          </span>
        </div>
      </div>
    </header>
  );
}

function themedSections() {
  return Array.from(document.querySelectorAll<HTMLElement>(
      // Pinned sections manage the theme themselves when motion is on.
      window.matchMedia(MQ.reduce).matches ? "[data-theme], [data-theme-static]" : "[data-theme]",
    )).filter(
    (el) => !el.closest("#site-header"),
  );
}
