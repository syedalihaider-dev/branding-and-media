import Image from "next/image";
import { WebHeroMotion } from "./WebHeroMotion";
import styles from "./WebHero.module.css";

/**
 * Web Design & Development — opening.
 * A website drawn as architecture: four layers (grid, structure, interface,
 * live browser) float apart in axonometric. Scrolling rotates the drawing
 * flat and collapses the layers into one finished, working page — the
 * process, compressed into a single camera move.
 */
export function WebHero() {
  return (
    <WebHeroMotion className={styles.hero}>
      <div className={styles.pin} data-wh-pin>
        <div className={styles.blueprint} aria-hidden="true" />

        <div className={styles.top} data-wh-fade>
          <p className="label kicker">
            <span className="kicker-index">01</span> Digital Growth &amp; Marketing
          </p>
          <p className={`label ${styles.readout}`} aria-hidden="true">
            Viewport <span data-wh-viewport>— × —</span>
          </p>
        </div>

        <h1 className={styles.title} id="web-hero-title">
          <span className={`label ${styles.eyebrow}`} data-wh-fade>
            Web Design &amp; Development
          </span>
          <span className={styles.line}>
            <span data-wh-line>Built to be</span>
          </span>
          <span className={styles.line}>
            <span data-wh-line className="accent">
              lived in.
            </span>
          </span>
        </h1>

        <div className={styles.stage} data-wh-stage aria-hidden="true">
          <div className={styles.tilt} data-wh-tilt>
            <div className={styles.stack} data-wh-stack>
              {/* 01 — the grid every decision snaps to */}
              <div className={`${styles.plane} ${styles.pGrid}`} style={{ "--i": 0 } as React.CSSProperties}>
                <span className={styles.tag} data-wh-tag>
                  01 — Grid
                </span>
                {Array.from({ length: 12 }, (_, i) => (
                  <i key={i} />
                ))}
              </div>

              {/* 02 — structure: wireframe */}
              <div
                className={`${styles.plane} ${styles.pWire}`}
                style={{ "--i": 1 } as React.CSSProperties}
                data-wh-wire
              >
                <span className={styles.tag} data-wh-tag>
                  02 — Structure
                </span>
                <span className={styles.wNav} />
                <span className={styles.wHead} />
                <span className={styles.wHead2} />
                <span className={styles.wBtn} />
                <span className={styles.wImg}>
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 0 L100 100 M100 0 L0 100" />
                  </svg>
                </span>
                <span className={styles.wCol} />
                <span className={styles.wCol} />
                <span className={styles.wCol} />
              </div>

              {/* 03 — interface: type, image, action */}
              <div className={`${styles.plane} ${styles.pUi}`} style={{ "--i": 2 } as React.CSSProperties}>
                <span className={styles.tag} data-wh-tag>
                  03 — Interface
                </span>
                <span className={styles.uiNav}>
                  <b>Your Name</b>
                  <span>Work · About · Journal · Contact</span>
                </span>
                <span className={styles.uiHead}>
                  Your story,
                  <em>beautifully built.</em>
                </span>
                <span className={styles.uiBtn}>Explore →</span>
                <span className={styles.uiImg}>
                  <Image src="/media/editorial/stairs.webp" alt="" fill sizes="22vw" />
                </span>
                <span className={styles.uiCols}>
                  <span>01 Strategy</span>
                  <span>02 Design</span>
                  <span>03 Build</span>
                </span>
              </div>

              {/* 04 — live: the browser around it */}
              <div className={`${styles.plane} ${styles.pLive}`} style={{ "--i": 3 } as React.CSSProperties}>
                <span className={styles.tag} data-wh-tag>
                  04 — Live
                </span>
                <span className={styles.chrome}>
                  <span className={styles.url}>
                    <i /> yourname.com
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.foot} data-wh-fade>
          <p className={styles.lead}>
            We design and build websites the way architects design buildings — around the people who&rsquo;ll move
            through them. Clear structure, considered detail, and code that holds up under real traffic.
          </p>
          <dl className={styles.facts}>
            <div>
              <dt className="label">Disciplines</dt>
              <dd>UX/UI · Development · CX · Apps</dd>
            </div>
            <div>
              <dt className="label">Built for</dt>
              <dd>Authors · Founders · Companies</dd>
            </div>
          </dl>
        </div>
      </div>
    </WebHeroMotion>
  );
}
