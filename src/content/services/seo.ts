import type { Capability, Case, ServiceMeta, Step, Words } from "./types";

/**
 * Search Engine Optimization. Services drawn from
 * brandingandmedia.com/marketing/search-engine-optimization (audit,
 * optimization, roadmap, backlinks, technical, e-commerce, author SEO,
 * penalty removal) and the Google Knowledge Panel offer; copy rewritten.
 */

export const seoMeta: ServiceMeta = {
  path: "/search-engine-optimization",
  name: "Search Engine Optimization",
  title: "SEO Services — Search Engine Optimization",
  description:
    "SEO services from Branding and Media: technical audits, keyword strategy, on-page optimization, content, link building, local and author SEO — organic growth you can measure.",
  socialTitle: "Search Engine Optimization — Be the answer | Branding and Media",
  serviceType: "Search engine optimization",
  og: {
    kicker: "Search engine optimization",
    line: "Be the",
    accent: "answer.",
    footnote: "Technical SEO, content and authority — organic visibility that compounds instead of expiring.",
    alt: "Branding & Media search engine optimization — be the answer",
  },
};

/** Real search intents from the agency's own world — authors, founders, brands. */
export const seoQueries = [
  "how to market a self-published book",
  "web design agency for authors",
  "personal branding for executives",
  "best book publicist near me",
  "how to get a google knowledge panel",
];

export const seoIntro = {
  statement: [
    { text: "Rankings can be rented." },
    { text: "Authority", em: true },
    { text: "has to be earned — and once earned, it compounds." },
  ] satisfies Words,
  body: "Shortcuts get penalised; foundations get rewarded. We build search visibility the durable way — a technically sound site, content that genuinely answers the question, and a reputation other sites want to cite. It takes longer than a trick. It also lasts.",
  asideTitle: "What we measure",
  aside: [
    "Visibility for intent that converts",
    "Organic traffic & engagement",
    "Leads, sales and enquiries",
    "Technical health over time",
  ],
};

/** The three forces behind every ranking — revealed as the climb unfolds. */
export const seoPillars = [
  {
    title: "Technical",
    body: "Crawlable, fast, structured. Search engines can't rank what they can't read.",
  },
  {
    title: "Content",
    body: "Pages built around intent — the real question behind the keyword, answered better than anyone else.",
  },
  {
    title: "Authority",
    body: "Earned links and mentions from sources that matter, telling search engines you're the reference.",
  },
];

/** A topic cluster from Branding & Media's own core market. */
export const seoCluster = {
  core: "Author branding",
  nodes: [
    { label: "Author website", x: 18, y: 22 },
    { label: "Book marketing", x: 46, y: 9 },
    { label: "Amazon author page", x: 76, y: 18 },
    { label: "Personal brand", x: 85, y: 52 },
    { label: "Media interviews", x: 76, y: 85 },
    { label: "Book launch plan", x: 44, y: 93 },
    { label: "Goodreads profile", x: 18, y: 80 },
    { label: "Knowledge panel", x: 13, y: 50 },
  ],
  /** Cross-links between related subtopics (indices into nodes). */
  links: [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 0],
    [1, 5],
    [0, 3],
  ] as [number, number][],
};

export const seoCapabilities: Capability[] = [
  {
    title: "Website audit",
    body: "A complete health check — crawlability, speed, indexation, content and links — with every issue ranked by impact, not alphabet.",
    tags: ["Crawl", "Speed", "Indexation"],
  },
  {
    title: "Technical SEO",
    body: "Site architecture, Core Web Vitals, structured data, sitemaps and redirects, fixed at the source rather than patched.",
    tags: ["Core Web Vitals", "Schema", "Architecture"],
  },
  {
    title: "Keyword & on-page",
    body: "Research into what your audience actually types, then titles, headings, copy and internal links aligned to it.",
    tags: ["Research", "Intent mapping", "On-page"],
  },
  {
    title: "Content & SEO copywriting",
    body: "Articles and landing pages written for people first and structured for search second — the order that works.",
    tags: ["Topic clusters", "Landing pages", "Blogs"],
  },
  {
    title: "Link building",
    body: "Backlinks earned from relevant, reputable publications. Never bought from networks, never worth a penalty.",
    tags: ["Digital PR", "Outreach", "Citations"],
  },
  {
    title: "Local SEO",
    body: "Google Business Profile, local citations and location pages for the searches that happen near you.",
    tags: ["Google Business Profile", "Maps", "Reviews"],
  },
  {
    title: "E-commerce SEO",
    body: "Category and product optimization that helps buyers find the right thing — and then buy it.",
    tags: ["Categories", "Products", "Structured data"],
  },
  {
    title: "Author SEO",
    body: "Your name, your books and your Google Knowledge Panel — the first things readers find when they look you up.",
    tags: ["Knowledge panel", "Author pages", "Book SEO"],
  },
  {
    title: "Penalty recovery",
    body: "Diagnosis and clean-up after a Google penalty, then a plan to rebuild trust the right way.",
    tags: ["Diagnosis", "Disavow", "Recovery"],
  },
  {
    title: "Roadmap & reporting",
    body: "A prioritised SEO roadmap, then plain-English reporting on rankings, traffic and the conversions they bring.",
    tags: ["Roadmap", "Analytics", "Reporting"],
  },
];

export const seoProcess: Step[] = [
  {
    title: "Audit",
    body: "We crawl the site, read the analytics and study the competition. You see exactly where you stand — and why.",
  },
  {
    title: "Roadmap",
    body: "Opportunities ranked by effort and impact. A plan you can read in ten minutes and hold us to for a year.",
  },
  {
    title: "Optimize",
    body: "Technical fixes and on-page work first: the foundations that make every later effort count.",
  },
  {
    title: "Publish",
    body: "Content built around real search intent, organised into topics search engines recognise as expertise.",
  },
  {
    title: "Earn",
    body: "Digital PR and outreach that earn links and mentions from publications your audience already trusts.",
  },
  {
    title: "Measure",
    body: "Monthly reporting on what moved and what it was worth — then we sharpen the plan and go again.",
  },
];

export const seoCases: Case[] = [
  {
    kind: "confidential",
    client: "An automotive company",
    discipline: "Content & search",
    brief:
      "Their blog was busy but invisible, and their ad copy said what every competitor said. We rebuilt the content strategy around what their customers were actually searching for, and rewrote the copy around the selling points only they could claim.",
    outcome: "Organic traffic grew, engagement and conversion rates improved, and the blog built a loyal readership.",
    services: ["Content strategy", "SEO copywriting", "Ad copy"],
  },
];
