import { featuredMeta } from "@/content/services/featured";
import { ogSize, renderOg } from "@/lib/og";

export const alt = featuredMeta.og.alt;
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOg(featuredMeta.og);
}
