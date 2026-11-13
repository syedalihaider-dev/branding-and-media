import Image from "next/image";
import { ambientClients, press, reviewPlatforms, stations } from "@/content/gallery";
import { ClientsMotion } from "./ClientsMotion";
import { GalleryVisual } from "./GalleryVisual";
import styles from "./Clients.module.css";

/**
 * Clients — a gallery you travel through.
 * Real client identities hang as typography in a dark hall, each under
 * its own pool of light; their work unveils behind them, their own words
 * surface in the HUD, everyone else on the roster drifts past in the
 * periphery, and the walk ends inside a slow ring of the press.
 *
 * All content lives in the DOM (HUD panels) — WebGL is atmosphere. With
 * reduced motion or no WebGL the same markup lays out as an editorial index.
 */
export function Clients() {
  const total = String(stations.length).padStart(2, "0");
  return (
    <ClientsMotion className={styles.clients} id="clients">
      <div className={styles.stage} data-gallery-stage>
        <GalleryVisual />
        <div className={styles.vignette} aria-hidden="true" />

        <header className={styles.intro} data-gallery-intro>
          <p className={`label ${styles.kicker}`}>
            <span className={styles.kickerIndex}>04</span> Clients &amp; press
          </p>
          <h2 className={styles.title} id="clients-title">
            <span className={styles.line}>
              <span data-intro-line>Hundreds of clients.</span>
            </span>
            <span className={styles.line}>
              <span data-intro-line>
                <em className="serif italic">One standard.</em>
              </span>
            </span>
          </h2>
          <p className={styles.lede} data-intro-lede>
            A walk through some of the people and companies we&rsquo;ve built — in their work, and in their own words.
          </p>
        </header>

        <ol className={styles.stations}>
          {stations.map((s, i) => (
            <li
              key={s.id}
              className={styles.station}
              data-station={i}
              data-side={i % 2 === 0 ? "left" : "right"}
              data-kind={s.quote ? "voice" : "work"}
            >
              <p className={`label ${styles.stationLabel}`} data-hud>
                <span className={styles.stationIndex}>
                  {String(i + 1).padStart(2, "0")} / {total}
                </span>
                {s.context}
              </p>
              <h3 className={`${styles.stationName} ${s.type === "serif" ? styles.serifName : ""}`}>
                <span className={styles.line}>
                  <span data-hud-name>{s.name}</span>
                </span>
              </h3>
              {s.image && (
                <figure className={styles.still}>
                  <Image src={s.image.src} alt={s.image.alt} width={s.image.width} height={s.image.height} sizes="(max-width: 767px) 92vw, 40vw" />
                </figure>
              )}
              {s.quote ? (
                <blockquote className={styles.quote} data-hud>
                  <p>&ldquo;{s.quote}&rdquo;</p>
                </blockquote>
              ) : (
                <p className={styles.detail} data-hud>
                  {s.detail}
                </p>
              )}
            </li>
          ))}
        </ol>

        <div className={styles.finale} data-gallery-finale>
          <p className={`label ${styles.finaleLabel}`} data-finale-item>
            As seen in
          </p>
          <ul className={styles.press} data-finale-item>
            {press.map((p, i) => (
              <li key={p} className={i % 2 ? "serif italic" : undefined}>
                {p}
              </li>
            ))}
          </ul>
          <p className={styles.also} data-finale-item>
            <span className="label">Also built with</span> {ambientClients.join(" · ")}
          </p>
          <p className={styles.reviews} data-finale-item>
            Reviewed on {reviewPlatforms.slice(0, -1).join(", ")} and {reviewPlatforms.at(-1)}
          </p>
        </div>

        <div className={styles.rail} aria-hidden="true">
          <ol className={styles.ticks}>
            {stations.map((s, i) => (
              <li key={s.id} data-tick={i}>
                <span className={styles.tickName}>{s.name}</span>
              </li>
            ))}
          </ol>
          <span className={styles.railLine}>
            <span data-gallery-progress />
          </span>
        </div>
      </div>
    </ClientsMotion>
  );
}
