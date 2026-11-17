import { projects } from "@/content/site";
import type { Capability, Case, ServiceMeta, Step, Words } from "./types";

/**
 * Kindle Management & Book Marketing. Services drawn from
 * brandingandmedia.com/marketing/book-marketing-services (Amazon Author Page,
 * Amazon bestselling author, Goodreads, book reviews, podcast booking),
 * digital media (virtual book tours, author interviews) and the Times Square
 * book announcement; copy rewritten. No sales figures are claimed.
 */

export const kindleMeta: ServiceMeta = {
  path: "/kindle-management-and-book-marketing",
  name: "Kindle Management & Book Marketing",
  title: "Kindle Management & Book Marketing Services",
  description:
    "Kindle and Amazon book marketing for authors: KDP management, Amazon Author Page, bestseller launch campaigns, Goodreads, reviews, podcasts and virtual book tours.",
  socialTitle: "Kindle Management & Book Marketing — Every book deserves its readers | Branding and Media",
  serviceType: "Book marketing and Kindle management",
  og: {
    kicker: "Kindle & book marketing",
    line: "Every book deserves its",
    accent: "readers.",
    footnote: "KDP management, Amazon launches, Goodreads, reviews, podcasts and tours — book marketing for authors.",
    alt: "Branding & Media Kindle management and book marketing — every book deserves its readers",
  },
};

export const kindleIntro = {
  statement: [
    { text: "A great book doesn't sell itself. It needs a listing that turns browsers into buyers, a launch that gives it momentum, and an author readers want to" },
    { text: "follow.", em: true },
  ] satisfies Words,
  body: "We've built that for authors at every stage — first-time self-publishers, seasoned non-fiction writers and established names booked on national TV. Every plan starts the same way: by reading the book.",
  asideTitle: "For authors who are",
  aside: ["Self-publishing on KDP", "Traditionally published", "Launching a first book", "Relaunching a backlist"],
};

/** The table of contents — each service a chapter. */
export const kindleChapters: Capability[] = [
  {
    title: "Kindle & KDP management",
    body: "Formatting, metadata, categories, keywords, pricing and A+ content — the details that decide whether Amazon shows your book at all.",
  },
  {
    title: "Amazon Author Page",
    body: "A complete Author Central profile: biography, photography, editorial reviews and every edition linked to your name.",
  },
  {
    title: "Bestseller launch campaigns",
    body: "Pre-orders, pricing, promotion and reviews timed into one coordinated push — giving your book its best chance at the bestseller lists.",
  },
  {
    title: "Goodreads author profile",
    body: "Your profile, giveaways and reader engagement where the most committed readers decide what's next.",
  },
  {
    title: "Book reviews",
    body: "Honest reviews from genuine readers and reviewers — the social proof every listing needs.",
  },
  {
    title: "Podcasts & author interviews",
    body: "Bookings on the shows your readers already listen to, with preparation so you arrive ready.",
  },
  {
    title: "Virtual book tours",
    body: "A run of blogs, podcasts and online events that carries your book to readers everywhere — no airport required.",
  },
  {
    title: "Times Square book announcement",
    body: "Your cover on the screens above Times Square. A launch moment worth photographing — and sharing.",
  },
  {
    title: "Reader influencers",
    body: "Bookstagram, BookTok and newsletter creators matched to your genre, for word of mouth at scale.",
  },
];

/** The life of a launch, told as pages turning. */
export const kindleStory: (Step & { chapter: string })[] = [
  {
    chapter: "Chapter one",
    title: "The manuscript",
    body: "We read it. Positioning begins with knowing what makes this book different from the hundred beside it.",
  },
  {
    chapter: "Chapter two",
    title: "The listing",
    body: "Title, subtitle, description, categories and keywords — written to be found, and then to be chosen.",
  },
  {
    chapter: "Chapter three",
    title: "The launch",
    body: "Pre-orders, pricing, promotion and early reviews arranged into one coordinated week of momentum.",
  },
  {
    chapter: "Chapter four",
    title: "The readers",
    body: "Interviews, podcasts, tours and social carry the book well past launch week, to readers who'll love it.",
  },
  {
    chapter: "Epilogue",
    title: "The author",
    body: "Every book builds the next: a platform, a readership and a name that are entirely yours.",
  },
];

const butterfly = projects.find((p) => p.id === "butterfly-effect")!;

export const kindleCases: Case[] = [
  {
    kind: "project",
    project: butterfly,
    note: "A book's home on the web — built for Marcus J. Moore's Kendrick Lamar biography, with the cover, the author and the buy links given room to breathe.",
  },
  {
    kind: "confidential",
    client: "A non-fiction author",
    discipline: "Book marketing strategy",
    brief:
      "A strong book with no platform behind it. We built a book marketing strategy with cohesive author branding at its centre, then ran coordinated campaigns across multiple channels.",
    outcome: "Book sales rose significantly, reader engagement grew, and the author left with a platform for the next one.",
    services: ["Book marketing strategy", "Author branding", "Multi-channel campaigns"],
  },
];
