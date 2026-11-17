import { paidChannels } from "@/content/services/paid";
import { PaidChannelsMotion } from "./PaidChannelsMotion";
import styles from "./PaidChannels.module.css";

/**
 * Channels at speed: two bands of type running in opposite directions.
 * Scroll velocity accelerates and shears them — the page literally
 * responds to momentum.
 */
export function PaidChannels() {
  const row = (outline: boolean) =>
    [0, 1].map((copy) => (
      <span key={copy} className={styles.set} aria-hidden={copy === 1 || undefined}>
        {paidChannels.map((c, i) => (
          <span key={c} className={styles.word}>
            <span className={outline === (i % 2 === 0) ? "stroke" : undefined}>{c}</span>
            <span className={styles.sep}>→</span>
          </span>
        ))}
      </span>
    ));

  return (
    <PaidChannelsMotion className={styles.channels}>
      <h2 className={`label kicker ${styles.kicker}`} id="paid-channels-title">
        <span className="kicker-index">02</span> Where we buy attention
      </h2>
      <ul className="sr-only">
        {paidChannels.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      <div className={styles.band} data-pc-band="0" aria-hidden="true">
        <div className={styles.track} data-pc-track>
          {row(false)}
        </div>
      </div>
      <div className={styles.band} data-pc-band="1" aria-hidden="true">
        <div className={styles.track} data-pc-track>
          {row(true)}
        </div>
      </div>
    </PaidChannelsMotion>
  );
}
