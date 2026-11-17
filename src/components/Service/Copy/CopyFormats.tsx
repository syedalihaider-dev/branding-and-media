import { copyFormats } from "@/content/services/copywriting";
import { pad } from "../Words";
import { CopyFormatsMotion } from "./CopyFormatsMotion";
import styles from "./CopyFormats.module.css";

/**
 * What we write — typography takes over the viewport. Each format is one
 * enormous outlined word that fills with ink as it reaches the centre,
 * with the line we'd want it to say beside it.
 * Desktop: pinned, travels sideways. Narrow: a vertical run of words.
 */
export function CopyFormats() {
  return (
    <CopyFormatsMotion className={styles.formats}>
      <div className={styles.pin} data-cf-pin>
        <div className={styles.track} data-cf-track>
          <header className={styles.opener}>
            <p className="label kicker">
              <span className="kicker-index">02</span> What we write
            </p>
            <h2 className={styles.title} id="copy-formats-title">
              Six formats. <span className="accent">One message.</span>
            </h2>
            <p className={styles.intro}>
              The channel changes the length and the rhythm. It never changes what you stand for.
            </p>
          </header>

          {copyFormats.map((f, i) => (
            <article key={f.word} className={styles.panel} data-cf-panel aria-labelledby={`cf-${i}`}>
              <p className={`label ${styles.num}`}>
                {pad(i + 1)} / {pad(copyFormats.length)}
              </p>
              <h3 className={styles.word} id={`cf-${i}`} data-cf-word>
                {f.word}
              </h3>
              <div className={styles.copy}>
                <p className={styles.line}>&ldquo;{f.line}&rdquo;</p>
                <p className={styles.body}>{f.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </CopyFormatsMotion>
  );
}
