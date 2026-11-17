import Image from "next/image";
import { socialFormats } from "@/content/services/social";
import { SocialFormatsMotion } from "./SocialFormatsMotion";
import styles from "./SocialFormats.module.css";

/**
 * The formats we make, as a moving reel of vertical frames.
 * Desktop: pinned; frames travel sideways and swell as they cross the
 * centre (the one "in focus"). Touch: a native swipe strip with snap —
 * the way people already handle content on a phone.
 */
export function SocialFormats() {
  return (
    <SocialFormatsMotion className={styles.formats}>
      <div className={styles.pin} data-sf-pin>
        <header className={styles.head}>
          <p className="label kicker">
            <span className="kicker-index">02</span> Native by nature
          </p>
          <h2 className={styles.title} id="social-formats-title">
            Every format, <span className="accent">its own language.</span>
          </h2>
          <p className={styles.intro}>
            A carousel isn&rsquo;t a cropped ad, and a Reel isn&rsquo;t a trimmed TV spot. We make each format the way
            its audience actually watches.
          </p>
        </header>

        <div className={styles.viewport} data-sf-viewport>
          <ol className={styles.track} data-sf-track>
            {socialFormats.map((f, i) => (
              <li key={f.title} className={styles.item} data-sf-item>
                <div className={styles.frame} data-sf-frame>
                  <Image src={f.still.src} alt={f.still.alt} fill sizes="(min-width: 1100px) 22vw, 64vw" />
                  {f.video ? (
                    <span className={styles.play} aria-hidden="true">
                      ▶
                    </span>
                  ) : null}
                  <span className={styles.idx} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className={styles.name}>{f.title}</h3>
                <p className={styles.body}>{f.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </SocialFormatsMotion>
  );
}
