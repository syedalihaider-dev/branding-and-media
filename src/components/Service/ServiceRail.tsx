import type { Step, Tone, Words as WordsType } from "@/content/services/types";
import { headerThemeFor } from "@/content/services/types";
import { Words, pad } from "./Words";
import { ServiceRailMotion } from "./ServiceRailMotion";
import styles from "./ServiceRail.module.css";

/**
 * Process as a journey you travel sideways (desktop: pinned horizontal
 * scroll; touch: a vertical sequence). A rail runs the length of the
 * track and fills as you go.
 *  blueprint: drafting grid, coordinates — for build work.
 *  velocity:  signal ground; panels shear with scroll speed — for performance work.
 */
export function ServiceRail({
  id,
  index,
  label,
  title,
  intro,
  steps,
  tone = "ink",
  variant = "blueprint",
}: {
  id: string;
  index: number;
  label: string;
  title: WordsType;
  intro: string;
  steps: Step[];
  tone?: Tone;
  variant?: "blueprint" | "velocity";
}) {
  return (
    <ServiceRailMotion
      className={styles.rail}
      data-variant={variant}
      data-svc-tone={tone}
      data-theme={headerThemeFor(tone)}
      aria-labelledby={id}
    >
      <div className={styles.pin} data-sr-pin>
        <div className={styles.grid} aria-hidden="true" />
        <div className={styles.track} data-sr-track>
          <header className={styles.opener}>
            <p className="label kicker">
              <span className="kicker-index">{pad(index)}</span> {label}
            </p>
            <h2 className={styles.title} id={id} data-sr-title>
              <Words words={title} />
            </h2>
            <p className={styles.intro}>{intro}</p>
            <p className={`label ${styles.hint}`} aria-hidden="true">
              <span>Scroll</span>
              <span className={styles.hintLine} />
            </p>
          </header>

          <ol className={styles.steps}>
            {steps.map((s, i) => (
              <li key={s.title} className={styles.step} data-sr-step>
                <p className={`label ${styles.coord}`} aria-hidden="true">
                  {variant === "blueprint" ? `x ${pad(i + 1)}0 / y 00` : `Phase ${pad(i + 1)}`}
                </p>
                <span className={`${styles.numeral} stroke`} aria-hidden="true" data-sr-num>
                  {pad(i + 1)}
                </span>
                <div className={styles.copy}>
                  <h3 className={styles.stepTitle}>
                    <span className="sr-only">Step {i + 1}: </span>
                    {s.title}
                  </h3>
                  <p className={styles.stepBody}>{s.body}</p>
                </div>
                <span className={styles.node} aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>
        <div className={styles.progress} aria-hidden="true">
          <i data-sr-progress />
        </div>
      </div>
    </ServiceRailMotion>
  );
}
