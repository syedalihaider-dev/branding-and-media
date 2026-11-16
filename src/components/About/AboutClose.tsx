import Link from "next/link";
import { site } from "@/content/site";
import { AboutCloseMotion } from "./AboutCloseMotion";
import styles from "./AboutClose.module.css";

export function AboutClose() {
  return (
    <AboutCloseMotion className={styles.close}>
      <div className={styles.field} data-ac-field aria-hidden="true" />
      <div className={styles.content}>
        <p className="label kicker">
          <span className="kicker-index">06</span> Next chapter
        </p>
        <h2 className={styles.title} id="close-title">
          <span className={styles.line} data-ac-line>
            <span>Ready to be</span>
          </span>
          <span className={styles.line} data-ac-line>
            <span className="serif italic">remembered?</span>
          </span>
        </h2>
        <div className={styles.bottom} data-ac-fade>
          <p className={styles.sub}>
            The first conversation — our Ice Breaker — is free. Tell us who you are and where you want to go.
          </p>
          <div className={styles.actions}>
            <Link href="/contact-us" className={styles.go}>
              <span className={styles.goLabel}>Start the conversation</span>
              <span className={styles.goArrow} aria-hidden="true">
                →
              </span>
            </Link>
            <a href={site.phone.href} className={styles.call}>
              or call <span>{site.phone.display}</span>
            </a>
          </div>
        </div>
      </div>
    </AboutCloseMotion>
  );
}
