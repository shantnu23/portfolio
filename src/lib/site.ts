import { site } from "@/content/profile";

/**
 * Absolute base URL of the site.
 * Priority: configured domain → Vercel production URL → Vercel preview URL → localhost.
 */
export function getBaseUrl(): string {
  if (site.url) return site.url.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

/** Canonical URLs are only emitted once a real domain is configured. */
export const canonical = (pathname: string) => (site.url ? { canonical: pathname } : undefined);
