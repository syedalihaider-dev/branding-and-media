import { socialLoop } from "@/content/services/social";
import { SocialLoopMotion } from "./SocialLoopMotion";
import styles from "./SocialLoop.module.css";

const N = socialLoop.length;

/**
 * Social is a loop, not a line — so the process is drawn as one.
 * Desktop: pinned; the ring turns step by step to bring each stage to the
 * top while the centre tells it. Ends where it began: listening again.
 */
export function SocialLoop() {
  return (
    <SocialLoopMotion className={styles.loop}>
      <div className={styles.pin} data-sl-pin>
        <header className={styles.head}>
          <p className="label kicker">
            <span className="kicker-index">05</span> How we work
          </p>
          <h2 className={styles.title} id="social-loop-title">
            A loop, <span className="accent">not a line.</span>
          </h2>
          <p className={styles.intro}>
            Social never finishes. Every post teaches us something — and the next one is better for it.
          </p>
        </header>

        <div className={styles.dial} data-sl-dial>
          <div className={styles.ring} data-sl-ring aria-hidden="true">
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" className={styles.track} />
              <circle cx="50" cy="50" r="46" className={styles.arc} pathLength={1} data-sl-arc />
            </svg>
            {socialLoop.map((s, i) => (
              <span
                key={s.title}
                className={styles.node}
                style={{ "--a": `${(360 / N) * i}deg` } as React.CSSProperties}
                data-sl-node
              >
                <span className={styles.nodeLabel} data-sl-label>
                  <small>{String(i + 1).padStart(2, "0")}</small>
                  {s.title}
                </span>
              </span>
            ))}
          </div>

          <ol className={styles.centre}>
            {socialLoop.map((s, i) => (
              <li key={s.title} className={styles.step} data-sl-step>
                <span className={styles.stepNum} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepBody}>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </SocialLoopMotion>
  );
}
