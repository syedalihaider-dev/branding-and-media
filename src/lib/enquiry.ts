/**
 * Enquiry form schema + validation, shared by the client (instant,
 * per-field feedback) and the server action (the source of truth).
 * Dependency-free on purpose.
 */

export type EnquiryField = "name" | "email" | "phone" | "company" | "message";

export type EnquiryValues = Record<EnquiryField, string> & { interests: string[] };

export type EnquiryErrors = Partial<Record<EnquiryField | "interests", string>>;

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: EnquiryErrors;
  /** First name, for the thank-you line. */
  firstName?: string;
};

export const LIMITS = {
  name: 120,
  email: 254,
  phone: 40,
  company: 160,
  message: 5000,
} as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\-.\s\d]{7,}$/;

export function validateField(field: EnquiryField, raw: string): string | undefined {
  const value = raw.trim();
  if (value.length > LIMITS[field]) return "That's a little too long.";
  switch (field) {
    case "name":
      if (!value) return "Please tell us your name.";
      if (value.length < 2) return "Please enter your full name.";
      return;
    case "email":
      if (!value) return "We need an email to reply to you.";
      if (!EMAIL.test(value)) return "That email doesn't look quite right.";
      return;
    case "phone":
      if (value && (!PHONE.test(value) || value.replace(/\D/g, "").length < 7))
        return "Please enter a valid phone number, or leave it blank.";
      return;
    case "company":
      return;
    case "message":
      if (!value) return "Tell us a little about what you have in mind.";
      if (value.length < 10) return "A few more words will help us prepare.";
      return;
  }
}

export function validateEnquiry(values: EnquiryValues): EnquiryErrors {
  const errors: EnquiryErrors = {};
  (Object.keys(LIMITS) as EnquiryField[]).forEach((f) => {
    const e = validateField(f, values[f] ?? "");
    if (e) errors[f] = e;
  });
  if (values.interests.length > 20) errors.interests = "Please choose fewer options.";
  return errors;
}

export function readEnquiry(form: FormData): EnquiryValues {
  const str = (k: string) => {
    const v = form.get(k);
    return typeof v === "string" ? v : "";
  };
  return {
    name: str("name"),
    email: str("email"),
    phone: str("phone"),
    company: str("company"),
    message: str("message"),
    interests: form
      .getAll("interests")
      .filter((v): v is string => typeof v === "string")
      .map((v) => v.slice(0, 80)),
  };
}
