import fs from "node:fs";
import path from "node:path";

/**
 * Build-time check for files in /public.
 *
 * Pages are statically generated, so this runs during `next build` (and on
 * each request in `next dev`). It lets the site show a designed placeholder
 * instead of a broken image or a 404 link when an asset hasn't been added yet:
 * drop the file into /public and the real asset appears on the next build.
 *
 * Only call from Server Components.
 */
export function assetExists(src: string | null | undefined): src is string {
  if (!src) return false;
  if (/^https?:\/\//.test(src)) return true;
  const clean = decodeURI(src.split(/[?#]/)[0]).replace(/^\/+/, "");
  try {
    return fs.statSync(path.join(process.cwd(), "public", clean)).isFile();
  } catch {
    return false;
  }
}
