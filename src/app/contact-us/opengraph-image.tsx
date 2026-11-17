import { ogSize, renderOg } from "@/lib/og";

export const alt = "Contact Branding & Media — let's make your name known";
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOg({
    kicker: "Contact",
    line: "Let's make your name",
    accent: "known.",
    footnote: "Your first conversation is free. Call (332) 203-2361 or send an enquiry.",
  });
}
