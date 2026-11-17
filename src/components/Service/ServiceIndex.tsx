import type { Capability, Tone, Words as WordsType } from "@/content/services/types";
import { headerThemeFor } from "@/content/services/types";
import { Words, pad } from "./Words";
import { ServiceIndexMotion } from "./ServiceIndexMotion";
import styles from "./ServiceIndex.module.css";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

/**
 * What a service includes, set as an index rather than a card grid.
 *  rows:     numbered editorial rows; on hover a row floods with ink.
 *  contents: a book's table of contents — roman chapters, dotted leaders.
 */
export function ServiceIndex({
  id,
  index,
  label,
  title,
  intro,
  items,
  tone = "bone",
  variant = "rows",
}: {
  id: string;
  index: number;
  label: string;
  title: WordsType;
  intro: string;
  items: Capability[];
  tone?: Tone;
  variant?: "rows" | "contents";
}) {
  return (
    <ServiceIndexMotion
      className={styles.index}
      data-variant={variant}
      data-svc-tone={tone}
      data-theme={headerThemeFor(tone)}
      aria-labelledby={id}
    >
      <header className={styles.head}>
        <p className="label kicker">
          <span className="kicker-index">{pad(index)}</span> {label}
        </p>
        <h2 className={styles.title} id={id} data-sx-title>
          <Words words={title} />
        </h2>
        <p className={styles.intro} data-sx-fade>
          {intro}
        </p>
        <p className={`label ${styles.count}`} data-sx-fade>
          {pad(items.length)} {variant === "contents" ? "chapters" : "disciplines"}
        </p>
      </header>

      <ol className={styles.list}>
        {items.map((item, i) => (
          <li key={item.title} className={styles.row} data-sx-row>
            <span className={styles.rowRule} data-sx-rule aria-hidden="true" />
            <span className={styles.num} aria-hidden="true">
              {variant === "contents" ? ROMAN[i] : pad(i + 1)}
            </span>
            <h3 className={styles.name}>
              <span>{item.title}</span>
              {variant === "contents" ? <span className={styles.leader} aria-hidden="true" /> : null}
            </h3>
            <div className={styles.copy}>
              <p>{item.body}</p>
              {item.tags?.length ? (
                <ul className={styles.tags} aria-label="Includes">
                  {item.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </ServiceIndexMotion>
  );
}
