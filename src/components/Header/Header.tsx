"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNav, serviceGroups, type ServiceGroup } from "@/content/navigation";
import { site } from "@/content/site";
import { MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { lockScroll, scrollToTarget } from "@/lib/smoothScroll";
import { setHeaderTheme, type HeaderTheme } from "./headerTheme";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import styles from "./Header.module.css";

type GroupId = ServiceGroup["id"];

const OPEN_DELAY = 90;
const CLOSE_DELAY = 220;

export function Header() {
  const pathname = usePathname();
  const ref = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<Partial<Record<GroupId, HTMLButtonElement | null>>>({});
  const timer = useRef<number | undefined>(undefined);
  const megaRef = useRef<GroupId | null>(null);

  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState<GroupId | null>(null);
  // Images inside the mega menu load only once someone shows intent.
  const [primed, setPrimed] = useState(false);

  // Mirror for non-React readers (scroll callbacks, timers).
  useEffect(() => {
    megaRef.current = mega;
  }, [mega]);

  const schedule = (fn: () => void, delay: number) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(fn, delay);
  };

  // Hide on scroll down, reveal on scroll up. All DOM writes — zero React
  // renders while scrolling (except closing an open mega menu, once).
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
          if (megaRef.current && Math.abs(self.getVelocity()) > 300) setMega(null);
        },
      });
    },
    { scope: ref },
  );

  // Adopt the theme of the section underneath. Re-bound on every route:
  // the header lives in the layout, pages come and go beneath it (and
  // previously visited pages stay mounted but hidden — skip those).
  useEffect(() => {
    let triggers: ScrollTrigger[] = [];
    const raf = requestAnimationFrame(() => {
      const reduce = window.matchMedia(MQ.reduce).matches;
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>(
          reduce ? "[data-theme], [data-theme-static]" : "[data-theme]",
        ),
      ).filter((el) => !el.closest("#site-header") && isRendered(el));

      setHeaderTheme(
        ((sections[0]?.dataset.theme ?? sections[0]?.dataset.themeStatic) as HeaderTheme) || "dark",
      );
      triggers = sections.map((section) => {
        const theme = (section.dataset.theme ?? section.dataset.themeStatic) as HeaderTheme;
        return ScrollTrigger.create({
          trigger: section,
          start: "top 34px",
          end: "bottom 34px",
          refreshPriority: -1,
          onToggle: (self) => self.isActive && setHeaderTheme(theme),
        });
      });
    });
    return () => {
      cancelAnimationFrame(raf);
      triggers.forEach((t) => t.kill());
    };
  }, [pathname]);

  // Close everything on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setMega(null);
  }

  // Mobile menu: lock scroll, focus, Escape.
  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const toggle = toggleRef.current;
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
      toggle?.focus({ preventScroll: true });
    };
  }, [open]);

  // Mega menu: Escape returns focus to its trigger.
  useEffect(() => {
    if (!mega) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      triggerRefs.current[mega]?.focus();
      setMega(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mega]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onTriggerEnter = (id: GroupId) => {
    setPrimed(true);
    if (!window.matchMedia("(pointer: fine)").matches) return;
    // Already open: switch instantly. Otherwise wait for intent.
    schedule(() => setMega(id), megaRef.current ? 0 : OPEN_DELAY);
  };

  const onHeaderLeave = () => schedule(() => setMega(null), CLOSE_DELAY);
  const onHeaderEnter = () => {
    if (megaRef.current) window.clearTimeout(timer.current);
  };

  const onBlur = (e: React.FocusEvent) => {
    if (!ref.current?.contains(e.relatedTarget as Node | null)) setMega(null);
  };

  const onBrandClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      scrollToTarget(0);
    }
  };

  const activeGroup = serviceGroups.find((g) => g.services.some((s) => s.href === pathname))?.id;

  return (
    <header
      ref={ref}
      id="site-header"
      className={styles.header}
      data-theme="dark"
      data-open={open}
      data-mega={mega ? "true" : "false"}
      onPointerLeave={onHeaderLeave}
      onPointerEnter={onHeaderEnter}
      onBlur={onBlur}
    >
      <Link href="/" className={styles.brand} onClick={onBrandClick} aria-label={`${site.name} — home`}>
        <span className={styles.mark} aria-hidden="true" />
        <span className={styles.wordmark}>
          Branding <span className="serif italic">&amp;</span> Media
        </span>
      </Link>

      <nav className={styles.nav} aria-label="Primary">
        <ul>
          {primaryNav.map((item) => {
            if (item.kind === "link") {
              const current = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={styles.link}
                    aria-current={current ? "page" : undefined}
                    onPointerEnter={() => mega && schedule(() => setMega(null), 120)}
                  >
                    <span className={styles.roll}>
                      <span data-text={item.label}>{item.label}</span>
                    </span>
                  </Link>
                </li>
              );
            }
            const { group } = item;
            const expanded = mega === group.id;
            return (
              <li key={group.id}>
                <button
                  ref={(el) => {
                    triggerRefs.current[group.id] = el;
                  }}
                  type="button"
                  className={`${styles.link} ${styles.trigger}`}
                  aria-expanded={expanded}
                  aria-controls={`mega-${group.id}`}
                  data-current={activeGroup === group.id || undefined}
                  onPointerEnter={() => onTriggerEnter(group.id)}
                  onFocus={() => setPrimed(true)}
                  onClick={() => {
                    window.clearTimeout(timer.current);
                    setPrimed(true);
                    setMega(expanded ? null : group.id);
                  }}
                >
                  <span className={styles.roll} aria-hidden="true">
                    <span data-text={group.short}>{group.short}</span>
                  </span>
                  <i className={styles.caret} aria-hidden="true" />
                  <span className="sr-only">{group.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <Link
        href="/contact-us"
        className={styles.cta}
        aria-current={pathname === "/contact-us" ? "page" : undefined}
      >
        <span className={styles.ctaDot} aria-hidden="true" />
        Start a project
      </Link>

      <button
        ref={toggleRef}
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
      >
        <span>{open ? "Close" : "Menu"}</span>
        <span className={styles.toggleIcon} aria-hidden="true" />
      </button>

      <MegaMenu active={mega} primed={primed} pathname={pathname} onNavigate={() => setMega(null)} />
      <div className={styles.scrim} aria-hidden="true" onClick={() => setMega(null)} />

      <MobileMenu open={open} pathname={pathname} onNavigate={() => setOpen(false)} />
    </header>
  );
}

function isRendered(el: HTMLElement) {
  if (typeof el.checkVisibility === "function") return el.checkVisibility();
  return el.offsetParent !== null || getComputedStyle(el).position === "fixed";
}
