import Image from "next/image";
import { site } from "@/content/site";
import { CTAMotion } from "./CTAMotion";
import styles from "./CTA.module.css";

const stills = [
  { src: "/media/work/butterfly-effect.webp", w: 920, h: 448, cls: styles.s1 },
  { src: "/media/reel/portrait.webp", w: 1280, h: 285, cls: styles.s2 },
  { src: "/media/work/aventics.webp", w: 448, h: 448, cls: styles.s3 },
  { src: "/media/reel/collage-b.webp", w: 1280, h: 285, cls: styles.s4 },
  { src: "/media/work/naval.webp", w: 448, h: 448, cls: styles.s5 },
  { src: "/media/work/healthy-lifestyle.webp", w: 920, h: 448, cls: styles.s6 },
];

export function CTA() {
  return (
    <CTAMotion className={styles.cta} id="contact">
      {/* The work, waiting in the dark. A spotlight finds it. */}
      <div className={styles.stage} aria-hidden="true">
        {stills.map((s) => (
          <div key={s.src} className={`${styles.still} ${s.cls}`}>
            <Image src={s.src} alt="" width={s.w} height={s.h} sizes="30vw" />
          </div>
        ))}
        <div className={styles.lamp} data-cta-lamp />
      </div>

      <div className={styles.content}>
        <p className={`label ${styles.kicker}`}>
          <span className={styles.kickerIndex}>06</span> Contact
        </p>
        <h2 className={styles.title} id="contact-title">
          <span className={styles.line} data-cta-line>
            <span>Let&rsquo;s get you</span>
          </span>
          <span className={styles.line} data-cta-line>
            <span className="serif italic">famous.</span>
          </span>
        </h2>

        <div className={styles.bottom}>
          <p className={styles.sub} data-cta-fade>
            No matter the industry you&rsquo;re in, we have the resources, will and expertise to tell your
            story to the world. Drop us a line — let&rsquo;s get famous.
          </p>

          <div className={styles.actions} data-cta-fade>
            <a href={site.phone.href} className={styles.call} data-magnetic>
              <span className={styles.callLabel}>Call the studio</span>
              <span className={styles.callNumber}>{site.phone.display}</span>
              <span className={styles.callArrow} aria-hidden="true">
                ↗
              </span>
            </a>
            <address className={styles.address}>
              {site.address.street}
              <br />
              {site.address.locality}, {site.address.region} {site.address.postalCode}
            </address>
          </div>
        </div>
      </div>
    </CTAMotion>
  );
}
