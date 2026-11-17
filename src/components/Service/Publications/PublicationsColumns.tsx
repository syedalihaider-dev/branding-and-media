import { publicationsColumns } from "@/content/services/publications";
import { pad } from "../Words";
import { PublicationsColumnsMotion } from "./PublicationsColumnsMotion";
import styles from "./PublicationsColumns.module.css";

const COLS = 3;

/**
 * Where a story can run — laid out as a broadsheet: three columns of
 * short "articles" separated by rules. On scroll each column drifts at its
 * own pace, so the page reads like layered newsprint sliding into register.
 */
export function PublicationsColumns() {
  const columns = Array.from({ length: COLS }, (_, c) => publicationsColumns.filter((_, i) => i % COLS === c));
  return (
    <PublicationsColumnsMotion className={styles.columns}>
      <header className={styles.head}>
        <p className="label kicker">
          <span className="kicker-index">04</span> Where your story runs
        </p>
        <h2 className={styles.title} id="publications-columns-title" data-pc-title>
          Six ways <span className="accent">into print.</span>
        </h2>
        <p className={styles.dek}>
          Different stories suit different pages. We match each one to the format — and the desk — where it will be
          read properly.
        </p>
      </header>

      <div className={styles.page}>
        {columns.map((col, c) => (
          <div key={c} className={styles.col} data-pc-col={c}>
            {c > 0 ? <span className={styles.rule} data-pc-rule aria-hidden="true" /> : null}
            {col.map((item) => {
              const n = publicationsColumns.indexOf(item) + 1;
              return (
                <article key={item.kicker} className={styles.story} data-pc-story>
                  <p className={styles.kicker}>
                    <span>{pad(n)}</span> {item.kicker}
                  </p>
                  <h3 className={styles.storyTitle}>{item.title}</h3>
                  <p className={styles.storyBody}>{item.body}</p>
                </article>
              );
            })}
          </div>
        ))}
      </div>
    </PublicationsColumnsMotion>
  );
}
