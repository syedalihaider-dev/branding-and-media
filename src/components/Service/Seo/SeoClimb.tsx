import { seoPillars } from "@/content/services/seo";
import { SeoClimbMotion } from "./SeoClimbMotion";
import styles from "./SeoClimb.module.css";

const COMPETITORS = 7;

/**
 * The climb. A results page in the abstract — anonymous grey listings
 * and one that's yours. As each pillar (technical, content, authority)
 * comes into play, your listing overtakes the others until it holds
 * position one. Explicitly illustrative: no claimed result.
 */
export function SeoClimb() {
  return (
    <SeoClimbMotion className={styles.climb}>
      <div className={styles.pin} data-sc-pin>
        <div className={styles.side}>
          <p className="label kicker">
            <span className="kicker-index">02</span> How rankings are won
          </p>
          <h2 className={styles.title} id="seo-climb-title">
            From buried <span className="accent">to position one.</span>
          </h2>

          <ol className={styles.pillars}>
            {seoPillars.map((p, i) => (
              <li key={p.title} className={styles.pillar} data-pillar={i}>
                <span className={styles.pIndex}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={styles.pTitle}>{p.title}</h3>
                <p className={styles.pBody}>{p.body}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.board} aria-hidden="true">
          <div className={styles.boardHead}>
            <span className="label">Position</span>
            <span className={styles.position}>
              <span className={styles.hash}>#</span>
              <span data-sc-pos>08</span>
            </span>
            <span className={`label ${styles.illus}`}>Illustration — not a client result</span>
          </div>

          <div className={styles.results} data-sc-results>
            {Array.from({ length: COMPETITORS }, (_, i) => (
              <div key={i} className={styles.result} data-sc-row={i} style={{ "--slot": i } as React.CSSProperties}>
                <span className={styles.rank} />
                <span className={styles.bars}>
                  <i style={{ width: `${62 - ((i * 13) % 28)}%` }} />
                  <i style={{ width: `${88 - ((i * 7) % 22)}%` }} />
                </span>
              </div>
            ))}
            <div className={`${styles.result} ${styles.you}`} data-sc-you style={{ "--slot": COMPETITORS } as React.CSSProperties}>
              <span className={styles.rank}>You</span>
              <span className={styles.youText}>
                <b>yourbrand.com</b>
                <span>The answer they were looking for — on page one.</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </SeoClimbMotion>
  );
}
