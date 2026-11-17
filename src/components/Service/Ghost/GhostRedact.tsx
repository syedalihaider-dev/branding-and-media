import { ghostDiscretion } from "@/content/services/ghostwriting";
import { pad } from "../Words";
import { GhostRedactMotion } from "./GhostRedactMotion";
import styles from "./GhostRedact.module.css";

/**
 * Discretion, made literal: the credit line is written out, then our name
 * is redacted as you scroll. Below, the commitments that make it true.
 */
export function GhostRedact() {
  return (
    <GhostRedactMotion className={styles.redact}>
      <p className="label kicker">
        <span className="kicker-index">03</span> Discretion
      </p>
      <h2 className={styles.title} id="ghost-redact-title">
        <span className="sr-only">Your name goes on the cover. Ours goes nowhere.</span>
        <span aria-hidden="true" className={styles.line}>
          Written by <span className="accent">your name.</span>
        </span>
        <span aria-hidden="true" className={`${styles.line} ${styles.muted}`}>
          Ghostwritten by{" "}
          <span className={styles.ours}>
            Branding &amp; Media
            <i className={styles.bar} data-gr-bar />
          </span>
        </span>
      </h2>
      <ul className={styles.list}>
        {ghostDiscretion.map((d, i) => (
          <li key={d} data-gr-item>
            <span className={styles.n}>{pad(i + 1)}</span>
            {d}
          </li>
        ))}
      </ul>
    </GhostRedactMotion>
  );
}
