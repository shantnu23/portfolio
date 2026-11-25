/**
 * Content model for the portfolio.
 *
 * Everything shown on the site is described with these types and lives in
 * the other files in `src/content/`. UI components only read this data, so
 * changing a description, link, image or tech stack never requires touching
 * component code.
 *
 * Conventions
 * - A URL that is `null` has not been supplied yet. Buttons for missing links
 *   are hidden, or shown as a non-clickable "coming soon" state.
 * - Image / video paths are relative to `/public` (e.g. "/media/projects/x.png").
 *   If the file does not exist yet, a designed placeholder is rendered instead.
 * - `pending` fields are visible notes marking content still to be written.
 */

export type Url = string | null;

/** Icon keys. The mapping to actual icons lives in `components/ui/Icon.tsx`. */
export type IconName =
  | "activity"
  | "bell"
  | "blocks"
  | "bot"
  | "calendar"
  | "calendar-clock"
  | "car"
  | "chart"
  | "clipboard"
  | "compass"
  | "cpu"
  | "dashboard"
  | "database"
  | "file-text"
  | "folder-lock"
  | "gavel"
  | "git-branch"
  | "heart-pulse"
  | "house"
  | "key"
  | "layers"
  | "link"
  | "list-checks"
  | "mail"
  | "map-pin"
  | "message"
  | "navigation"
  | "network"
  | "parking"
  | "plane"
  | "radar"
  | "refresh"
  | "route"
  | "scan-text"
  | "search"
  | "send"
  | "server"
  | "shield"
  | "siren"
  | "sparkles"
  | "stethoscope"
  | "sun"
  | "timer"
  | "users"
  | "wallet"
  | "workflow"
  | "zap";

/** Accent colour used to tint a case study. */
export type Accent = "signal" | "pulse" | "solar" | "ember";

export type MediaImage = {
  /** Path under /public, e.g. "/media/projects/medifix/dashboard.png" */
  src: string;
  alt: string;
  /** Intrinsic size of the file — used to reserve space and avoid layout shift. */
  width: number;
  height: number;
  caption?: string;
};

export type VideoSource =
  /** Any YouTube URL: watch?v=, youtu.be/, /embed/ or /shorts/ */
  | { kind: "youtube"; url: string; title: string }
  /** A file in /public, e.g. "/media/projects/solarchain/demo.mp4" */
  | { kind: "file"; src: string; poster?: string; title: string };

export type Fact = { label: string; value: string };

/* ------------------------------------------------------------------ */
/*  Case-study blocks                                                  */
/*  A case study is an ordered list of blocks. Sections are numbered   */
/*  automatically (01, 02, …) in the order they appear.               */
/* ------------------------------------------------------------------ */

type BlockBase = {
  /** Short section name, shown as "03 — Title" and in the side navigation. */
  title: string;
  /** Optional larger statement heading. Falls back to `title`. */
  heading?: string;
  /** Optional lead paragraph under the heading. */
  intro?: string;
  /** Visible "content pending" note shown at the end of the section. */
  pending?: string;
};

export type ProseBlock = BlockBase & {
  type: "prose";
  body: string[];
  /** Optional side panel (e.g. "At a glance"). */
  aside?: { title: string; items: string[] };
};

export type FeatureItem = {
  icon: IconName;
  title: string;
  description: string;
  /** Mark planned / explored ideas so they are never confused with built features. */
  status?: "implemented" | "proposed" | "explored";
};

export type FeaturesBlock = BlockBase & {
  type: "features";
  items: FeatureItem[];
  columns?: 2 | 3;
};

export type StepsBlock = BlockBase & {
  type: "steps";
  items: { title: string; description: string }[];
};

export type ArchitectureDiagram = MediaImage & {
  /** Tab label when a block has more than one diagram, e.g. "Core workflow". */
  label?: string;
  /**
   * "paper" for diagrams with a light background (default Excalidraw export),
   * "dark" for diagrams designed for dark backgrounds.
   */
  surface?: "paper" | "dark";
  /** Shown under the diagram, e.g. to say it is a simplified draft. */
  note?: string;
};

export type ArchitectureBlock = BlockBase & {
  type: "architecture";
  /** One or more diagrams. Several are shown as tabs, each with the zoom viewer. */
  diagrams: ArchitectureDiagram[];
  annotations: { title: string; description: string }[];
  /**
   * Optional link to the live source (e.g. an Excalidraw link), shown as an
   * "Open in …" button. With `embed: true` and a read-only link, it is also
   * offered as an in-page interactive window (note: excalidraw.com may prompt
   * returning visitors to replace their local drawing).
   */
  live?: { url: string; title?: string; label?: string; embed?: boolean };
};

export type AgentsBlock = BlockBase & {
  type: "agents";
  items: {
    name: string;
    role: string;
    /** Optional routing label shown in the hero pipeline, e.g. "warm" / "hot". */
    route?: string;
    description: string;
    responsibilities: string[];
    tools: string[];
  }[];
};

export type FlowBlock = BlockBase & {
  type: "flow";
  /** Layers drawn left → right (or top → bottom on mobile). */
  tiers: { label: string; nodes: { title: string; detail?: string }[] }[];
  note?: string;
};

export type GalleryBlock = BlockBase & {
  type: "gallery";
  images: MediaImage[];
  /**
   * "grid" (default) shows all images at once; "carousel" shows one large image
   * at a time with back / forward buttons, starting with the first image.
   */
  layout?: "grid" | "carousel";
  /** Grid only: crop thumbnails to one aspect ratio (CSS ratio, e.g. "16/10"). The lightbox always shows the full image. */
  crop?: string;
  /** Placeholder frames shown for screenshots that have not been added yet. */
  expected?: string[];
};

export type VideoBlock = BlockBase & {
  type: "video";
  video: VideoSource | null;
};

export type StackBlock = BlockBase & {
  type: "stack";
  groups: { label: string; items: string[] }[];
};

export type NotesBlock = BlockBase & {
  type: "notes";
  items: { title: string; description: string }[];
  /** "proposed" renders the block as future / not-yet-built work. */
  tone?: "default" | "proposed";
};

export type ListBlock = BlockBase & {
  type: "list";
  items: string[];
};

export type RolesBlock = BlockBase & {
  type: "roles";
  items: { name: string; description: string; capabilities: string[] }[];
};

export type RoadmapBlock = BlockBase & {
  type: "roadmap";
  phases: { title: string; description: string; status: "done" | "current" | "planned" }[];
};

export type AchievementsBlock = BlockBase & {
  type: "achievements";
  /** IDs from `content/achievements.ts` */
  ids: string[];
};

export type LinksBlock = BlockBase & {
  type: "links";
  links: { label: string; href: Url; kind: "live" | "github" | "demo" | "video" | "doc"; pendingLabel?: string }[];
};

export type ConceptBlock = BlockBase & {
  type: "concept";
  /** Which conceptual interface to render. */
  variant: "fam-sync";
};

export type CalloutBlock = {
  type: "callout";
  tone: "info" | "confidential" | "concept" | "proposed";
  title: string;
  body: string;
};

export type Block =
  | ProseBlock
  | FeaturesBlock
  | StepsBlock
  | ArchitectureBlock
  | AgentsBlock
  | FlowBlock
  | GalleryBlock
  | VideoBlock
  | StackBlock
  | NotesBlock
  | ListBlock
  | RolesBlock
  | RoadmapBlock
  | AchievementsBlock
  | LinksBlock
  | ConceptBlock
  | CalloutBlock;

/* ------------------------------------------------------------------ */
/*  Experience & projects                                              */
/* ------------------------------------------------------------------ */

/** "YYYY-MM" */
export type YearMonth = `${number}-${number}`;

export type Experience = {
  slug: string;
  company: string;
  role: string;
  start: YearMonth;
  end: YearMonth | "present";
  location?: string;
  /** Short domain label, e.g. "AI Engineering" */
  domain: string;
  /** 1–2 sentences used on cards and the homepage. */
  summary: string;
  tech: string[];
  accent: Accent;
  /** Hero composition for the detail page. */
  layout: "architecture" | "product" | "minimal";
  /** Company website — optional. */
  website?: Url;
  /** Source repository — optional, shown as "View source" in the hero. */
  repoUrl?: Url;
  /** Live product URL (shown as the main hero action when supplied). */
  liveUrl?: Url;
  confidential?: boolean;
  /** Intro paragraph at the top of the detail page. */
  overview: string;
  facts: Fact[];
  /** Optional hero image (e.g. product screenshot). Placeholder if missing. */
  cover?: MediaImage;
  sections: Block[];
  seoDescription: string;
};

export type ProjectStatus = {
  label: string;
  tone: "live" | "complete" | "prototype" | "planned";
};

export type Project = {
  slug: string;
  name: string;
  /** One-line description for cards. */
  tagline: string;
  category: "Blockchain" | "Full Stack" | "Web Application" | "Product Concept";
  status: ProjectStatus;
  /** e.g. "Team of three", "IIT Madras · Modern Application Development" */
  context: string;
  tech: string[];
  accent: Accent;
  /** Abstract artwork used on cards and in the hero. */
  artwork: "solar" | "parking" | "medical" | "family";
  featured: boolean;
  links: { github: Url; live: Url };
  overview: string;
  facts: Fact[];
  sections: Block[];
  seoDescription: string;
};
