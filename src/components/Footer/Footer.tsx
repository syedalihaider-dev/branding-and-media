import Link from "next/link";
import { pageLinks, prefetchFor, serviceGroups } from "@/content/navigation";
import { offices, reviewPlatforms, site } from "@/content/site";
import { FooterCurtain } from "./FooterCurtain";
import styles from "./Footer.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Footer — the site map, set like an index at the back of a book.
 * Revealed from beneath the page (curtain) on large screens when it fits
 * the viewport; FooterCurtain measures it and opts in.
 */
export function Footer() {
  return (
    <FooterCurtain className={styles.footer} innerClassName={styles.inner}>
      <div className={styles.top}>
        <div className={styles.studio}>
          <h2 className="label">Studio</h2>
          <a href={site.phone.href} className={styles.big}>
            {site.phone.display}
          </a>
          <address className={styles.addr}>
            {site.address.street}
            <br />
            {site.address.locality}, {site.address.region} {site.address.postalCode}
          </address>
          <ul className={styles.pages}>
            {pageLinks.map((p) => (
              <li key={p.href}>
                <Link href={p.href}>{p.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <nav className={styles.groups} aria-label="Services">
          {serviceGroups.map((g, gi) => (
            <div key={g.id} className={styles.group}>
              <h2 className={styles.groupTitle}>
                <span className={styles.groupIndex}>{pad(gi + 1)}</span>
                {g.label}
              </h2>
              <ul className={styles.links}>
                {g.services.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} prefetch={prefetchFor(s.href)}>
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className={styles.offices}>
        <h2 className="label">Offices</h2>
        <ul className={styles.regions}>
          {offices.map((o) => (
            <li key={o.region}>
              <span className={styles.region}>{o.region}</span>
              <span>{o.cities.join(" · ")}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className={styles.wordmark} aria-hidden="true">
        Branding <span className="serif italic">&amp;</span> Media
      </p>

      <div className={styles.legal}>
        <p>
          © {site.name}. {site.descriptor}.
        </p>
        <p>Reviewed on {reviewPlatforms.join(" · ")}</p>
      </div>
    </FooterCurtain>
  );
}
