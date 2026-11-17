import { projects } from "@/content/site";
import type { Capability, Case, ServiceMeta, Step, Words } from "./types";

/**
 * Web Design & Development. Offer drawn from brandingandmedia.com/technology
 * (UX/UI, development, CX design, prototypes, apps, author and personal-brand
 * websites); copy rewritten for the new site.
 */

export const webMeta: ServiceMeta = {
  path: "/web-design-and-development",
  name: "Web Design & Development",
  title: "Web Design & Development Agency",
  description:
    "Custom web design and development: UX/UI, responsive builds, author and personal-brand websites and e-commerce — designed around the people using them, built to perform.",
  socialTitle: "Web Design & Development — Websites built to be lived in | Branding and Media",
  serviceType: "Web design and development",
  og: {
    kicker: "Web design & development",
    line: "Built to be",
    accent: "lived in.",
    footnote: "Custom websites — UX/UI, development and digital experiences designed around the people using them.",
    alt: "Branding & Media web design and development — built to be lived in",
  },
};

export const webIntro = {
  statement: [
    { text: "Your website is the one place your brand is" },
    { text: "entirely yours.", em: true },
    { text: "It should feel like it." },
  ] satisfies Words,
  body: "Most visitors decide in seconds whether to stay. We plan every page around that moment — what they need to see, what they need to believe, and what they should do next — then design and engineer it to load fast, read clearly and work on every screen.",
  asideTitle: "Every build includes",
  aside: [
    "Strategy & information architecture",
    "A UX/UI design system",
    "Responsive, accessible development",
    "Search-ready foundations",
    "Launch support & ongoing care",
  ],
};

export const webCapabilities: Capability[] = [
  {
    title: "UX & UI design",
    body: "Journeys mapped from what people actually come to do, then a design system — type, colour, components, motion — that scales as you grow.",
    tags: ["Research", "Wireframes", "Design systems", "Prototypes"],
  },
  {
    title: "Website development",
    body: "Fast, accessible, search-ready builds. Custom code where it earns its keep, a CMS your team will actually enjoy using where it doesn't.",
    tags: ["Front-end", "CMS", "Performance", "Accessibility"],
  },
  {
    title: "Author & personal-brand websites",
    body: "A home for your name and your work: biography, books, media kit, speaking, events and every place to buy — in one voice.",
    tags: ["Author sites", "Media kits", "Book pages"],
  },
  {
    title: "E-commerce",
    body: "Storefronts that make choosing easy and checkout effortless, connected to the inventory, payment and shipping tools you already run.",
    tags: ["Product pages", "Checkout", "Integrations"],
  },
  {
    title: "CX design & prototypes",
    body: "Clickable prototypes that put an idea in front of real customers before a line of production code is written.",
    tags: ["Journey mapping", "Prototyping", "Testing"],
  },
  {
    title: "Apps & software",
    body: "When a website isn't enough: web apps, mobile apps and custom software, built on the same design thinking.",
    tags: ["Web apps", "Mobile", "Custom software"],
  },
  {
    title: "Care & optimization",
    body: "Hosting, updates, security and steady improvement after launch — so the site gets better with age instead of older.",
    tags: ["Maintenance", "Analytics", "CRO"],
  },
];

export const webProcess: Step[] = [
  {
    title: "Discover",
    body: "Goals, audiences, competitors and content. We learn what the site has to do before deciding what it should look like.",
  },
  {
    title: "Architect",
    body: "Sitemap, user journeys and wireframes. The structure is agreed before a single pixel is styled.",
  },
  {
    title: "Design",
    body: "Your brand translated into a living design system — type, colour, imagery, components and motion.",
  },
  {
    title: "Build",
    body: "Clean, performant code. Responsive by default, accessible by standard, search-ready from the first commit.",
  },
  {
    title: "Launch",
    body: "Tested across browsers and devices, analytics in place, redirects mapped. Then we go live — calmly.",
  },
  {
    title: "Evolve",
    body: "We watch how people use it and keep refining. A good website is never finished; it's looked after.",
  },
];

const butterfly = projects.find((p) => p.id === "butterfly-effect")!;
const healthy = projects.find((p) => p.id === "healthy-lifestyle")!;

export const webCases: Case[] = [
  {
    kind: "project",
    project: butterfly,
    note: "An author website with the rhythm of the book it serves — editorial layouts, bold portraiture and a clear path to buy.",
  },
  {
    kind: "project",
    project: healthy,
    note: "One digital home for a collective of wellness personalities: a shared identity that still lets every expert stand out.",
  },
];
