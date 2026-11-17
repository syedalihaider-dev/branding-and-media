import type { Capability, Case, ServiceMeta, Words } from "./types";

/**
 * Blog & Article Writing. The old site lists blog writing, feature-article
 * writing and SEO copywriting; its case studies include a blog programme
 * that grew organic traffic. Copy rewritten.
 */

export const blogMeta: ServiceMeta = {
  path: "/blog-article-writing",
  name: "Blog & Article Writing",
  title: "Blog & Article Writing Services",
  description:
    "Blog and article writing that builds authority and search traffic: researched thought leadership, feature articles, guides and SEO content — planned, written and published on a steady schedule.",
  socialTitle: "Blog & Article Writing — Worth reading | Branding and Media",
  serviceType: "Blog and article writing",
  og: {
    kicker: "Blog & article writing",
    line: "Articles",
    accent: "worth reading.",
    footnote: "Thought leadership, features, guides and SEO content — researched, written and published on schedule.",
    alt: "Branding & Media blog and article writing — articles worth reading",
  },
};

export const blogIntro = {
  statement: [
    { text: "The internet has enough content." },
    { text: "It's short on", em: true },
    { text: "things worth reading." },
  ] satisfies Words,
  body: "A good article does three jobs at once: it answers a real question, it shows how you think, and it keeps being found for years. We plan topics around what your audience is actually searching for, research them properly, and write in your voice — so every piece adds to your authority instead of just your word count.",
  asideTitle: "Built to",
  aside: ["Answer real questions", "Rank for the right searches", "Show your expertise", "Turn readers into clients"],
};

/**
 * The life of one article, brief to inbox. The headline is illustrative —
 * the same idea shown at each stage of the work.
 */
export const blogLife = {
  topic: "Why good hires leave in their first year",
  final: "The first-year exit: why good hires leave, and what keeps them",
  stages: [
    { stage: "Brief", body: "One question your audience is asking, one reader in mind, one action we want them to take." },
    { stage: "Research", body: "Search data, interviews with your experts and credible sources — the substance before the style." },
    { stage: "Draft", body: "A structured first draft in your voice, built around a clear argument rather than keywords." },
    { stage: "Edit", body: "Cut, sharpen, fact-check. The headline gets rewritten more than anything else." },
    { stage: "Optimise", body: "Search title, description, headings and internal links — so the right readers can find it." },
    { stage: "Publish", body: "Formatted, illustrated and published, then shared to your newsletter and social channels." },
  ],
};

export const blogCapabilities: Capability[] = [
  { title: "Content strategy & calendar", body: "Topics chosen from search demand and your expertise, planned months ahead in a calendar your team can see.", tags: ["Topic research", "Calendar", "Clusters"] },
  { title: "Thought leadership", body: "Opinion and insight pieces in your voice that show how you think — the articles people forward.", tags: ["Op-eds", "Insight", "LinkedIn articles"] },
  { title: "Feature articles", body: "Longer, reported pieces with interviews and narrative — for your blog or for publication.", tags: ["Features", "Interviews", "Case stories"] },
  { title: "SEO articles & guides", body: "Comprehensive guides and how-tos written to answer the query completely and rank for it.", tags: ["Guides", "How-tos", "Pillar pages"] },
  { title: "Newsletters", body: "Regular editions that give subscribers a reason to open — and a path back to your site.", tags: ["Email", "Digest", "Editorial"] },
  { title: "Editing & refreshing", body: "Updating and improving existing articles so older content keeps earning traffic.", tags: ["Content audit", "Refresh", "Consolidation"] },
];

export const blogCases: Case[] = [
  {
    kind: "confidential",
    client: "An automotive company",
    discipline: "Blog programme",
    brief:
      "Strong expertise, no audience. We launched a blog written for the questions their customers were already searching, in a voice that sounded like the people who know the cars best.",
    outcome: "Organic traffic grew — and the company became a recognised voice in its industry.",
    services: ["Blog writing", "SEO content", "Content strategy"],
  },
];
