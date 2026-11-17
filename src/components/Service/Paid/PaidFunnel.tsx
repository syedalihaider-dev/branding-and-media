import { paidFunnel } from "@/content/services/paid";
import { PaidFunnelMotion } from "./PaidFunnelMotion";
import styles from "./PaidFunnel.module.css";

/**
 * Precision, stage by stage. Four full-width bands are cut, as you
 * scroll, into a single continuous funnel (each band a trapezoid whose
 * bottom edge is the next band's top). Each stage lights in turn and its
 * reasoning appears alongside — a funnel drawn from typography, not a chart.
 */
export function PaidFunnel() {
  return (
    <PaidFunnelMotion className={styles.funnel}>
      <div className={styles.pin} data-pf-pin>
        <header className={styles.head}>
          <p className="label kicker">
            <span className="kicker-index">03</span> Precision
          </p>
          <h2 className={styles.title} id="paid-funnel-title">
            Every stage, <span className="accent">engineered.</span>
          </h2>
          <ol className={styles.notes}>
            {paidFunnel.map((f, i) => (
              <li key={f.stage} className={styles.note} data-pf-note>
                <span className={styles.noteIdx}>{String(i + 1).padStart(2, "0")}</span>
                <h3>{f.stage}</h3>
                <p>{f.body}</p>
              </li>
            ))}
          </ol>
        </header>

        <div className={styles.shape} aria-hidden="true">
          {paidFunnel.map((f, i) => (
            <div key={f.stage} className={styles.band} data-pf-band style={{ "--i": i } as React.CSSProperties}>
              <span className={styles.bandStage}>{f.stage}</span>
              <span className={styles.bandLine}>{f.line}</span>
            </div>
          ))}
        </div>
      </div>
    </PaidFunnelMotion>
  );
}
