import { clients, press, reviewPlatforms, testimonials } from "@/content/site";
import { Split } from "@/components/ui/Split";
import { ClientsMotion } from "./ClientsMotion";
import styles from "./Clients.module.css";

function PressRow({ reverse }: { reverse?: boolean }) {
  const items = reverse ? [...press].reverse() : press;
  // Content is duplicated once so the loop can wrap seamlessly.
  return (
    <div className={styles.row} data-marquee={reverse ? -1 : 1} aria-hidden="true">
      <div className={styles.rowInner} data-marquee-inner>
        {[0, 1].map((dup) =>
          items.map((name, i) => (
            <span key={`${dup}-${name}`} className={styles.pressItem}>
              <span className={(i + (reverse ? 1 : 0)) % 2 ? "serif italic" : styles.pressSans}>{name}</span>
              <span className={styles.pressSep}>✳</span>
            </span>
          )),
        )}
      </div>
    </div>
  );
}

export function Clients() {
  return (
    <ClientsMotion className={styles.clients}>
      <header className={styles.head}>
        <p className={`label ${styles.kicker}`}>
          <span className={styles.kickerIndex}>04</span> Clients &amp; press
        </p>
        <h2 className={styles.title} id="clients-title">
          Hundreds of clients. <em className="serif italic">One standard.</em>
        </h2>
      </header>

      <div className={styles.press}>
        <p className={`label ${styles.pressLabel}`}>As seen in</p>
        <p className="sr-only">As seen in {press.join(", ")}.</p>
        <PressRow />
        <PressRow reverse />
      </div>

      <div className={styles.wallWrap}>
        <p className={`label ${styles.wallLabel}`}>A few of the brands we&rsquo;ve built with</p>
        <ul className={styles.wall} data-wall>
          {clients.map((c, i) => (
            <li key={c} data-wall-item>
              <sup>{String(i + 1).padStart(2, "0")}</sup>
              {c}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.voices}>
        <div className={styles.voicesHead}>
          <h3 className={styles.voicesTitle}>
            In their <em className="serif italic">words</em>
          </h3>
          <p className={styles.reviews}>
            Reviewed on {reviewPlatforms.slice(0, -1).join(", ")} and {reviewPlatforms.at(-1)}
          </p>
        </div>
        <div className={styles.quotes}>
          {testimonials.map((t) => (
            <figure key={t.name} className={styles.quote} data-quote>
              <blockquote>
                <Split text={`“${t.quote}”`} as="p" className={styles.quoteText} />
              </blockquote>
              <figcaption className={styles.cite}>
                <span className={styles.citeName}>{t.name}</span>
                <span className={styles.citeContext}>{t.context}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </ClientsMotion>
  );
}
