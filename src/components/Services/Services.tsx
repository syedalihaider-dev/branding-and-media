import { services } from "@/content/site";
import { ServicesMotion } from "./ServicesMotion";
import { ServiceVisual } from "./ServiceVisual";
import styles from "./Services.module.css";

export function Services() {
  const total = String(services.length).padStart(2, "0");
  return (
    <ServicesMotion className={styles.services} id="services">
      <div className={styles.pin} data-svc-pin>
        <div className={styles.hud} data-svc-hud>
          <h2 className={`label ${styles.hudTitle}`} id="services-title">
            <span className={styles.hudIndex}>02</span> Services
          </h2>
          <p className={`label ${styles.hudCount}`} aria-hidden="true">
            <span className={styles.hudCurrent}>
              <span data-svc-current>01</span>
            </span>{" "}
            / {total}
          </p>
        </div>

        {services.map((s, i) => (
          <article
            key={s.id}
            className={styles.panel}
            data-world={s.id}
            data-svc-panel={i}
            data-theme-static={s.id === "marketing" ? "signal" : s.theme}
            aria-labelledby={`svc-${s.id}`}
          >
            <div className={styles.inner} data-svc-inner>
              <div className={styles.visual} aria-hidden="true">
                <ServiceVisual world={s.id} />
              </div>

              <h3 className={styles.word} id={`svc-${s.id}`} data-svc-word>
                <span className="sr-only">{s.title}</span>
                <span className={styles.wordInner} aria-hidden="true" data-svc-fit>
                  {Array.from(s.title).map((ch, ci) => (
                    <span key={ci} className={styles.char} data-svc-char>
                      {ch === " " ? " " : ch}
                    </span>
                  ))}
                </span>
              </h3>

              <div className={styles.info} data-svc-info>
                <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
                <p className={styles.lede}>{s.lede}</p>
                <ul className={styles.items}>
                  {s.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </ServicesMotion>
  );
}
