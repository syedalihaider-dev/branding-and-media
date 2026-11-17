import { seoMeta } from "@/content/services/seo";
import { ogSize, renderOg } from "@/lib/og";

export const alt = seoMeta.og.alt;
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOg(seoMeta.og);
}
