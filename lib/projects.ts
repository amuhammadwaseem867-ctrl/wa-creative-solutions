import { fieldProjects } from "./field-projects";
import { liveProjects } from "./live-projects";

/**
 * Portfolio data.
 *
 * - `kind: "live"`  — real, deployed builds (see lib/live-projects.ts). Each links
 *   to its live site. No client relationship, testimonial or result is implied
 *   beyond what the live site itself shows.
 * - `kind: "concept"` — self-initiated design explorations, always labelled.
 */
/** Work is organised by the studio's six service fields (ids match lib/services.ts). */
export type WorkCategory = "brand-identity" | "web" | "ai" | "3d-motion" | "marketing" | "graphic";

export const workCategories: { id: WorkCategory; label: string }[] = [
  { id: "brand-identity", label: "Brand Identity" },
  { id: "web", label: "Web Design & Development" },
  { id: "ai", label: "AI Solutions" },
  { id: "3d-motion", label: "3D, CGI & Motion" },
  { id: "marketing", label: "Marketing & Content" },
  { id: "graphic", label: "Graphic Design" },
];

export type ProjectKind = "live" | "concept";

export type ProjectImage = { src: string; alt: string; width: number; height: number; caption?: string };

export type Project = {
  slug: string;
  title: string;
  discipline: string;
  categories: WorkCategory[];
  kind: ProjectKind;
  summary: string;
  overview: string;
  /** Concept projects: the brief we set ourselves and how we answered it. */
  challenge?: string;
  solution?: string;
  /** Live projects: what was built, and with what. */
  features?: string[];
  tech?: string[];
  services: string[];
  /** Optional brand palette shown on the case study. */
  palette?: string[];
  cover: ProjectImage;
  gallery: ProjectImage[];
  /** Live projects: a tall capture of the home page, scrolled inside the browser frame. */
  scroll?: ProjectImage;
  /** Live projects: the home page on a phone. */
  mobile?: ProjectImage;
  liveUrl?: string;
};

export const projects: Project[] = [...liveProjects, ...fieldProjects];

/** Projects for one service field, live work first. */
export const projectsForField = (field: WorkCategory) => projects.filter((p) => p.categories.includes(field));

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
