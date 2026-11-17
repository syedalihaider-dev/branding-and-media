import { projects } from "@/content/site";
import type { Capability, Case, ServiceMeta, Step, Words } from "./types";

/**
 * Media Publications. The old site lists digital publications, digital PR,
 * feature-article writing and thought-leadership building within its
 * Media and Content practices. Copy rewritten; no publications named as
 * placements (the press list appears only as the site's "As seen in").
 */

export const publicationsMeta: ServiceMeta = {
  path: "/media-publications",
  name: "Media Publications",
  title: "Media Publications & Digital PR",
  description:
    "Get published where your audience reads: feature stories, bylined articles, expert commentary and digital PR for brands, executives and authors — angle, writing and editorial outreach.",
  socialTitle: "Media Publications — Be the story they print | Branding and Media",
  serviceType: "Digital PR and media publication placement",
  og: {
    kicker: "Media publications",
    line: "Be the story",
    accent: "they print.",
    footnote: "Features, bylines and expert commentary — angled, written and pitched to the right desks.",
    alt: "Branding & Media media publications — be the story they print",
  },
};

export const publicationsIntro = {
  statement: [
    { text: "Advertising is what you say about yourself." },
    { text: "Press", em: true },
    { text: "is what others say about you." },
  ] satisfies Words,
  body: "Readers know the difference. A feature, an expert quote or a bylined article carries an editor's judgement with it — the quiet endorsement that your story was worth the space. Our job is to find that story, shape it the way editors need it, and put it in front of the desks that cover your world.",
  asideTitle: "Written for",
  aside: ["Brands & companies", "Executives & founders", "Authors", "Experts & coaches"],
};

/** The anatomy of a placed story: what we shape, element by element. */
export const publicationsAnatomy = [
  { part: "Headline", label: "The angle", body: "Why this, why now, why you. An editor reads the angle before anything else — so we build it first." },
  { part: "Standfirst", label: "The hook", body: "Two lines that turn a passing reader into a committed one. Specific, never promotional." },
  { part: "Image", label: "The assets", body: "Press-ready photography, bios and visuals, sized and captioned before a journalist has to ask." },
  { part: "Pull quote", label: "The voice", body: "The line you'll be quoted on. We draft it with you until it is unmistakably yours." },
  { part: "Body", label: "The proof", body: "Experience, data and examples that make the story stand up to an editor's scrutiny." },
];

/** Formats, set as columns of a broadsheet. */
export const publicationsColumns = [
  { kicker: "Features", title: "The story told properly", body: "Profiles and features built around a genuine narrative — the founding, the turnaround, the book behind the author." },
  { kicker: "Bylines", title: "Your name above the article", body: "Thought-leadership and op-ed pieces written in your voice and placed where your peers read." },
  { kicker: "Commentary", title: "The expert they call", body: "Quotes and comment on the stories already running in your field — the fastest route to recognised authority." },
  { kicker: "Announcements", title: "News, framed as news", body: "Launches, milestones and books turned into releases that read like stories, not adverts." },
  { kicker: "Digital PR", title: "Coverage that ranks", body: "Online publications and features that earn links and search visibility long after publication day." },
  { kicker: "Q&As", title: "In conversation", body: "Interview-led pieces that let readers hear you directly — with talking points prepared in advance." },
];

export const publicationsCapabilities: Capability[] = [
  {
    title: "Story mining",
    body: "Interviews with you and your team to find the angles worth printing — the insight, the opinion, the moment.",
    tags: ["Angles", "Narrative", "News hooks"],
  },
  {
    title: "Feature & article writing",
    body: "Features, op-eds and bylined pieces written to editorial standard, in your voice.",
    tags: ["Features", "Op-eds", "Bylines"],
  },
  {
    title: "Press releases",
    body: "Announcements written the way journalists want to receive them: clear, factual and worth covering.",
    tags: ["Releases", "Newswire", "Embargoes"],
  },
  {
    title: "Editorial outreach",
    body: "Researched, personal pitches to the editors and writers who cover your subject — not mass email blasts.",
    tags: ["Media lists", "Pitching", "Follow-up"],
  },
  {
    title: "Digital publications & PR",
    body: "Placement across online publications and digital media, with an eye on the links and search value coverage brings.",
    tags: ["Online press", "Digital PR", "SEO value"],
  },
  {
    title: "Press kit & newsroom",
    body: "Bios, photography, fact sheets and a newsroom page on your site — everything an editor needs, in one place.",
    tags: ["Press kit", "Newsroom", "Photography"],
  },
];

export const publicationsProcess: Step[] = [
  { title: "Story", body: "We interview you, read everything and find the angles that are genuinely news — not just news to you." },
  { title: "Angle", body: "Each angle matched to the desks and readers it suits, with a reason an editor should care this week." },
  { title: "Draft", body: "Pitches, releases and articles written to editorial standard, with quotes and assets ready." },
  { title: "Outreach", body: "Personal pitches to the right editors and writers, followed up properly — persistence without pestering." },
  { title: "Publish", body: "Interviews coordinated, facts checked, approvals turned around fast so nothing stalls before print." },
  { title: "Amplify", body: "Coverage shared, linked and archived in your newsroom — so every piece keeps building authority." },
];

const naval = projects.find((p) => p.id === "naval")!;

export const publicationsCases: Case[] = [
  {
    kind: "project",
    project: naval,
    note: "Editorial craft in print: a shipbuilding partner's story told at industrial scale with human detail — the same discipline we bring to every story we shape for the press.",
  },
  {
    kind: "confidential",
    client: "An automotive company",
    discipline: "Editorial content",
    brief:
      "They had expertise but no voice in their industry. We launched a programme of articles written for readers, not search engines, and sharpened the messaging around what only they could say.",
    outcome: "More organic readers — and a recognised voice of authority in their industry.",
    services: ["Article writing", "Content strategy", "Messaging"],
  },
];
