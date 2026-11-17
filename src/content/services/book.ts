import type { Capability, ServiceMeta, Step, Words } from "./types";

/**
 * Book Writing & Editing. The old site offers an Author Writing Package,
 * book marketing and author branding; editing levels follow standard
 * publishing practice. Copy rewritten; no titles or authors claimed.
 */

export const bookMeta: ServiceMeta = {
  path: "/book-writing-editing",
  name: "Book Writing & Editing",
  title: "Book Writing & Editing Services",
  description:
    "Book writing and editing for first-time and established authors: developmental, line and copy editing, proofreading, manuscript critique and publishing preparation — fiction and non-fiction.",
  socialTitle: "Book Writing & Editing — From first draft to finished book | Branding and Media",
  serviceType: "Book writing and manuscript editing",
  og: {
    kicker: "Book writing & editing",
    line: "From first draft",
    accent: "to finished book.",
    footnote: "Writing, developmental and line editing, copyediting, proofreading and publishing preparation.",
    alt: "Branding & Media book writing and editing — from first draft to finished book",
  },
};

export const bookIntro = {
  statement: [
    { text: "Every good book was once" },
    { text: "a difficult draft.", em: true },
  ] satisfies Words,
  body: "The distance between a manuscript and a book is made of decisions — what to cut, what to move, which sentence is doing the work and which is just keeping it company. We help you make them: as co-writers when the page is blank, as editors when it's full, and as the last careful readers before it goes to print.",
  asideTitle: "We work with",
  aside: ["First-time authors", "Business & expert authors", "Memoir & life writing", "Fiction"],
};

/**
 * The four levels of edit — from the shape of the whole book down to a
 * single comma. `target` names the span in the specimen page to zoom to.
 */
export const bookLevels = [
  {
    level: "Developmental edit",
    scale: "The whole book",
    body: "Structure, argument, pace and character. Does each chapter earn its place, and does the book deliver what its opening promises?",
    target: "page",
  },
  {
    level: "Line edit",
    scale: "The paragraph",
    body: "Flow, rhythm and voice. We tighten paragraphs so the reader moves through them without noticing the effort.",
    target: "paragraph",
  },
  {
    level: "Copyedit",
    scale: "The sentence",
    body: "Grammar, consistency and clarity, sentence by sentence — plus a style sheet so every choice stays consistent.",
    target: "sentence",
  },
  {
    level: "Proofread",
    scale: "The comma",
    body: "The final pass on the typeset pages. Nothing slips through: not a widow, not a doubled space, not a stray comma.",
    target: "comma",
  },
];

export const bookCapabilities: Capability[] = [
  { title: "Book writing & co-writing", body: "From outline to full manuscript, written with you — your knowledge and voice, our structure and craft.", tags: ["Non-fiction", "Memoir", "Co-authoring"] },
  { title: "Manuscript critique", body: "An honest, detailed read of your draft with a clear plan for what to fix first.", tags: ["Editorial letter", "Reader report"] },
  { title: "Developmental editing", body: "The big picture: structure, argument, character and pace, chapter by chapter.", tags: ["Structure", "Pacing", "Argument"] },
  { title: "Line editing", body: "Paragraph-level work on voice, rhythm and clarity, without flattening what makes it yours.", tags: ["Voice", "Flow", "Clarity"] },
  { title: "Copyediting", body: "Grammar, consistency and fact-checking queries, with a style sheet for the whole book.", tags: ["Style sheet", "Consistency"] },
  { title: "Proofreading", body: "A final, meticulous pass on the typeset proofs before anything goes to print.", tags: ["Typeset proofs", "Final pass"] },
  { title: "Publishing preparation", body: "Formatting for print and e-book, front and back matter, and the blurb and author bio that sell the book.", tags: ["Formatting", "Blurb & bio", "Front matter"] },
  { title: "Launch & author platform", body: "When it's ready, our book marketing and author branding teams take it the rest of the way.", tags: ["Book marketing", "Author website"] },
];

export const bookProcess: Step[] = [
  { title: "Conversation", body: "What the book is for, who it's for, and where the manuscript stands today — idea, draft or nearly done." },
  { title: "Outline", body: "A chapter-by-chapter map, agreed before writing or restructuring begins." },
  { title: "Draft", body: "Writing or rewriting in agreed stages, with chapters to read and respond to as we go." },
  { title: "Edit", body: "Developmental, then line, then copy — each level in its own pass, in the right order." },
  { title: "Proof", body: "Typeset pages checked line by line, with corrections confirmed before files are final." },
  { title: "Publish-ready", body: "Print and e-book files, metadata, blurb and bio — ready for your publisher or your own launch." },
];
