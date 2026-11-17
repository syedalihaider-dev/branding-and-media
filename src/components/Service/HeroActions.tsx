import Link from "next/link";
import { site } from "@/content/site";
import styles from "./HeroActions.module.css";

/**
 * The hero's two ways in: a brief (contact page) and a direct call.
 * `tel:` so the number dials on phones.
 */
export function HeroActions({ label = "Start a brief", tone = "dark" }: { label?: string; tone?: "dark" | "light" }) {
  return (
    <div className={styles.actions} data-tone={tone}>
      <Link href="/contact-us" className={styles.go}>
        <span>{label}</span>
        <span aria-hidden="true" className={styles.arrow}>
          →
        </span>
      </Link>
      <a href={site.phone.href} className={styles.call}>
        <span className={styles.callLabel}>Call</span> {site.phone.display}
      </a>
    </div>
  );
}
