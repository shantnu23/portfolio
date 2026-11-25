import type { Accent, Experience, YearMonth } from "@/content/types";

/** Join class names, skipping falsy values. */
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function parse(ym: YearMonth) {
  const [y, m] = ym.split("-").map(Number);
  return { year: y, month: MONTHS[m - 1] ?? "" };
}

/** "May – Jul 2025", "Dec 2025 – Feb 2026", "Jun 2026 – Present" */
export function formatRange(start: YearMonth, end: YearMonth | "present") {
  const s = parse(start);
  if (end === "present") return `${s.month} ${s.year} – Present`;
  const e = parse(end);
  return s.year === e.year ? `${s.month} – ${e.month} ${e.year}` : `${s.month} ${s.year} – ${e.month} ${e.year}`;
}

export const experienceRange = (e: Pick<Experience, "start" | "end">) => formatRange(e.start, e.end);

/**
 * Round SVG coordinates to 2 decimals. Trigonometry results can differ in the last
 * digits between the server (Node) and the browser, which breaks hydration.
 */
export const r2 = (n: number) => Math.round(n * 100) / 100;

/** Zero-padded index: 1 → "01" */
export const pad = (n: number) => String(n).padStart(2, "0");

/** RGB triplets for each accent — used for CSS variables such as --spot. */
export const accentRgb: Record<Accent, string> = {
  signal: "140 228 214",
  pulse: "168 154 247",
  solar: "233 196 138",
  ember: "240 163 163",
};

export const accentText: Record<Accent, string> = {
  signal: "text-signal",
  pulse: "text-pulse",
  solar: "text-solar",
  ember: "text-ember",
};

/** Is this an absolute external URL? */
export const isExternal = (href: string) => /^(https?:)?\/\//.test(href) || href.startsWith("mailto:");

/** Turn "**bold**" markers in content strings into segments. */
export function parseInline(text: string): { text: string; strong: boolean }[] {
  return text
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((part) =>
      part.startsWith("**") && part.endsWith("**") ? { text: part.slice(2, -2), strong: true } : { text: part, strong: false },
    );
}
