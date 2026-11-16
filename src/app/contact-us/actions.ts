"use server";

import { site } from "@/content/site";
import { readEnquiry, validateEnquiry, type EnquiryState } from "@/lib/enquiry";

/**
 * Receives the contact form. Validates on the server (never trust the
 * client), drops obvious bots, then delivers the enquiry.
 *
 * Delivery: set CONTACT_WEBHOOK_URL to any endpoint that accepts a JSON
 * POST (CRM, Zapier/Make, Slack workflow, email relay…). In development
 * without it, enquiries are logged to the server console. In production
 * without it, the visitor is told to phone instead — leads are never
 * silently dropped.
 */
export async function sendEnquiry(_prev: EnquiryState, form: FormData): Promise<EnquiryState> {
  // Honeypot: real people never see or fill this field.
  if (typeof form.get("website") === "string" && form.get("website") !== "") {
    return { status: "success", firstName: "" };
  }

  const values = readEnquiry(form);
  const errors = validateEnquiry(values);
  if (Object.keys(errors).length) {
    return { status: "error", errors, message: "Please check the highlighted fields." };
  }

  const payload = {
    source: "brandingandmedia.com/contact-us",
    receivedAt: new Date().toISOString(),
    name: values.name.trim(),
    email: values.email.trim(),
    phone: values.phone.trim() || null,
    company: values.company.trim() || null,
    interests: values.interests,
    message: values.message.trim(),
  };

  const fallback = `We couldn't send your message just now. Please try again, or call us on ${site.phone.display}.`;
  const hook = process.env.CONTACT_WEBHOOK_URL;

  try {
    if (hook) {
      const res = await fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10_000),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } else if (process.env.NODE_ENV !== "production") {
      console.info("[contact] Enquiry received (CONTACT_WEBHOOK_URL not set):", payload);
    } else {
      console.error("[contact] CONTACT_WEBHOOK_URL is not configured — enquiry not delivered.");
      return { status: "error", message: fallback };
    }
  } catch (err) {
    console.error("[contact] Delivery failed:", err);
    return { status: "error", message: fallback };
  }

  return { status: "success", firstName: payload.name.split(/\s+/)[0] };
}
