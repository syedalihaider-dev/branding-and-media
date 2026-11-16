"use client";

import { useActionState, useEffect, useRef, useState, type ReactNode } from "react";
import { sendEnquiry } from "@/app/contact-us/actions";
import { serviceGroups } from "@/content/navigation";
import { site } from "@/content/site";
import {
  LIMITS,
  validateField,
  type EnquiryErrors,
  type EnquiryField,
  type EnquiryState,
} from "@/lib/enquiry";
import { gsap, MQ } from "@/lib/gsap";
import styles from "./ContactForm.module.css";

const initial: EnquiryState = { status: "idle" };
const FIELDS: EnquiryField[] = ["name", "email", "phone", "company", "message"];

/** Remounting via `key` is the cleanest way to reset action state. */
export function ContactForm() {
  const [round, setRound] = useState(0);
  return <EnquiryForm key={round} onReset={() => setRound((r) => r + 1)} />;
}

function EnquiryForm({ onReset }: { onReset: () => void }) {
  const [state, formAction, pending] = useActionState(sendEnquiry, initial);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [seen, setSeen] = useState(state);
  const formRef = useRef<HTMLFormElement>(null);

  // Adopt server-side errors when a new response arrives.
  if (state !== seen) {
    setSeen(state);
    if (state.errors) setErrors(state.errors);
  }

  // After a server rejection, move focus to the first invalid field.
  useEffect(() => {
    if (state.status !== "error" || !state.errors) return;
    const first = FIELDS.find((f) => state.errors?.[f]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }, [state]);

  if (state.status === "success") return <Success firstName={state.firstName} onReset={onReset} />;

  const check = (field: EnquiryField, value: string) => {
    const msg = validateField(field, value);
    setErrors((e) => (e[field] === msg ? e : { ...e, [field]: msg }));
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = e.target.name as EnquiryField;
    // Don't scold empty fields the visitor merely tabbed through.
    if (e.target.value.trim() || errors[field]) check(field, e.target.value);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = e.target.name as EnquiryField;
    if (errors[field]) check(field, e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(e.currentTarget);
    const next: EnquiryErrors = {};
    FIELDS.forEach((f) => {
      const msg = validateField(f, String(data.get(f) ?? ""));
      if (msg) next[f] = msg;
    });
    setErrors(next);
    const first = FIELDS.find((f) => next[f]);
    if (first) {
      e.preventDefault();
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    }
  };

  const errorCount = FIELDS.filter((f) => errors[f]).length;

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={onSubmit}
      noValidate
      className={styles.form}
      aria-labelledby="enquiry-title"
      aria-busy={pending}
    >
      <div className={styles.grid}>
        <Field index="01" name="name" label="Your name" autoComplete="name" required error={errors.name}
          onBlur={onBlur} onChange={onChange} />
        <Field index="02" name="email" label="Email address" type="email" autoComplete="email" inputMode="email"
          required error={errors.email} onBlur={onBlur} onChange={onChange} />
        <Field index="03" name="phone" label="Phone" type="tel" autoComplete="tel" inputMode="tel"
          error={errors.phone} onBlur={onBlur} onChange={onChange} />
        <Field index="04" name="company" label="Company / organization" autoComplete="organization"
          error={errors.company} onBlur={onBlur} onChange={onChange} />
      </div>

      <fieldset className={styles.interests} data-reveal>
        <legend className={styles.legend}>
          <span className={styles.index}>05</span>
          <span>What can we help with?</span>
          <span className={styles.optional}>Choose any</span>
        </legend>
        <div className={styles.interestGroups}>
          {serviceGroups.map((g) => (
            <div key={g.id} className={styles.interestGroup} role="group" aria-labelledby={`interest-${g.id}`}>
              <p className={styles.interestTitle} id={`interest-${g.id}`}>
                {g.label}
              </p>
              <ul>
                {g.services.map((s) => (
                  <li key={s.href}>
                    <Check value={s.label}>{s.label}</Check>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={styles.unsure}>
          <Check value="Not sure yet">Not sure yet — let&rsquo;s talk it through</Check>
        </div>
      </fieldset>

      <Field index="06" name="message" label="Tell us about your project" as="textarea" required
        error={errors.message} onBlur={onBlur} onChange={onChange} />

      {/* Honeypot — hidden from people and assistive tech */}
      <div className={styles.trap} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={styles.submitRow} data-reveal>
        <button type="submit" className={styles.submit} disabled={pending} data-pending={pending}>
          <span className={styles.submitLabel}>{pending ? "Sending…" : "Send enquiry"}</span>
          <span className={styles.submitArrow} aria-hidden="true">
            →
          </span>
        </button>
        <p className={styles.note}>
          We only use your details to reply to your enquiry. Prefer to talk?{" "}
          <a href={site.phone.href}>{site.phone.display}</a>
        </p>
      </div>

      <p className={styles.status} role="status" aria-live="polite">
        {errorCount > 0
          ? `Please check ${errorCount === 1 ? "the highlighted field" : `the ${errorCount} highlighted fields`}.`
          : state.status === "error"
            ? state.message
            : ""}
      </p>
    </form>
  );
}

type FieldProps = {
  index: string;
  name: EnquiryField;
  label: string;
  type?: string;
  as?: "input" | "textarea";
  required?: boolean;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  error?: string;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

function Field({ index, name, label, type = "text", as = "input", required, error, ...rest }: FieldProps) {
  const id = `enquiry-${name}`;
  const errId = `${id}-error`;
  const common = {
    id,
    name,
    placeholder: " ",
    maxLength: LIMITS[name],
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errId : undefined,
    "aria-required": required || undefined,
    className: styles.control,
    ...rest,
  };
  return (
    <div className={styles.field} data-invalid={!!error} data-kind={as} data-reveal>
      <span className={styles.index} aria-hidden="true">
        {index}
      </span>
      <div className={styles.wrap}>
        {as === "textarea" ? <textarea rows={4} {...common} /> : <input type={type} {...common} />}
        <label htmlFor={id} className={styles.label}>
        {label}
        {required ? (
          <span className={styles.req} aria-hidden="true">
            *
          </span>
        ) : (
          <span className={styles.optional}>Optional</span>
        )}
        </label>
        <span className={styles.rule} aria-hidden="true" />
      </div>
      <p id={errId} className={styles.error}>
        {error}
      </p>
    </div>
  );
}

function Check({ value, children }: { value: string; children: ReactNode }) {
  return (
    <label className={styles.check}>
      <input type="checkbox" name="interests" value={value} />
      <span className={styles.box} aria-hidden="true" />
      <span className={styles.checkText}>{children}</span>
    </label>
  );
}

function Success({ firstName, onReset }: { firstName?: string; onReset: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.focus({ preventScroll: true });
    if (!window.matchMedia(MQ.motion).matches) return;
    const tween = gsap.from(el.querySelectorAll("[data-success-in]"), {
      y: 40,
      autoAlpha: 0,
      duration: 1.1,
      stagger: 0.1,
      ease: "power4.out",
    });
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <div ref={ref} className={styles.success} tabIndex={-1} role="status" aria-live="polite">
      <p className="label kicker" data-success-in>
        <span className="kicker-index">✳</span> Message received
      </p>
      <p className={styles.successTitle} data-success-in>
        Thank you{firstName ? `, ${firstName}` : ""}. <em className="serif italic">Your story starts here.</em>
      </p>
      <p className={styles.successBody} data-success-in>
        Your message is with our team and we&rsquo;ll be in touch soon. If it&rsquo;s urgent, call us on{" "}
        <a href={site.phone.href}>{site.phone.display}</a>.
      </p>
      <button type="button" className={styles.again} onClick={onReset} data-success-in>
        Send another message
      </button>
    </div>
  );
}
