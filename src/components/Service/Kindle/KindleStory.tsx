import { kindleStory } from "@/content/services/kindle";
import { KindleStoryMotion } from "./KindleStoryMotion";
import styles from "./KindleStory.module.css";

const ROMAN = ["I", "II", "III", "IV", "V"];
const N = kindleStory.length;

/**
 * How a launch unfolds, told the way a book is read: an open spread whose
 * leaves turn as you scroll. Each right-hand page is a chapter of the
 * process; each turned leaf leaves its chapter mark on the left.
 * Narrow screens (and reduced motion) read it as a stack of pages.
 */
export function KindleStory() {
  return (
    <KindleStoryMotion className={styles.story}>
      <div className={styles.pin} data-ks-pin>
        <header className={styles.head}>
          <p className="label kicker">
            <span className="kicker-index">02</span> The story of a launch
          </p>
          <h2 className={styles.title} id="kindle-story-title">
            A launch, <span className="accent">in five chapters.</span>
          </h2>
        </header>

        <div className={styles.spread} data-ks-spread>
          <div className={`${styles.page} ${styles.left}`}>
            <span className={styles.chapter}>Prologue</span>
            <p className={styles.prologue}>
              Every campaign we run follows the shape of a good book: a strong opening, rising momentum, and an
              ending that sets up the sequel.
            </p>
            <span className={styles.folio}>i</span>
          </div>
          <div className={`${styles.page} ${styles.rightBase}`} aria-hidden="true" />

          <ol className={styles.leaves}>
            {kindleStory.map((s, i) => (
              <li
                key={s.title}
                className={styles.leaf}
                style={{ "--z": N - i } as React.CSSProperties}
                data-ks-leaf
              >
                <div className={`${styles.page} ${styles.front}`}>
                  <span className={styles.chapter}>{s.chapter}</span>
                  <h3 className={styles.leafTitle}>{s.title}</h3>
                  <p className={styles.leafBody}>{s.body}</p>
                  <span className={styles.folio}>{i * 2 + 1}</span>
                </div>
                <div className={`${styles.page} ${styles.back}`} aria-hidden="true">
                  <span className={styles.numeral}>{ROMAN[i]}</span>
                  <span className={styles.backLine}>{s.title}</span>
                  <span className={styles.folio}>{i * 2 + 2}</span>
                </div>
              </li>
            ))}
          </ol>
          <span className={styles.gutter} aria-hidden="true" />
        </div>
      </div>
    </KindleStoryMotion>
  );
}
