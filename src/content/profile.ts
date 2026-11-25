import type { Url } from "./types";

/**
 * Personal details, links and site-wide settings.
 *
 * ▸ Any link set to `null` is treated as "not supplied yet": the matching
 *   button is hidden, or shown as a non-clickable placeholder.
 * ▸ Paste full URLs, e.g. "https://github.com/your-handle".
 */

export const site = {
  /**
   * Production domain, e.g. "https://shantnusaxena.dev".
   * Used for canonical URLs, the sitemap and Open Graph tags.
   * When `null`, the Vercel deployment URL is used automatically if available.
   */
  url: "https://portfolio-shantnu.vercel.app" as Url,
  title: "Shantnu Saxena — AI & Software Engineer",
  description:
    "Portfolio of Shantnu Saxena, a final-year Computer Science undergraduate building across AI engineering, full-stack development, blockchain and robotics simulation.",
  /** Shown in the footer as "Last updated". */
  lastUpdated: "November 2026",
};

export const profile = {
  name: "Shantnu Saxena",
  firstName: "Shantnu",
  initials: "SS",
  headline: "Building intelligent systems and practical software.",
  /** The hero renders the headline in two tones: `lead` bright, `tail` muted. */
  headlineParts: { lead: "Building intelligent systems", tail: "and practical software." },
  intro:
    "I'm a final-year Computer Science undergraduate working across AI engineering, full-stack development and emerging technologies. I like taking complex technical ideas apart and turning them into software that works.",
  shortRole: "CS undergraduate · AI & full-stack engineering",
  education: ["B.Tech CSE · BIT Mesra, Jaipur Campus", "BS Data Science · IIT Madras"],

  /**
   * Small status pill in the hero. Set `enabled: false` to hide it.
   * Tone "active" shows a soft pulsing dot; "neutral" shows a static one.
   * Example alternatives:
   *   "Open to SDE & AI engineering roles"
   *   "Open to internships — Summer 2027"
   */
  status: {
    enabled: true,
    label: "Final-year student at BIT Mesra",
    tone: "active" as "active" | "neutral",
  },

  /** "Currently" panel on the homepage. Keep each item short and honest. */
  currentFocus: [
    {
      title: "Shaping Fam_Sync",
      detail: "Scoping a family-coordination app before writing code.",
      href: "/projects/fam-sync",
    },
    {
      title: "AI-assisted development",
      detail: "Exploring how coding agents fit into real engineering workflows.",
      href: null,
    },
    {
      title: "Final year of B.Tech",
      detail: "Computer Science and Engineering at BIT Mesra — graduating 2027.",
      href: null,
    },
  ] as { title: string; detail: string; href: string | null }[],

  /** Areas shown in the hero system diagram. Keep labels short. */
  interests: [
    { key: "ai", label: "AI Agents", detail: "LLMs, RAG and agentic workflows", where: "Technology Mindz" },
    { key: "fullstack", label: "Full Stack", detail: "APIs, data models and product UIs", where: "Beema Ghar · MediFix" },
    { key: "chain", label: "Blockchain", detail: "Smart contracts on Algorand", where: "SolarChain" },
    { key: "robotics", label: "Robotics", detail: "Simulation and autonomous navigation", where: "VigilRonyx AI" },
    { key: "tooling", label: "Dev Tooling", detail: "AI-assisted software development", where: "Current focus" },
  ],
};

export const links = {
  email: "shantnusaxena2005@gmail.com",
  /** e.g. "https://github.com/<handle>" */
  github: "https://github.com/shantnu23" as Url,
  /** e.g. "https://www.linkedin.com/in/<handle>" */
  linkedin: "https://www.linkedin.com/in/shantnu-saxena-361950249" as Url,
  /** e.g. "https://discord.com/users/<numeric-id>" — optional if username is set */
  discord: null as Url,
  /** Discord username, shown with a copy button when no profile URL is set. */
  discordUsername: "rolf1587" as string | null,
};

export const resume = {
  /**
   * Put your PDF at /public/resume/<file> and keep this path in sync.
   * The Download Resume button appears automatically once the file exists.
   */
  href: "/resume/Shantnu_Saxena_Resume.pdf",
  downloadName: "Shantnu_Saxena_Resume.pdf",
};
