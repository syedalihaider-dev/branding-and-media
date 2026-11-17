import { reputationResults } from "@/content/services/reputation";
import { ReputationResultsMotion } from "./ReputationResultsMotion";
import styles from "./ReputationResults.module.css";

type Result = (typeof reputationResults.before)[number];

function Results({ items, tone }: { items: readonly Result[]; tone: "before" | "after" }) {
  return (
    <ol className={styles.results} data-tone={tone}>
      {items.map((r) => (
        <li key={r.title} className={styles.result}>
          <p className={styles.kind}>
            <span className={styles.dot} aria-hidden="true" />
            {r.kind}
          </p>
          <p className={styles.resultTitle}>{r.title}</p>
          <p className={styles.meta}>{r.meta}</p>
        </li>
      ))}
    </ol>
  );
}

/**
 * Before / after, told on the page that matters: an illustrative first
 * page of results for a name. Scroll wipes the managed page across the
 * neglected one — same query, different first impression. Note that the
 * critical review isn't hidden in the "after": it's answered.
 */
export function ReputationResults() {
  return (
    <ReputationResultsMotion className={styles.section}>
      <div className={styles.pin} data-rr-pin>
        <header className={styles.head}>
          <p className="label kicker">
            <span className="kicker-index">02</span> First impressions
          </p>
          <h2 className={styles.title} id="reputation-results-title" data-rr-fade>
            The first page <span className="accent">is the first meeting.</span>
          </h2>
          <p className={styles.body} data-rr-fade>
            Same name, same search. On the left, a reputation left to chance. On the right, one that&rsquo;s been
            looked after — accurate, current and answered.
          </p>
          <p className={`label ${styles.note}`} data-rr-fade>
            Illustration — not a client result
          </p>
        </header>

        <div className={styles.panel} data-rr-panel>
          <div className={styles.search}>
            <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.glass}>
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="M15.5 15.5 21 21" />
            </svg>
            <span className={styles.query}>{reputationResults.query}</span>
            <span className={`label ${styles.state}`} aria-hidden="true">
              <span data-rr-state="before">Unmanaged</span>
              <span data-rr-state="after">Managed</span>
            </span>
          </div>

          <div className={styles.layers}>
            <div className={styles.layer} data-rr-before>
              <h3 className={`label ${styles.layerLabel}`}>Before</h3>
              <Results items={reputationResults.before} tone="before" />
            </div>
            <div className={`${styles.layer} ${styles.after}`} data-rr-after>
              <h3 className={`label ${styles.layerLabel}`}>After</h3>
              <Results items={reputationResults.after} tone="after" />
            </div>
            <span className={styles.handle} data-rr-handle aria-hidden="true">
              <span className={styles.grip}>Before | After</span>
            </span>
          </div>
        </div>
      </div>
    </ReputationResultsMotion>
  );
}
