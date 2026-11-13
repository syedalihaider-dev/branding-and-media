import { offices, site } from "@/content/site";
import { PreloaderMotion } from "./PreloaderMotion";
import styles from "./Preloader.module.css";

/**
 * Runs during HTML parse, before first paint of the hero:
 *  - only motion-OK visitors get the opening (reduced motion / no JS skip it)
 *  - repeat visits in the same session get a shortened cut
 *  - a failsafe releases the page if the client bundle never claims it
 */
const bootScript = `(function(){try{var d=document.documentElement;if(!matchMedia('(prefers-reduced-motion: no-preference)').matches)return;d.setAttribute('data-preloader','active');try{if(sessionStorage.getItem('bm:opened'))d.setAttribute('data-preloader-repeat','')}catch(e){}setTimeout(function(){if(!window.__bmPreloader&&d.getAttribute('data-preloader')==='active')d.setAttribute('data-preloader','done')},7000)}catch(e){}})();`;

const chars = (word: string, offset = 0) =>
  Array.from(word).map((c, i) => (
    <span key={i} className={styles.char} style={{ "--i": i + offset } as React.CSSProperties} data-pl-char>
      {c}
    </span>
  ));

const cities = offices.flatMap((o) => o.cities);

/**
 * Luxury preloader — "the studio lights come up".
 * The wordmark assembles in 3D space under a single travelling light while
 * the agency's twelve offices come online one by one (real loading
 * progress, not a fake counter). When the hero is ready, the screen splits
 * along the horizon and both words fly — FLIP-measured — into their exact
 * positions in the hero headline, so the loader *becomes* the hero.
 */
export function Preloader() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      <PreloaderMotion className={styles.preloader}>
        <div className={styles.panel} data-pl-panel="top" />
        <div className={`${styles.panel} ${styles.panelBottom}`} data-pl-panel="bottom" />
        <div className={styles.glow} data-pl-glow />
        <div className={styles.horizon} data-pl-horizon />

        <div className={styles.stage}>
          <div className={styles.mark} data-pl-mark>
            <span className={styles.line} data-pl-line="a">
              <span className={styles.word} data-pl-word="a">
                {chars("Branding")}
              </span>
            </span>
            <span className={styles.amp} data-pl-amp>
              <span className={styles.ampInner}>&amp;</span>
            </span>
            <span className={`${styles.line} ${styles.lineB}`} data-pl-line="b">
              <span className={styles.word} data-pl-word="b">
                {chars("Media", 8)}
              </span>
            </span>
          </div>
        </div>

        <div className={styles.top} data-pl-chrome>
          <span className="label">{site.shortName}</span>
          <span className={`label ${styles.descriptor}`}>{site.descriptor}</span>
        </div>

        <div className={styles.bottom} data-pl-chrome>
          <ol className={styles.cities}>
            {cities.map((c) => (
              <li key={c} data-pl-city>
                {c}
              </li>
            ))}
          </ol>
          <p className={styles.status}>
            <span className="serif italic">Setting the stage</span>
          </p>
        </div>
      </PreloaderMotion>
    </>
  );
}
