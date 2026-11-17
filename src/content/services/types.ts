import type { Project } from "@/content/site";

/**
 * Shared shapes for the Digital Growth & Marketing service pages.
 * Copy lives in one file per service; components stay presentational.
 */

/** A run of words; `em` words are set in the serif italic accent. */
export type Words = { text: string; em?: boolean }[];

export type ServiceMeta = {
  /** Flat, top-level route — services never nest under their category. */
  path: `/${string}`;
  /** Display name, also used in breadcrumbs and JSON-LD. */
  name: string;
  /** Document <title> (the layout template appends the brand). */
  title: string;
  description: string;
  socialTitle: string;
  /** schema.org Service.serviceType */
  serviceType: string;
  og: { kicker: string; line: string; accent: string; footnote: string; alt: string };
};

export type Capability = {
  title: string;
  body: string;
  tags?: string[];
};

export type Step = {
  title: string;
  body: string;
};

export type Case =
  | {
      kind: "project";
      project: Project;
      /** Why this project belongs on this page. */
      note: string;
    }
  | {
      /** Real engagement from the agency's case studies; client unnamed. */
      kind: "confidential";
      client: string;
      discipline: string;
      brief: string;
      outcome: string;
      services: string[];
    };

/** The service tones. Each maps to a header theme. */
export type Tone = "ink" | "ink-2" | "bone" | "paper" | "signal" | "oxblood" | "blush";

export const headerThemeFor = (tone: Tone) =>
  tone === "signal" ? "signal" : tone === "bone" || tone === "paper" || tone === "blush" ? "light" : "dark";
