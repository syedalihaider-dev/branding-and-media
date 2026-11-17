/**
 * Photography for the Editorial & Publishing service pages.
 *
 * Every file is CC0 / public domain (no attribution required), sourced via
 * Openverse from rawpixel's public-domain collection and re-encoded to WebP.
 * Sources are recorded here so licensing can always be checked:
 *
 *  copy-typebars    rawpixel.com/image/5914975  — typewriter typebars
 *  copy-dictionary  rawpixel.com/image/5910528  — dictionary page, "writer"
 *  copy-woodtype    rawpixel.com/image/5969030  — wooden letterpress type
 *  book-pages       rawpixel.com/image/5902369  — open book, page edges
 *  book-fanned      rawpixel.com/image/5907479  — pages fanned
 *  blog-magazine    rawpixel.com/image/6037011  — hands turning a magazine
 *  blog-newspaper   rawpixel.com/image/5924410  — folded newspaper
 *  blog-reader      rawpixel.com/image/3295509  — reader behind a broadsheet
 *  blog-reading     rawpixel.com/image/5966862  — reading a magazine
 *  ghost-nib        rawpixel.com/image/3284166  — fountain pen writing script
 *  ghost-letter     rawpixel.com/image/9201704  — handwritten letter (19th c.)
 */

export type Photo = { src: string; width: number; height: number; alt: string };

const p = (name: string, width: number, height: number, alt: string): Photo => ({
  src: `/media/editorial/${name}.webp`,
  width,
  height,
  alt,
});

export const photos = {
  copyTypebars: p("copy-typebars", 1024, 768, "The fanned typebars of a vintage typewriter, lit in cool blue"),
  copyDictionary: p("copy-dictionary", 1024, 628, "A dictionary page in a pool of light, open at the entry for “writer”"),
  copyWoodtype: p("copy-woodtype", 1024, 683, "A jumble of worn wooden letterpress type in blues and rust"),
  bookPages: p("book-pages", 1024, 683, "An old book lying open, its page edges curling in warm light"),
  bookFanned: p("book-fanned", 1024, 575, "The pages of a book fanned open, glowing amber"),
  blogMagazine: p("blog-magazine", 1024, 683, "Hands turning the pages of a magazine on a table of layouts"),
  blogNewspaper: p("blog-newspaper", 1024, 678, "A folded newspaper on a table, in soft focus"),
  blogReader: p("blog-reader", 1024, 684, "A reader on a bench, hidden behind an open broadsheet"),
  blogReading: p("blog-reading", 1024, 683, "A woman reading a black-and-white magazine feature"),
  ghostNib: p("ghost-nib", 1024, 769, "A fountain pen nib mid-word, casting a long shadow across lined paper"),
  ghostLetter: p("ghost-letter", 826, 1024, "A page of nineteenth-century handwriting in brown ink"),
} as const;
