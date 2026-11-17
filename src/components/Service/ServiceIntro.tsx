import type { Tone, Words as WordsType } from "@/content/services/types";
import { headerThemeFor } from "@/content/services/types";
import { Words, pad } from "./Words";
import { ServiceIntroMotion } from "./ServiceIntroMotion";
import styles from "./ServiceIntro.module.css";

/**
 * The thinking behind a service, read in as you scroll: the statement
 * inks word by word, then the detail settles underneath.
 * `manuscript` sets it as a book's opening page — serif, drop cap.
 */
export function ServiceIntro({
  id,
  index,
  label,
  statement,
  body,
  asideTitle,
  aside,
  tone = "ink",
  variant = "editorial",
}: {
  id: string;
  index: number;
  label: string;
  statement: WordsType;
  body: string;
  asideTitle: string;
  aside: string[];
  tone?: Tone;
  variant?: "editorial" | "manuscript";
}) {
  return (
    <ServiceIntroMotion
      className={styles.intro}
      data-variant={variant}
      data-svc-tone={tone}
      data-theme={headerThemeFor(tone)}
      aria-labelledby={id}
    >
      <p className="label kicker">
        <span className="kicker-index">{pad(index)}</span> {label}
      </p>

      <h2 className={styles.statement} id={id}>
        <Words words={statement} />
      </h2>

      <div className={styles.detail}>
        <span className={styles.rule} data-si-rule aria-hidden="true" />
        <p className={styles.body} data-si-fade>
          {body}
        </p>
        <div className={styles.aside} data-si-fade>
          <h3 className="label">{asideTitle}</h3>
          <ul>
            {aside.map((a, i) => (
              <li key={a} data-si-item>
                <span className={styles.n}>{pad(i + 1)}</span>
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ServiceIntroMotion>
  );
}
