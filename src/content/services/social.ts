import type { Capability, ServiceMeta, Step, Words } from "./types";

/**
 * Social Media Marketing. Offer drawn from brandingandmedia.com/marketing/
 * social-media (strategy for personal and corporate brands, targeted
 * campaigns, analytics; social and influencer marketing for corporates and
 * for authors/individuals); copy rewritten.
 */

export const socialMeta: ServiceMeta = {
  path: "/social-media-marketing",
  name: "Social Media Marketing",
  title: "Social Media Marketing Agency",
  description:
    "Social media marketing from Branding and Media: strategy, content and campaign production, community management and influencer partnerships for companies, authors and personal brands.",
  socialTitle: "Social Media Marketing — Made to be shared | Branding and Media",
  serviceType: "Social media marketing",
  og: {
    kicker: "Social media marketing",
    line: "Made to be",
    accent: "shared.",
    footnote: "Strategy, content, community and creators — social run like a creative studio, not a posting schedule.",
    alt: "Branding & Media social media marketing — made to be shared",
  },
};

export type Still = { src: string; alt: string };

const s = (name: string, alt: string): Still => ({ src: `/media/stills/${name}.webp`, alt });

/** Campaign frames from Branding & Media films, recut as vertical content. */
export const socialFeed: { still: Still; format: string }[][] = [
  [
    { still: s("duo", "Two friends posing close together against a lilac backdrop"), format: "Reel · 0:15" },
    { still: s("arena", "A runner sprinting through an empty stadium at night"), format: "Story" },
    { still: s("spotlight", "A woman in a sequinned gown on a lit staircase"), format: "Carousel · 1/6" },
  ],
  [
    { still: s("peach", "Peaches and strawberries floating in sparkling water"), format: "Product drop" },
    { still: s("portrait", "A man with windswept hair against a deep blue wall"), format: "Creator collab" },
    { still: s("moment", "A woman savouring a spoonful of dessert by a window"), format: "Reel · 0:30" },
  ],
  [
    { still: s("reach", "A figure reaching up into a bright blue sky"), format: "Campaign" },
    { still: s("stage", "A dancer turning in a candlelit hall"), format: "Live" },
    { still: s("reflection", "A plane reflected in a man's patterned sunglasses"), format: "Story" },
  ],
  [
    { still: s("storyteller", "A bearded storyteller laughing in a wicker chair"), format: "Interview" },
    { still: s("lens", "A glass sphere suspended among bubbles in blue water"), format: "Teaser" },
    { still: s("haze", "A silhouette walking through soft morning haze"), format: "Carousel · 3/8" },
  ],
];

export const socialIntro = {
  statement: [
    { text: "Nobody follows a brand. People follow a" },
    { text: "point of view.", em: true },
  ] satisfies Words,
  body: "The feeds are full of companies posting because they feel they should. We start with what you stand for and who you're speaking to, then build the content, community and creator partnerships that turn attention into a following — and a following into customers, readers or clients.",
  asideTitle: "Where we work",
  aside: ["Instagram", "TikTok", "LinkedIn", "YouTube", "Facebook", "X & Threads"],
};

export const socialFormats: { title: string; body: string; still: Still; video?: boolean }[] = [
  {
    title: "Short-form video",
    body: "A hook in the first second, a story in fifteen. Made for the sound-off scroll.",
    still: { src: "/media/reel/poster.webp", alt: "Frame from the Branding & Media showreel" },
    video: true,
  },
  {
    title: "Carousels",
    body: "Ideas people save, send and come back to — the quiet engine of reach.",
    still: s("spotlight", "A woman in a sequinned gown on a lit staircase"),
  },
  {
    title: "Stories",
    body: "The daily, unpolished, human side of the brand. Where trust is built.",
    still: s("duo", "Two friends posing close together against a lilac backdrop"),
  },
  {
    title: "Creator collaborations",
    body: "Borrowed trust, matched carefully to your audience — not bought by the follower.",
    still: s("portrait", "A man with windswept hair against a deep blue wall"),
  },
  {
    title: "Live & events",
    body: "Launches, Q&As and behind-the-scenes in real time, with real questions.",
    still: s("stage", "A dancer turning in a candlelit hall"),
  },
  {
    title: "Paid social",
    body: "Your best-performing content, put deliberately in front of the right people.",
    still: s("peach", "Peaches and strawberries floating in sparkling water"),
  },
];

export const socialAudiences = [
  {
    id: "companies",
    label: "For companies",
    title: ["Corporate social that", "sounds human."],
    body: "Employer brand, thought leadership, launches and campaigns — one consistent voice across every channel, from the CEO's LinkedIn to the brand's Reels.",
    points: ["Social strategy & content", "Influencer marketing for corporates", "Executive & employer brand"],
    still: s("stage", "A dancer turning in a candlelit hall"),
  },
  {
    id: "authors",
    label: "For authors & individuals",
    title: ["A readership before", "launch day."],
    body: "Author content, reader communities and influencer partnerships that sell books and grow a name — and keep both growing long after release.",
    points: ["Social media for authors", "Influencer marketing for individuals", "Personal brand content"],
    still: s("storyteller", "A bearded storyteller laughing in a wicker chair"),
  },
];

export const socialCapabilities: Capability[] = [
  {
    title: "Social strategy",
    body: "Positioning, audiences, platforms and a content system aligned to short- and long-term goals — written down, agreed, followed.",
    tags: ["Audit", "Positioning", "Channel plan"],
  },
  {
    title: "Content & campaign production",
    body: "Ideas, scripts, shoots, edits and design. Campaign thinking applied to every post, not just the big launch.",
    tags: ["Video", "Photography", "Design", "Copy"],
  },
  {
    title: "Community management",
    body: "Replies, conversations and moderation in your voice. Communities are built in the comments.",
    tags: ["Engagement", "Moderation", "Social care"],
  },
  {
    title: "Influencer & creator marketing",
    body: "Creators matched on audience and values, briefed properly, and measured on what they actually move.",
    tags: ["Corporates", "Authors", "Individuals"],
  },
  {
    title: "Paid social",
    body: "Targeted campaigns that put proven content in front of precisely the people you need.",
    tags: ["Targeting", "Creative testing", "Retargeting"],
  },
  {
    title: "Analytics & insight",
    body: "Performance reporting that explains what worked and why, then feeds straight back into the plan.",
    tags: ["Reporting", "Social listening", "Insight"],
  },
];

export const socialLoop: Step[] = [
  { title: "Listen", body: "What your audience talks about, shares and ignores — before we say a word." },
  { title: "Plan", body: "A point of view, content pillars and a calendar built around moments that matter." },
  { title: "Create", body: "Campaign-grade content in native formats, produced at the pace social demands." },
  { title: "Publish", body: "The right post, on the right platform, at the moment your audience is there." },
  { title: "Engage", body: "Conversations answered, creators activated, community nurtured — daily." },
  { title: "Learn", body: "What worked, what didn't and why. Then the loop starts again, sharper." },
];
