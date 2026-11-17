import type { Step, Tone, Words as WordsType } from "@/content/services/types";
import { headerThemeFor } from "@/content/services/types";
import { Words, pad } from "./Words";
import { ServiceLedgerMotion } from "./ServiceLedgerMotion";
import styles from "./ServiceLedger.module.css";

/**
 * Process as a ledger: the steps scroll past on the right while a sticky
 * odometer on the left rolls to the current step. Precise, methodical —
 * one line item at a time.
 */
export function ServiceLedger({
  id,
  index,
  label,
  title,
  steps,
  tone = "ink",
}: {
  id: string;
  index: number;
  label: string;
  title: WordsType;
  steps: Step[];
  tone?: Tone;
}) {
  return (
    <ServiceLedgerMotion
      className={styles.ledger}
      data-svc-tone={tone}
      data-theme={headerThemeFor(tone)}
      aria-labelledby={id}
    >
      <div className={styles.side}>
        <div className={styles.sticky}>
          <p className="label kicker">
            <span className="kicker-index">{pad(index)}</span> {label}
          </p>
          <h2 className={styles.title} id={id} data-sl-title>
            <Words words={title} />
          </h2>
          <div className={styles.odometer} aria-hidden="true">
            <span className={styles.window}>
              <span className={styles.reel} data-sl-reel style={{ "--n": steps.length } as React.CSSProperties}>
                {steps.map((_, i) => (
                  <span key={i}>{pad(i + 1)}</span>
                ))}
              </span>
            </span>
            <span className={styles.of}>/ {pad(steps.length)}</span>
          </div>
        </div>
      </div>

      <div className={styles.list}>
        <span className={styles.spine} aria-hidden="true">
          <i data-sl-spine />
        </span>
        <ol className={styles.items}>
        {steps.map((s, i) => (
          <li key={s.title} className={styles.item} data-sl-item>
            <span className={styles.dot} aria-hidden="true" />
            <p className={`label ${styles.mobileNum}`} aria-hidden="true">
              {pad(i + 1)}
            </p>
            <h3 className={styles.itemTitle}>
              <span className="sr-only">Step {i + 1}: </span>
              {s.title}
            </h3>
            <p className={styles.itemBody}>{s.body}</p>
          </li>
        ))}
        </ol>
      </div>
    </ServiceLedgerMotion>
  );
}
