import { nav, offices, reviewPlatforms, site } from "@/content/site";
import styles from "./Footer.module.css";

/**
 * Footer is revealed from beneath the page (curtain) on large screens.
 * Pure CSS: the outer element clips a fixed inner layer.
 */
export function Footer() {
  return (
    <footer className={styles.footer} data-theme="light">
      <div className={styles.inner}>
        <div className={styles.cols}>
          <div className={styles.col}>
            <h2 className="label">Offices</h2>
            <div className={styles.regions}>
              {offices.map((o) => (
                <div key={o.region}>
                  <p className={styles.region}>{o.region}</p>
                  <ul>
                    {o.cities.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.col}>
            <h2 className="label">Studio</h2>
            <a href={site.phone.href} className={styles.big}>
              {site.phone.display}
            </a>
            <address className={styles.addr}>
              {site.address.street}
              <br />
              {site.address.locality}, {site.address.region} {site.address.postalCode}
            </address>
          </div>

          <nav className={styles.col} aria-label="Footer">
            <h2 className="label">Navigate</h2>
            <ul className={styles.links}>
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
              <li>
                <a href="#main">Back to top ↑</a>
              </li>
            </ul>
          </nav>

          <div className={styles.col}>
            <h2 className="label">Reviewed on</h2>
            <ul className={styles.plain}>
              {reviewPlatforms.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        </div>

        <p className={styles.wordmark} aria-hidden="true">
          Branding <span className="serif italic">&amp;</span> Media
        </p>

        <div className={styles.legal}>
          <p>© {site.name}. {site.descriptor}.</p>
          <p>{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
