import { paidMeta } from "@/content/services/paid";
import { ogSize, renderOg } from "@/lib/og";

export const alt = paidMeta.og.alt;
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOg(paidMeta.og);
}
