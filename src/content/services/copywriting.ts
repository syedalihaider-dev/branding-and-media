import { projects } from "@/content/site";
import type { Capability, Case, ServiceMeta, Step, Words } from "./types";

/**
 * Media Copywriting. The old site's Content practice lists ad copywriting,
 * SEO copywriting, web content and press writing; its case studies include
 * ad copy rewritten around a client's unique selling points. Copy rewritten.
 */

export const copyMeta: ServiceMeta = {
  path: "/media-copywriting",
  name: "Media Copywriting",
  title: "Media Copywriting & Brand Messaging",
  description:
    "Media copywriting for brands that need to be understood fast: ad copy, web copy, press releases, scripts, email and taglines — written in your voice, built on a clear message.",
  socialTitle: "Media Copywriting — Words that do the work | Branding and Media",
  serviceType: "Copywriting and brand messaging",
  og: {
    kicker: "Media copywriting",
    line: "Words that",
    accent: "do the work.",
    footnote: "Ads, web, press, scripts, email and taglines — written in your voice, built on one clear message.",
    alt: "Branding & Media media copywriting — words that do the work",
  },
};

/** Hero: the word the editor keeps — earlier drafts are struck out. */
export const copyDrafts = ["informs.", "describes.", "explains."];
export const copyFinal = "persuades.";

export const copyIntro = {
  statement: [
    { text: "People don't read copy." },
    { text: "They decide", em: true },
    { text: "whether it's worth reading — in about a second." },
  ] satisfies Words,
  body: "That second is the whole job. A headline has to earn the next line, the next line has to earn the click, and every word after it has to keep its promise. We write copy that is clear before it is clever, sounds like you on your best day, and always asks the reader to do one thing.",
  asideTitle: "Every piece answers",
  aside: ["Who is this for?", "What do they need to hear?", "Why believe it?", "What happens next?"],
};

/** What we write — set as type that takes over the viewport. */
export const copyFormats = [
  { word: "Ads", line: "Stop the scroll. Say one thing. Make it yours.", body: "Search, social, print and out-of-home — headlines and variations built to be tested." },
  { word: "Web", line: "Every page answers the question that brought someone there.", body: "Home, service and landing pages that guide readers and rank for the right searches." },
  { word: "Press", line: "News an editor can run without rewriting.", body: "Releases, media statements and announcements, written the way journalists read." },
  { word: "Scripts", line: "Written for the ear, timed to the second.", body: "Video, radio, podcast and presentation scripts with room to breathe." },
  { word: "Email", line: "A subject line worth opening; a reason to click.", body: "Campaigns, sequences and newsletters that people stay subscribed to." },
  { word: "Taglines", line: "Five words that carry the whole brand.", body: "Names, taglines and messaging frameworks your whole team can write from." },
];

/** Voice demonstration — one message, three registers. Illustrative copy. */
export const copyVoice = {
  message: "A scheduling app for small teams.",
  voices: [
    { name: "Confident", line: "Plan the week in ten minutes. Then get on with it." },
    { name: "Warm", line: "Fewer Sunday-night worries. Your week, planned together." },
    { name: "Precise", line: "Shared calendar, owners and deadlines — one weekly view." },
  ],
};

export const copyCapabilities: Capability[] = [
  {
    title: "Messaging & positioning",
    body: "The core message, proof points and language your brand returns to — so every writer, channel and campaign says the same thing well.",
    tags: ["Message house", "Value proposition", "Proof points"],
  },
  {
    title: "Brand voice",
    body: "A defined voice with real examples of what it does and doesn't sound like, ready for your team to use.",
    tags: ["Voice guide", "Tone by channel", "Word lists"],
  },
  {
    title: "Advertising copy",
    body: "Headlines, body copy and variations for search, social, display, print and out-of-home, written around what only you can claim.",
    tags: ["Search", "Social", "OOH & print"],
  },
  {
    title: "Website & SEO copy",
    body: "Pages that read naturally to people and clearly to search engines — structure, headings and calls to action included.",
    tags: ["Web pages", "Landing pages", "SEO copy"],
  },
  {
    title: "Press & announcements",
    body: "Press releases, statements and launch copy with the facts first and the story intact.",
    tags: ["Press releases", "Launches", "Statements"],
  },
  {
    title: "Scripts & campaigns",
    body: "Video and audio scripts, campaign concepts and the lines that tie a campaign together.",
    tags: ["Video", "Audio", "Concepts"],
  },
  {
    title: "Email & lifecycle",
    body: "Welcome series, launches and newsletters written to be opened, read and acted on.",
    tags: ["Sequences", "Newsletters", "Subject lines"],
  },
];

export const copyProcess: Step[] = [
  { title: "Brief", body: "Audience, goal, channel and the single thing the reader must take away — agreed before a word is written." },
  { title: "Research", body: "Your customers' own language, your competitors' claims, and the proof that makes yours believable." },
  { title: "Message", body: "The argument in one sentence. If we can't say it simply, we're not ready to write it." },
  { title: "Draft", body: "Several routes, not one — so you choose between ideas, not between commas." },
  { title: "Refine", body: "Edited hard for clarity, rhythm and length, then checked against the brief and your voice." },
  { title: "Deliver", body: "Final copy in every size and format the channel needs, with variations ready to test." },
];

const aventics = projects.find((p) => p.id === "aventics")!;

export const copyCases: Case[] = [
  {
    kind: "project",
    project: aventics,
    note: "A street-level campaign carried by three words — agility, focus, passion — and one clear idea a passer-by could take in at a glance.",
  },
];
