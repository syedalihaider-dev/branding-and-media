import { ogSize, renderOg } from "@/lib/og";

export const alt = "Contact Branding & Media — let's make your name known";
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOg({
    kicker: "Contact",
    line: "Let's make your name",
    accent: "known.",
    footnote: "Your first conversation is free. Call (917) 765-8780 or send an enquiry.",
  });
}
