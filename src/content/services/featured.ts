import { press } from "@/content/site";
import type { Capability, ServiceMeta, Step, Words } from "./types";

/**
 * Featured Media Placements. The old site lists national TV, digital
 * publications, digital PR/influencers and the Times Square book
 * announcement, and shows an "As seen in" press list. That list is the only
 * publication proof used here, set as type (never as logos) and labelled
 * exactly as the homepage labels it.
 */

export const featuredMeta: ServiceMeta = {
  path: "/featured-media-placements",
  name: "Featured Media Placements",
  title: "Featured Media Placements",
  description:
    "Featured media placements for brands, executives and authors: profiles, cover stories, lists and premium features positioned for prestige and lasting authority — plus Times Square announcements.",
  socialTitle: "Featured Media Placements — Not mentioned. Featured. | Branding and Media",
  serviceType: "Featured media placement and premium PR",
  og: {
    kicker: "Featured media placements",
    line: "Not mentioned.",
    accent: "Featured.",
    footnote: "Profiles, cover stories and premium features — the placements that build authority.",
    alt: "Branding & Media featured media placements — not mentioned, featured",
  },
};

export const featuredIntro = {
  statement: [
    { text: "A mention is noticed." },
    { text: "A feature", em: true },
    { text: "is kept, quoted and framed on the wall." },
  ] satisfies Words,
  body: "There's coverage, and there's being the story. A featured placement gives you the page, the photograph and the headline — the kind of recognition that's shared, linked from your site, quoted in proposals and remembered years later. We position you for that tier of attention and handle everything it asks of you.",
  asideTitle: "Built for",
  aside: ["Founders & leaders", "Authors & creators", "Experts & public figures", "Brands with a moment"],
};

/** Placement formats — kinds of feature, never named publications. */
export const featuredFormats = [
  {
    format: "The profile",
    line: "You, in full.",
    body: "A long-form portrait of the person behind the brand — background, conviction and the work.",
    still: { src: "/media/stills/spotlight.webp", alt: "A woman in a sequinned gown pausing on a theatre staircase" },
  },
  {
    format: "The cover story",
    line: "The front of the issue.",
    body: "The most competitive space in media. We build the story, the shoot and the timing worth giving it to.",
    still: { src: "/media/stills/portrait.webp", alt: "A man facing the camera against a deep blue backdrop" },
  },
  {
    format: "The list",
    line: "Named among the best.",
    body: "Industry lists, awards nominations and roundups — researched, entered and supported with proof.",
    still: { src: "/media/stills/stage.webp", alt: "A woman walking onto an ornate theatre stage" },
  },
  {
    format: "The feature",
    line: "The story behind the success.",
    body: "Brand and company features that explain what you do and why it matters, with your voice at the centre.",
    still: { src: "/media/stills/storyteller.webp", alt: "A bearded storyteller seated outdoors in a wicker chair" },
  },
  {
    format: "The billboard",
    line: "Times Square, your name.",
    body: "A Times Square book or brand announcement — the public moment, captured and shared everywhere after.",
    still: { src: "/media/stills/haze.webp", alt: "A figure silhouetted against a wall of soft, hazy light" },
  },
];

/** "As seen in", as on the homepage. */
export const featuredPress = press;

export const featuredCapabilities: Capability[] = [
  {
    title: "Positioning for prestige",
    body: "We build the narrative, credentials and proof that premium editors expect before they'll give someone the page.",
    tags: ["Narrative", "Credentials", "Angles"],
  },
  {
    title: "Feature & profile placement",
    body: "Pitching long-form profiles and brand features to the publications your audience respects.",
    tags: ["Profiles", "Features", "Interviews"],
  },
  {
    title: "Lists & awards",
    body: "Identifying the lists and awards that matter in your field, then preparing strong, evidenced entries.",
    tags: ["Industry lists", "Awards", "Nominations"],
  },
  {
    title: "Editorial shoots",
    body: "Art-directed portraiture and imagery to editorial standard — because a feature is judged by its photograph.",
    tags: ["Portraits", "Art direction", "Press images"],
  },
  {
    title: "Times Square announcements",
    body: "Your book or brand on the screens above Times Square, filmed and photographed for every channel you own.",
    tags: ["Book announcements", "Launches", "OOH"],
  },
  {
    title: "Featured-in amplification",
    body: "Turning every placement into lasting assets: an 'as featured in' page, social cuts, proposals and pitch decks.",
    tags: ["Press page", "Social", "Sales collateral"],
  },
];

export const featuredProcess: Step[] = [
  { title: "Credentials", body: "We gather what makes you feature-worthy — achievements, expertise, the story — and fill the gaps honestly." },
  { title: "Narrative", body: "One clear story an editor can picture on the page, with the angle that fits their readers." },
  { title: "Assets", body: "Editorial photography, bios and supporting material prepared to premium standard." },
  { title: "Placement", body: "Targeted pitches and relationships, with interviews and shoots coordinated end to end." },
  { title: "Legacy", body: "Each feature turned into lasting proof — on your site, in your pitches and across your channels." },
];
