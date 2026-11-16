import Image from "next/image";
import Link from "next/link";
import { practiceStills } from "@/content/about";
import { prefetchFor, serviceGroups } from "@/content/navigation";
import { AboutPracticesMotion } from "./AboutPracticesMotion";
import styles from "./AboutPractices.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * What we do — the three practices. Sticky storytelling: the picture
 * holds while the practices scroll past and changes with each one.
 */
export function AboutPractices() {
  return (
    <AboutPracticesMotion className={styles.practices}>
      <header className={styles.head}>
        <p className="label kicker">
          <span className="kicker-index">04</span> What we do
        </p>
        <h2 className={styles.title} id="practices-title">
          Three practices. <em className="serif italic">One</em> agency.
        </h2>
        <p className={styles.lede}>
          Everything a brand needs to be found, be heard and be read — organised into three practices that work as
          one team.
        </p>
      </header>

      <div className={styles.body}>
        <div className={styles.visual} aria-hidden="true">
          <div className={styles.visualFrame}>
            {serviceGroups.map((g, i) => (
              <div key={g.id} className={styles.shot} data-ap-shot={i}>
                <Image src={practiceStills[g.id].src} alt="" fill sizes="(min-width: 1100px) 45vw, 1px" />
              </div>
            ))}
            <span className={styles.counter}>
              <span className={styles.counterTrack} data-ap-counter>
                {serviceGroups.map((g, i) => (
                  <span key={g.id}>{pad(i + 1)}</span>
                ))}
              </span>
            </span>
          </div>
        </div>

        <div className={styles.groups}>
          {serviceGroups.map((g, i) => (
            <article key={g.id} className={styles.group} data-ap-group={i} aria-labelledby={`practice-${g.id}`}>
              <figure className={styles.inlineFig}>
                <Image
                  src={practiceStills[g.id].src}
                  alt={practiceStills[g.id].alt}
                  fill
                  sizes="(max-width: 1099.98px) 92vw, 1px"
                />
              </figure>
              <p className={`label ${styles.groupMeta}`}>
                <span className="kicker-index">{pad(i + 1)}</span> Practice
              </p>
              <h3 className={styles.groupTitle} id={`practice-${g.id}`}>
                {g.lockup[0]} <em className="serif italic">{g.lockup[1]}</em>
              </h3>
              <p className={styles.groupDesc}>{g.description}</p>
              <ul className={styles.services}>
                {g.services.map((s, si) => (
                  <li key={s.href}>
                    <Link href={s.href} prefetch={prefetchFor(s.href)} className={styles.service}>
                      <span className={styles.serviceNum}>{pad(si + 1)}</span>
                      <span className={styles.serviceName}>{s.label}</span>
                      <span className={styles.serviceArrow} aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </AboutPracticesMotion>
  );
}
