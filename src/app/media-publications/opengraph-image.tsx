import { publicationsMeta } from "@/content/services/publications";
import { ogSize, renderOg } from "@/lib/og";

export const alt = publicationsMeta.og.alt;
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOg(publicationsMeta.og);
}
