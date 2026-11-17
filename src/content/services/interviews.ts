import type { Capability, Case, ServiceMeta, Step, Words } from "./types";

/**
 * Media Interviews & Appearances. The old site's Media section lists
 * national TV, TV interviews, TED talks, authors on TV, podcast booking and
 * book tours, and frames TV interviews as a credible alternative to paid
 * commercials. Copy rewritten; no outlets, bookings or results claimed.
 */

export const interviewsMeta: ServiceMeta = {
  path: "/media-interviews-and-appearances",
  name: "Media Interviews & Appearances",
  title: "Media Interviews & TV Appearances",
  description:
    "Media interview booking and preparation for founders, executives, authors and experts — TV, podcasts, keynotes and talks, with positioning and media training before the cameras roll.",
  socialTitle: "Media Interviews & Appearances — Your voice, on the record | Branding and Media",
  serviceType: "Media interview booking and media training",
  og: {
    kicker: "Media interviews & appearances",
    line: "Your voice,",
    accent: "on the record.",
    footnote: "TV, podcasts, talks and stages — positioned, prepared and placed.",
    alt: "Branding & Media media interviews and appearances — your voice, on the record",
  },
};

export const interviewsIntro = {
  statement: [
    { text: "An advert asks to be believed." },
    { text: "An interview", em: true },
    { text: "lets people decide for themselves." },
  ] satisfies Words,
  body: "A commercial costs a fortune and everyone knows who paid for it. Sit across from a host, though, and you are judged on what you know and how you say it. That's why a single strong appearance can do more for trust than a quarter's ad spend — provided you walk in with the right story, for the right audience, ready.",
  asideTitle: "Who we put on air",
  aside: ["Founders & executives", "Authors", "Coaches & experts", "Companies with a story"],
};

/** The rooms we book. Stills are from Branding & Media's own films. */
export const interviewsStages = [
  {
    channel: "TV",
    title: "Television",
    body: "National and regional TV interviews, segments and expert commentary — the most credible few minutes a brand can earn.",
    still: { src: "/media/stills/portrait.webp", alt: "A man in a dark hoodie facing the camera against a deep blue backdrop" },
  },
  {
    channel: "Pod",
    title: "Podcasts",
    body: "Long-form conversations with hosts whose listeners are already your audience. Room to go deep, and a recording that keeps working.",
    still: { src: "/media/stills/storyteller.webp", alt: "A bearded storyteller seated in a wicker chair, mid-conversation" },
  },
  {
    channel: "Stage",
    title: "Talks & keynotes",
    body: "TED-style talks, keynotes and panels — narrative, delivery and visuals shaped until the room remembers one idea: yours.",
    still: { src: "/media/stills/stage.webp", alt: "A woman walking onto the stage of an ornate, warmly lit theatre" },
  },
  {
    channel: "Tour",
    title: "Author appearances",
    body: "Authors on TV, book tours, signings and readings — timed to a launch so attention turns into copies sold.",
    still: { src: "/media/stills/reader.webp", alt: "A man in glasses looking straight into the lens in a forest clearing" },
  },
];

/** The soundbite — set word by word as captions. */
export const interviewsSoundbite = {
  lead: "Most interviews are remembered for one sentence.",
  quote: "We make sure it's the sentence you meant to say.",
  note: "Message house, three proof points, one line that travels — rehearsed until it sounds unrehearsed.",
};

export const interviewsCapabilities: Capability[] = [
  {
    title: "Story & angle",
    body: "We find what is genuinely newsworthy about you — the expertise, the opinion, the timing — and shape it into an angle a producer can say yes to.",
    tags: ["Positioning", "Angles", "Talking points"],
  },
  {
    title: "Interview booking",
    body: "Pitching to producers, bookers and hosts across TV, radio and podcasts, matched to the audience you actually want to reach.",
    tags: ["TV", "Radio", "Podcasts"],
  },
  {
    title: "Media training",
    body: "On-camera practice, bridging, handling the hard question and landing your message inside a three-minute segment.",
    tags: ["On-camera", "Messaging", "Q&A drills"],
  },
  {
    title: "Talks & keynotes",
    body: "Narrative, structure, slides and delivery coaching for TED-style talks, keynotes and panels.",
    tags: ["TED-style talks", "Keynotes", "Panels"],
  },
  {
    title: "Author media tours",
    body: "TV, podcast and in-person appearances sequenced around a book launch — with signings and events to meet readers face to face.",
    tags: ["Authors on TV", "Book tours", "Signings"],
  },
  {
    title: "Press kits & one-sheets",
    body: "Bios, headshots, topic sheets and show-ready assets, so a booker has everything in one click.",
    tags: ["Bio", "One-sheet", "Headshots"],
  },
  {
    title: "Clips & amplification",
    body: "Every appearance cut into clips for social, your site and your next pitch — so one interview keeps earning.",
    tags: ["Clips", "Social", "Media page"],
  },
];

export const interviewsProcess: Step[] = [
  { title: "Find the story", body: "What do you know that an audience needs to hear right now? We dig until we find the angle only you can own." },
  { title: "Position", body: "Talking points, proof and a clear point of view — your message house, built before anyone books a seat." },
  { title: "Prepare", body: "Media training on camera: pace, posture, bridging and the difficult question. Practice until it's second nature." },
  { title: "Pitch & book", body: "Targeted outreach to the producers and hosts whose audiences match yours, with a press kit ready to send." },
  { title: "On air", body: "Briefing notes before, support on the day. You focus on the conversation; we handle everything around it." },
  { title: "Amplify", body: "Clips, posts and a media page that turn one appearance into months of credibility — and the next booking." },
];

export const interviewsCases: Case[] = [
  {
    kind: "confidential",
    client: "A lifestyle coach",
    discipline: "TED-style talk",
    brief:
      "Invited to give a talk that could define their public profile. We refined the narrative, coached the delivery and designed the visuals so the talk carried a single, memorable idea.",
    outcome: "A talk that established them as a thought leader in their field.",
    services: ["Narrative", "Presentation coaching", "Visuals"],
  },
  {
    kind: "confidential",
    client: "A fintech start-up",
    discipline: "Executive presentation",
    brief:
      "A high-stakes room and a story that wasn't landing. We rebuilt the narrative and the deck, then coached the executives presenting it until every answer was crisp.",
    outcome: "The founders walked in prepared — and secured substantial funding.",
    services: ["Executive coaching", "Narrative", "Pitch deck"],
  },
];
