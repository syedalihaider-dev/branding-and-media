import { studioZones } from "@/content/contact";
import { offices, site } from "@/content/site";
import { LocalTime } from "@/components/ui/LocalTime";
import { ContactDirectMotion } from "./ContactDirectMotion";
import styles from "./ContactDirect.module.css";

const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.address.street}, ${site.address.locality}, ${site.address.region} ${site.address.postalCode}`,
)}`;

/**
 * Direct lines — the details, set like a departures board: one number
 * big enough to dial from across the room, the HQ, and every studio with
 * its local time right now (so you know who's awake).
 */
export function ContactDirect() {
  return (
    <ContactDirectMotion className={styles.direct}>
      <header className={styles.head}>
        <p className="label kicker">
          <span className="kicker-index">02</span> Prefer to talk?
        </p>
        <h2 className="sr-only" id="direct-title">
          Call or visit Branding and Media
        </h2>
      </header>

      <a href={site.phone.href} className={styles.phone} data-cd-phone>
        <span className={styles.phoneLabel}>Call the studio</span>
        <span className={styles.phoneNumber}>
          <span className={styles.phoneMask}>
            <span data-cd-digits>{site.phone.display}</span>
          </span>
        </span>
        <span className={styles.phoneArrow} aria-hidden="true">
          ↗
        </span>
      </a>

      <div className={styles.grid}>
        <div className={styles.hq} data-cd-in>
          <h3 className="label">Headquarters &amp; mailing address</h3>
          <address className={styles.address}>
            {site.address.street}
            <br />
            {site.address.locality}, {site.address.region} {site.address.postalCode}
          </address>
          <a href={mapsHref} className={styles.mapLink} target="_blank" rel="noopener noreferrer">
            Get directions <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens Google Maps in a new tab)</span>
          </a>
        </div>

        <div className={styles.studios}>
          <div className={styles.studiosHead} data-cd-in>
            <h3 className="label">Studios</h3>
            <span className="label">Local time</span>
          </div>
          {offices.map((o) => (
            <div key={o.region} className={styles.region}>
              <p className={styles.regionName} data-cd-row>
                {o.region}
              </p>
              <ul>
                {o.cities.map((c) => {
                  const tz = studioZones[c];
                  return (
                    <li key={c} className={styles.row} data-cd-row>
                      <span className={styles.city}>{c}</span>
                      {tz ? (
                        <LocalTime timeZone={tz} className={styles.time} />
                      ) : (
                        <span className={styles.time}>Regional</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </ContactDirectMotion>
  );
}
