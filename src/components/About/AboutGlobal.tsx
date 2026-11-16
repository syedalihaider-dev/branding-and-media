import { offices, officeCount } from "@/content/site";
import { AboutGlobalMotion } from "./AboutGlobalMotion";
import styles from "./AboutGlobal.module.css";

/**
 * Where we are — the map is typographic. Each region is a line of city
 * names that slides against its neighbours as you scroll: a sense of
 * many places moving at once, without a single pin or globe cliché.
 */
export function AboutGlobal() {
  return (
    <AboutGlobalMotion className={styles.global}>
      <header className={styles.head}>
        <p className="label kicker">
          <span className="kicker-index">05</span> Where we are
        </p>
        <h2 className={styles.title} id="global-title">
          We are <em className="serif italic">glocalized.</em>
        </h2>
        <p className={styles.lede}>
          A truly global integrated marketing and communication agency — with people on the ground in the markets
          that matter to you.
        </p>
      </header>

      <div className={styles.rows} aria-hidden="true">
        {offices.map((o, i) => (
          <div key={o.region} className={styles.row} data-ag-row={i}>
            <div className={styles.track} data-ag-track>
              {[0, 1].map((rep) => (
                <span key={rep} className={styles.run}>
                  <span className={`${styles.region} serif italic`}>{o.region}</span>
                  {o.cities.map((c, ci) => (
                    <span key={c} className={styles.cityWrap}>
                      <span className={(ci + i) % 2 ? `${styles.city} stroke` : styles.city}>{c}</span>
                      <i className={styles.dot} />
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.index}>
        <dl className={styles.stats}>
          <div>
            <dt className="label">Regions</dt>
            <dd>{String(offices.length).padStart(2, "0")}</dd>
          </div>
          <div>
            <dt className="label">Locations</dt>
            <dd>{officeCount}</dd>
          </div>
        </dl>
        <ul className={styles.list} aria-label="Office locations">
          {offices.map((o) => (
            <li key={o.region}>
              <span className={styles.listRegion}>{o.region}</span>
              <span>{o.cities.join(", ")}</span>
            </li>
          ))}
        </ul>
      </div>
    </AboutGlobalMotion>
  );
}
