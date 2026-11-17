import type { Capability, ServiceMeta, Step, Words } from "./types";

/**
 * Ghostwriting. The old site's Content practice offers an Author Writing
 * Package, feature articles and thought-leadership writing. Copy
 * rewritten. Ghostwriting is confidential by nature — no clients are named.
 */

export const ghostMeta: ServiceMeta = {
  path: "/ghostwriting",
  name: "Ghostwriting",
  title: "Ghostwriting Services for Books & Memoirs",
  description:
    "Confidential ghostwriting for founders, experts and public figures: books, memoirs, articles and speeches written in your voice, from recorded conversations to a finished manuscript.",
  socialTitle: "Ghostwriting — Your story, your voice, our craft | Branding and Media",
  serviceType: "Ghostwriting",
  og: {
    kicker: "Ghostwriting",
    line: "Your story. Your voice.",
    accent: "Our craft.",
    footnote: "Books, memoirs, articles and speeches — written in your voice, in complete confidence.",
    alt: "Branding & Media ghostwriting — your story, your voice, our craft",
  },
};

export const ghostIntro = {
  statement: [
    { text: "You have the story." },
    { text: "What you don't have", em: true },
    { text: "is eighteen months to write it." },
  ] satisfies Words,
  body: "Most people with a book in them aren't short of material — they're short of time, distance and the habit of writing every day. Ghostwriting closes that gap. We listen until we can hear you on the page, then write the book, article or speech you would have written yourself, given a year of quiet mornings.",
  asideTitle: "We write",
  aside: ["Business & leadership books", "Memoirs & family histories", "Articles & bylines", "Speeches & keynotes"],
};

/** The three layers of the work — conversation, structure, manuscript. */
export const ghostLayers = [
  {
    name: "Transcript",
    label: "01 — Conversation",
    lines: [
      "— So where does it actually start?",
      "Honestly? In my father's workshop. I was nine, and he let me break things.",
      "— Break things?",
      "Take them apart. Radios, clocks. He said you only understand a thing once you've broken it…",
    ],
  },
  {
    name: "Outline",
    label: "02 — Structure",
    lines: ["Part One — The Workshop", "1. Taking things apart", "2. The first business (and why it failed)", "Part Two — Building", "3. Learning to put things back"],
  },
  {
    name: "Manuscript",
    label: "03 — Your book",
    lines: [
      "Chapter One",
      "Taking Things Apart",
      "I learned the most important lesson of my working life at nine years old, on the floor of my father's workshop, surrounded by the pieces of a radio I had no idea how to rebuild.",
    ],
  },
];

export const ghostCapabilities: Capability[] = [
  { title: "Books", body: "Business, leadership and expert books — from first interview to publish-ready manuscript.", tags: ["Business", "Leadership", "Expertise"] },
  { title: "Memoirs & life stories", body: "Your life, or a family's history, written with care for the people in it.", tags: ["Memoir", "Family history", "Biography"] },
  { title: "Thought leadership", body: "Articles, op-eds and LinkedIn writing published under your name, on a schedule you can keep.", tags: ["Bylines", "Op-eds", "LinkedIn"] },
  { title: "Speeches & keynotes", body: "Words written to be spoken — in your cadence, timed to the minute.", tags: ["Keynotes", "Talks", "Toasts"] },
  { title: "Book proposals", body: "Overview, market and sample chapters prepared for agents and publishers.", tags: ["Proposal", "Sample chapters", "Synopsis"] },
  { title: "Rewrites & completions", body: "Half-finished manuscripts and drafts that stalled — restructured and finished in your voice.", tags: ["Rewrite", "Completion"] },
];

export const ghostProcess: Step[] = [
  { title: "Listen", body: "Recorded conversations — hours of them. We learn your stories, your opinions and the way you say things." },
  { title: "Shape", body: "An outline built from what you've told us, agreed before a chapter is written." },
  { title: "Write", body: "Chapters delivered in stages, each one read back to you and revised until it sounds like you." },
  { title: "Refine", body: "Full edit, fact-check and proofread — the book as a whole, not just a set of chapters." },
  { title: "Hand over", body: "Your manuscript, your copyright, your name on the cover. Our role stays confidential." },
];

export const ghostDiscretion = [
  "Confidentiality agreement before the first conversation",
  "Full copyright and credit transfer to you",
  "Recordings and drafts kept secure, deleted on request",
  "We never name ghostwriting clients — including here",
];
