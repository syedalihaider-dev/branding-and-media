import { projects, testimonials } from "@/content/site";
import type { Capability, Case, ServiceMeta, Step, Words } from "./types";

/**
 * Online Reputation Management. Drawn from the old site's personal
 * branding, digital PR, Google Knowledge Panel, author-profile and SEO
 * work. Copy rewritten. No removal guarantees are promised — reputation
 * is managed by building the right presence, honestly.
 */

export const reputationMeta: ServiceMeta = {
  path: "/online-reputation-management",
  name: "Online Reputation Management",
  title: "Online Reputation Management",
  description:
    "Online reputation management for people and companies: audit what search shows, monitor what's said, respond with care and build the presence that should come first — personal and corporate.",
  socialTitle: "Online Reputation Management — What they find when they search you | Branding and Media",
  serviceType: "Online reputation management",
  og: {
    kicker: "Online reputation management",
    line: "What they find",
    accent: "when they search you.",
    footnote: "Audit, monitoring, response and the presence that should come first — for people and companies.",
    alt: "Branding & Media online reputation management — what they find when they search you",
  },
};

export const reputationIntro = {
  statement: [
    { text: "People decide who you are" },
    { text: "before you say a word.", em: true },
  ] satisfies Words,
  body: "Investors, clients, employers and readers search before they call. What they find on the first page — and what's missing from it — becomes your first impression. We make that page accurate, current and deliberate: not by hiding the record, but by making sure the best of it is the easiest to find.",
  asideTitle: "We look after",
  aside: ["Founders & executives", "Authors & public figures", "Companies & brands", "Professionals in transition"],
};

/** The illustrative first page of results — before and after. */
export const reputationResults = {
  query: "your name",
  before: [
    { kind: "Forum thread", title: "Anyone know what happened with…?", meta: "Posted 2019 · 14 replies" },
    { kind: "Review", title: "★★☆☆☆ — Never heard back", meta: "Unanswered" },
    { kind: "Directory", title: "Outdated listing — old address & title", meta: "Unclaimed profile" },
    { kind: "Social", title: "Inactive account, last post 2020", meta: "Profile" },
  ],
  after: [
    { kind: "Official site", title: "Your name — Founder, author, speaker", meta: "Your site · About · Press" },
    { kind: "Knowledge panel", title: "Verified summary, photo and profiles", meta: "Claimed" },
    { kind: "Feature", title: "In conversation: how they built it", meta: "Interview" },
    { kind: "Review", title: "★★☆☆☆ — Never heard back · Owner replied", meta: "Answered, resolved" },
  ],
};

export const reputationCapabilities: Capability[] = [
  {
    title: "Reputation audit",
    body: "A clear-eyed read of what search, reviews, social and news say about you today — and what each result is doing to trust.",
    tags: ["Search audit", "Sentiment", "Risk map"],
  },
  {
    title: "Monitoring",
    body: "Ongoing watch on your name, brand and leadership across search, reviews, news and social, so nothing surprises you.",
    tags: ["Alerts", "Reviews", "Mentions"],
  },
  {
    title: "Response strategy",
    body: "Calm, considered replies to reviews and criticism — and a plan ready before you need it, not drafted in a panic.",
    tags: ["Review replies", "Escalation", "Crisis planning"],
  },
  {
    title: "Owned presence",
    body: "A personal or company website, profiles and author pages built to be the first, most accurate answer to a search for you.",
    tags: ["Personal site", "Profiles", "Author pages"],
  },
  {
    title: "Knowledge panel & profiles",
    body: "Claiming and shaping the summary search engines show, along with LinkedIn, Amazon Author, Goodreads and directory listings.",
    tags: ["Google Knowledge Panel", "LinkedIn", "Directories"],
  },
  {
    title: "Positive content & PR",
    body: "Articles, interviews and features that tell the true, current story — earned coverage that deserves its place in the results.",
    tags: ["Features", "Thought leadership", "Digital PR"],
  },
  {
    title: "Search optimisation",
    body: "The technical and content work that lets the right pages rank for your name, and keeps them there.",
    tags: ["SEO", "Name searches", "Structured data"],
  },
];

export const reputationProcess: Step[] = [
  { title: "Audit", body: "Every result, review and mention that shapes how you're seen — mapped, ranked and assessed for risk." },
  { title: "Strategy", body: "Which story should lead, which channels to build, what needs a response and what's best left alone." },
  { title: "Respond", body: "Reviews answered, inaccuracies corrected through proper channels, outdated profiles claimed and updated." },
  { title: "Build", body: "Owned pages, profiles and earned coverage created to deserve the top of the results." },
  { title: "Monitor", body: "Continuous watch and monthly reporting — reputation isn't a project, it's a practice." },
];

const voice = (name: string) => testimonials.find((t) => t.name === name)!;
const hlb = projects.find((p) => p.id === "healthy-lifestyle")!;
const kate = voice("Kate Holden");
const steve = voice("Steve H.");

export const reputationCases: Case[] = [
  {
    kind: "project",
    project: hlb,
    note: "Many personal reputations under one roof: a single, confident platform for a collective of wellness authors, trainers and experts — so each is found, and found credible.",
  },
  { kind: "voice", quote: kate.quote, name: kate.name, context: kate.context },
  { kind: "voice", quote: steve.quote, name: steve.name, context: steve.context },
];
