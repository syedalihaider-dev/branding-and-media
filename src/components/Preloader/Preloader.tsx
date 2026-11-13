import { offices, site } from "@/content/site";
import { PreloaderMotion } from "./PreloaderMotion";
import { FRAGMENTS, SCENES } from "./sequence";
import styles from "./Preloader.module.css";

/**
 * Runs during HTML parse, before first paint of the hero:
 *  - only motion-OK visitors get the opening (reduced motion / no JS skip it)
 *  - repeat visits in the same session get a shortened cut
 *  - a failsafe releases the page if the client bundle never claims it
 */
const bootScript = `(function(){try{var d=document.documentElement;if(!matchMedia('(prefers-reduced-motion: no-preference)').matches)return;d.setAttribute('data-preloader','active');try{if(sessionStorage.getItem('bm:opened'))d.setAttribute('data-preloader-repeat','')}catch(e){}setTimeout(function(){if(!window.__bmPreloader&&d.getAttribute('data-preloader')==='active')d.setAttribute('data-preloader','done')},7000)}catch(e){}})();`;

const WORD_A = Array.from("Branding");
const WORD_B = Array.from("Media");

const cities = offices.flatMap((o) => o.cities);

// The ampersand comes first so, coplanar at rest, it sits *behind* the
// words exactly as it does in the hero.
const letters = () => (
  <>
    <span className={`${styles.amp} serif italic`} data-pl-amp>
      &amp;
    </span>
    {WORD_A.map((c, i) => (
      <span key={`a${i}`} className={styles.letter} data-pl-letter data-word="a">
        {c}
      </span>
    ))}
    {WORD_B.map((c, i) => (
      <span key={`b${i}`} className={styles.letter} data-pl-letter data-word="b">
        {c}
      </span>
    ))}
  </>
);

/**
 * The opening — a four-scene title sequence named after the brand journey:
 *
 *   01 Idea      giant, cropped letterforms drift in and cross; where they
 *                overlap they invert (difference blend), like light leaks
 *   02 Strategy  the camera pulls back: fragments fly down onto their
 *                letters while the rest of BRANDING arrives from deep space
 *   03 Brand     the signal ampersand and MEDIA rise out of depth into the
 *                exact composition of the hero headline
 *   04 Impact    a hot signal line sweeps the dark away to reveal the live
 *                hero; each letter ignites as the line crosses it, then
 *                cools to bone — already sitting exactly on the real headline
 *
 * No WebGL, no images, no extra fonts: DOM type + GSAP transforms only.
 */
export function Preloader() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      <PreloaderMotion className={styles.root}>
        <div className={styles.solid} data-pl-solid>
          <div className={styles.veil} data-pl-veil />
          <div className={styles.glow} data-pl-glow />

          <div className={styles.frags} data-pl-frags>
            {FRAGMENTS.map((f) => (
              <span
                key={f.index}
                className={styles.frag}
                style={{ "--fs": f.fs } as React.CSSProperties}
                data-pl-frag={f.index}
              >
                {f.ch}
              </span>
            ))}
          </div>

          <div className={styles.stage}>
            <div className={styles.type} data-pl-type="solid">
              {letters()}
            </div>
          </div>

          <span className={styles.wipe} data-pl-wipe />

          <div className={styles.chrome} data-pl-chrome>
            <div className={styles.top}>
              <span className="label">{site.shortName}</span>
              <span className={`label ${styles.descriptor}`}>{site.descriptor}</span>
            </div>
            <div className={styles.bottom}>
              <ol className={styles.cities}>
                {cities.map((c) => (
                  <li key={c} data-pl-city>
                    {c}
                  </li>
                ))}
              </ol>
              <p className={styles.slate}>
                <span className={styles.slateIndex} data-pl-slate-index>
                  01
                </span>
                <span className={styles.slateOf}>/ 04</span>
                <span className={styles.slateMask}>
                  <span className="serif italic" data-pl-slate>
                    {SCENES[0]}
                  </span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </PreloaderMotion>
    </>
  );
}
