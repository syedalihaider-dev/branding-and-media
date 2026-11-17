import { bookCapabilities, bookIntro, bookMeta, bookProcess } from "@/content/services/book";
import { photos } from "@/content/editorialImages";
import { pageMetadata } from "@/lib/seo";
import { ServiceSchema } from "@/components/Service/ServiceSchema";
import { BookHero } from "@/components/Service/Book/BookHero";
import { ServiceIntro } from "@/components/Service/ServiceIntro";
import { BookLevels } from "@/components/Service/Book/BookLevels";
import { ServiceIndex } from "@/components/Service/ServiceIndex";
import { ServiceLedger } from "@/components/Service/ServiceLedger";
import { ServiceRelated } from "@/components/Service/ServiceRelated";
import { ServiceClose } from "@/components/Service/ServiceClose";

export const metadata = pageMetadata({
  title: bookMeta.title,
  description: bookMeta.description,
  socialTitle: bookMeta.socialTitle,
  path: bookMeta.path,
});

/**
 * Book Writing & Editing — the literary chapter:
 * Hero (cloth boards opening on the pages) → The difficult draft (set as a
 * book's first page) → Four levels of edit (one zoom, page to comma) →
 * What we help with (a table of contents) → From idea to finished book →
 * Related (Ghostwriting first) → Close (a leaf turning).
 */
export default function BookPage() {
  return (
    <main id="main" className="page">
      <ServiceSchema meta={bookMeta} offers={bookCapabilities} />
      <BookHero />
      <ServiceIntro
        id="book-intro-title"
        index={1}
        label="The craft"
        {...bookIntro}
        tone="paper"
        variant="manuscript"
      />
      <BookLevels />
      <ServiceIndex
        id="book-capabilities-title"
        index={3}
        label="What we help with"
        title={[{ text: "The whole book," }, { text: "or any part of it.", em: true }]}
        intro="Come to us with an idea, a draft or a manuscript that's nearly there. We'll tell you honestly which of these it needs."
        items={bookCapabilities}
        tone="paper"
        variant="contents"
      />
      <ServiceLedger
        id="book-process-title"
        index={4}
        label="From idea to finished book"
        title={[{ text: "Six stages," }, { text: "one book.", em: true }]}
        steps={bookProcess}
        tone="ink"
      />
      <ServiceRelated current={bookMeta.path} group="editorial" lead="/ghostwriting" tone="bone" />
      <ServiceClose
        index={5}
        lines={[[{ text: "Let's finish" }], [{ text: "your book.", em: true }]]}
        sub="Tell us where the manuscript stands — an idea, a draft, or almost done. The first conversation is free, and confidential."
        tone="oxblood"
        reveal="page"
        media={{ kind: "image", src: photos.bookFanned.src }}
      />
    </main>
  );
}
