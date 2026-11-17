import { bookMeta } from "@/content/services/book";
import { ogSize, renderOg } from "@/lib/og";

export const alt = bookMeta.og.alt;
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOg(bookMeta.og);
}
