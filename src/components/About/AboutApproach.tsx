import { steps } from "@/content/about";
import { AboutApproachMotion } from "./AboutApproachMotion";
import styles from "./AboutApproach.module.css";

const themeFor = (tone: (typeof steps)[number]["theme"]) => (tone === "paper" ? "light" : tone);

/**
 * How we work — four steps as a stack of full-screen sheets.
 * Each new step slides over the last, which recedes into the dark: the
 * process literally builds on itself, ending on signal orange.
 */
export function AboutApproach() {
  const total = String(steps.length).padStart(2, "0");
  return (
    <AboutApproachMotion className={styles.approach}>
      <header className={styles.intro} data-theme="light">
        <p className="label kicker">
          <span className="kicker-index">03</span> How we work
        </p>
        <h2 className={styles.introTitle} id="approach-steps-title">
          Four steps. <em className="serif italic">Zero</em> guesswork.
        </h2>
        <p className={styles.introBody}>
          We keep it simple and focused on your goals — so you always know where you are, and what comes next.
        </p>
      </header>

      <ol className={styles.deck}>
        {steps.map((s, i) => (
          <li
            key={s.title}
            className={styles.panel}
            data-tone={s.theme}
            data-theme={themeFor(s.theme)}
            data-ap-panel
          >
            <div className={styles.inner} data-ap-inner>
              <p className={`label ${styles.meta}`}>
                <span className="kicker-index">Step {String(i + 1).padStart(2, "0")}</span>
                <span>/ {total}</span>
              </p>

              <span className={`${styles.numeral} stroke`} aria-hidden="true" data-ap-num>
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className={styles.copy}>
                <h3 className={styles.stepTitle} data-ap-title>
                  {s.title}
                  {s.accent ? (
                    <>
                      {s.accent === "." ? "" : " "}
                      <em className="serif italic">{s.accent}</em>
                    </>
                  ) : null}
                </h3>
                <p className={styles.stepBody} data-ap-body>
                  {s.body}
                </p>
              </div>

              <div className={styles.progress} aria-hidden="true">
                <i style={{ transform: `scaleX(${(i + 1) / steps.length})` }} />
              </div>
            </div>
            <div className={styles.dim} data-ap-dim aria-hidden="true" />
          </li>
        ))}
      </ol>
    </AboutApproachMotion>
  );
}
