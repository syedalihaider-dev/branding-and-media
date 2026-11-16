/**
 * Contact page content. Contact details come from brandingandmedia.com
 * (phone, mailing address, office cities). The old site lists no public
 * email, business hours or social profiles, so none are shown here.
 */

export const contactMeta = {
  title: "Contact Us",
  description:
    "Start a conversation with Branding and Media. Tell us about your brand, book or business — your first conversation is free. Call (917) 765-8780 or send an enquiry.",
  socialTitle: "Contact Branding and Media — Let's make your name known",
};

/** Headquarters is the published mailing address (Dallas). */
export const hq = { city: "Dallas", timeZone: "America/Chicago" };

/** IANA zones for live local times. "Asia" is a region, not a city. */
export const studioZones: Record<string, string | null> = {
  "New York": "America/New_York",
  Brooklyn: "America/New_York",
  "Los Angeles": "America/Los_Angeles",
  "San Jose": "America/Los_Angeles",
  Dallas: "America/Chicago",
  Toronto: "America/Toronto",
  London: "Europe/London",
  Dubai: "Asia/Dubai",
  Riyadh: "Asia/Riyadh",
  Limerick: "Europe/Dublin",
  Canberra: "Australia/Sydney",
  Asia: null,
};

export const nextSteps = [
  {
    title: "Ice breaker",
    body: "A free first conversation about you, your brand and where you want to go.",
  },
  {
    title: "Discovery",
    body: "We learn your requirements and challenges, then share honest insight and feedback.",
  },
  {
    title: "Alignment",
    body: "You see the approach — and the value — before anything is built. Then we get you famous.",
  },
];
