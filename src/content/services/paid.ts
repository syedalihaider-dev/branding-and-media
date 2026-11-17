import { projects } from "@/content/site";
import type { Capability, Case, ServiceMeta, Step, Words } from "./types";

/**
 * Paid Advertising. The old site lists digital advertising, SEM, targeted
 * campaigns, ad copywriting and out-of-home/print within its marketing
 * practice; copy rewritten. No platform partnerships or results claimed.
 */

export const paidMeta: ServiceMeta = {
  path: "/paid-advertising",
  name: "Paid Advertising",
  title: "Paid Advertising & PPC Management",
  description:
    "Paid advertising management: search, social, display, video and retargeting campaigns with the creative, landing pages and tracking to convert — every dollar accountable.",
  socialTitle: "Paid Advertising — Every dollar, accountable | Branding and Media",
  serviceType: "Paid advertising and PPC management",
  og: {
    kicker: "Paid advertising",
    line: "Every dollar,",
    accent: "accountable.",
    footnote: "Search, social, display, video and out-of-home campaigns — planned, created and optimized for return.",
    alt: "Branding & Media paid advertising — every dollar, accountable",
  },
};

export const paidIntro = {
  statement: [
    { text: "Reach is easy to buy." },
    { text: "Results", em: true },
    { text: "have to be engineered." },
  ] satisfies Words,
  body: "Anyone can spend an ad budget. We start from the outcome — a sale, a booking, a pre-order, a lead — and work backwards: who needs to see what, where, and how often. Then we test, cut what isn't working and put the money behind what is.",
  asideTitle: "Optimized for",
  aside: ["Cost per acquisition", "Return on ad spend", "Qualified leads", "Pre-orders & sales"],
};

export const paidChannels = ["Search", "Paid social", "Display", "Video", "Retargeting", "Out-of-home", "Print"];

export const paidFunnel = [
  { stage: "Audience", line: "Who, exactly?", body: "Targeting built from your best customers outward — not from the broadest net a platform will sell." },
  { stage: "Attention", line: "Earn the stop.", body: "Creative made for the placement and the second it has, tested in variations until one clearly wins." },
  { stage: "Action", line: "Convert the click.", body: "Landing pages that continue the ad's promise and remove every reason to leave." },
  { stage: "Return", line: "Count what counts.", body: "Tracking wired to revenue and leads, so budget follows results rather than impressions." },
];

export const paidCapabilities: Capability[] = [
  {
    title: "Search advertising",
    body: "Google and Microsoft Ads campaigns built on intent: tight keyword structure, sharp copy and bids managed for return.",
    tags: ["Google Ads", "Microsoft Ads", "Shopping"],
  },
  {
    title: "Paid social",
    body: "Campaigns across Meta, LinkedIn, TikTok and more, with audiences and creative developed together.",
    tags: ["Meta", "LinkedIn", "TikTok"],
  },
  {
    title: "Display & retargeting",
    body: "Bring back the people who almost said yes, with messages that move them the rest of the way.",
    tags: ["Display", "Remarketing", "Sequencing"],
  },
  {
    title: "Video advertising",
    body: "YouTube and in-feed video planned for the skip button — the story lands before the viewer can leave.",
    tags: ["YouTube", "In-feed", "CTV"],
  },
  {
    title: "Ad creative & copywriting",
    body: "Headlines, visuals and scripts written around the selling points only you can claim.",
    tags: ["Copy", "Design", "Variations"],
  },
  {
    title: "Landing pages & CRO",
    body: "Pages designed for one action, tested and refined until the cost of every result comes down.",
    tags: ["Landing pages", "A/B testing"],
  },
  {
    title: "Tracking & attribution",
    body: "Pixels, conversion events and analytics configured properly from day one — so every decision rests on real data.",
    tags: ["Analytics", "Conversion API", "Attribution"],
  },
  {
    title: "Out-of-home & print",
    body: "Billboards, transit and print for the moments a screen can't match — planned alongside digital, not apart from it.",
    tags: ["OOH", "Print ads", "Transit"],
  },
];

export const paidProcess: Step[] = [
  { title: "Target", body: "Goals, margins and audiences defined first — so we know what a good result is worth before spending a cent." },
  { title: "Create", body: "Ad creative and landing pages produced in variations, ready to be tested against each other." },
  { title: "Launch", body: "Campaigns structured cleanly, tracking verified, budgets paced. Nothing goes live unmeasured." },
  { title: "Test", body: "Audiences, messages and placements challenged weekly. Losers are cut quickly; winners earn the budget." },
  { title: "Scale", body: "What's proven gets more spend and new channels — with reporting that shows exactly what you got for it." },
];

const aventics = projects.find((p) => p.id === "aventics")!;

export const paidCases: Case[] = [
  {
    kind: "project",
    project: aventics,
    note: "Paid media at street level: an out-of-home campaign that put one clear idea — agility, focus, passion — in front of the right city.",
  },
  {
    kind: "confidential",
    client: "An automotive company",
    discipline: "Ad copy & content",
    brief:
      "Their ads sounded like every other dealer's. We rewrote the copy around the unique selling points only they could claim, with persuasive, specific messaging in place of generic promises.",
    outcome: "Engagement and conversion rates improved — the same budget, working harder.",
    services: ["Ad copywriting", "Messaging", "Content strategy"],
  },
];
