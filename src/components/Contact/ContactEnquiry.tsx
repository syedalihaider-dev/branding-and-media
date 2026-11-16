import { nextSteps } from "@/content/contact";
import { site } from "@/content/site";
import { ContactForm } from "./ContactForm";
import { ContactEnquiryMotion } from "./ContactEnquiryMotion";
import styles from "./ContactEnquiry.module.css";

/** The enquiry sheet — slides up over the hero like a page being turned. */
export function ContactEnquiry() {
  return (
    <ContactEnquiryMotion className={styles.enquiry} id="enquiry">
      <div className={styles.edge} aria-hidden="true">
        <span className="label">Enquiry</span>
        <span className="label">No. 001 — Your brand</span>
      </div>

      <aside className={styles.aside}>
        <p className="label kicker" data-ce-in>
          <span className="kicker-index">01</span> Start the conversation
        </p>
        <h2 className={styles.title} id="enquiry-title" data-ce-in>
          Tell us your <em className="serif italic">story.</em>
        </h2>
        <p className={styles.lede} data-ce-in>
          Share a few details and a member of our team will come back to you personally. No obligation, no hard
          sell.
        </p>

        <div className={styles.next} data-ce-in>
          <h3 className="label">What happens next</h3>
          <ol>
            {nextSteps.map((s, i) => (
              <li key={s.title} className={styles.step}>
                <span className={styles.stepIndex}>0{i + 1}</span>
                <span className={styles.stepTitle}>{s.title}</span>
                <span className={styles.stepBody}>{s.body}</span>
              </li>
            ))}
          </ol>
        </div>

        <p className={styles.direct} data-ce-in>
          <span className="label">Direct line</span>
          <a href={site.phone.href}>{site.phone.display}</a>
        </p>
      </aside>

      <div className={styles.formCol} data-ce-form>
        <ContactForm />
      </div>
    </ContactEnquiryMotion>
  );
}
