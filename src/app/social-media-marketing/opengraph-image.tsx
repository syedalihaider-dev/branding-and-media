import { socialMeta } from "@/content/services/social";
import { ogSize, renderOg } from "@/lib/og";

export const alt = socialMeta.og.alt;
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOg(socialMeta.og);
}
