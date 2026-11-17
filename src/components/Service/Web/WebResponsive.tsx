import Image from "next/image";
import { WebResponsiveMotion } from "./WebResponsiveMotion";
import styles from "./WebResponsive.module.css";

/**
 * One idea, every screen. A real layout inside a frame that narrows from
 * desktop to tablet to phone as you scroll; container queries reflow it
 * live — this is responsive design actually happening, not a picture of it.
 */
export function WebResponsive() {
  return (
    <WebResponsiveMotion className={styles.section}>
      <div className={styles.pin} data-wr-pin>
        <header className={styles.copy}>
          <p className="label kicker">
            <span className="kicker-index">02</span> Responsive by design
          </p>
          <h2 className={styles.title} id="web-responsive-title">
            One idea. <span className="accent">Every</span> screen.
          </h2>
          <p className={styles.body}>
            Responsive isn&rsquo;t shrinking a desktop site until it fits. Each breakpoint is designed on purpose — so
            the phone version feels like the original, never the leftovers.
          </p>
          <dl className={styles.meter} aria-hidden="true">
            <div>
              <dt className="label">Device</dt>
              <dd data-wr-device>Desktop</dd>
            </div>
            <div>
              <dt className="label">Width</dt>
              <dd>
                <span data-wr-width>1440</span>
                <small>px</small>
              </dd>
            </div>
          </dl>
        </header>

        <div className={styles.bench} aria-hidden="true">
          <div className={styles.frame} data-wr-frame>
            <div className={styles.screen}>
              <div className={styles.site}>
                <div className={styles.nav}>
                  <b>Your Name</b>
                  <span className={styles.links}>Books · Speaking · Journal · Contact</span>
                  <span className={styles.burger}>
                    <i />
                    <i />
                  </span>
                </div>
                <div className={styles.heroRow}>
                  <div className={styles.heroText}>
                    <span className={styles.kick}>New — Spring edition</span>
                    <span className={styles.head}>
                      Every screen, <em>considered.</em>
                    </span>
                    <span className={styles.cta}>Read the first chapter →</span>
                  </div>
                  <div className={styles.heroImg}>
                    <Image src="/media/stills/screen.webp" alt="" fill sizes="(min-width: 1100px) 26vw, 60vw" />
                  </div>
                </div>
                <div className={styles.cards}>
                  {["Books", "Speaking", "Journal"].map((c, i) => (
                    <span key={c} className={styles.card}>
                      <small>0{i + 1}</small>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WebResponsiveMotion>
  );
}
