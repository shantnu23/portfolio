/** Extract the video ID from any common YouTube URL format. */
export function youTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") return u.pathname.slice(1) || null;
    if (u.hostname.endsWith("youtube.com") || u.hostname.endsWith("youtube-nocookie.com")) {
      if (u.searchParams.get("v")) return u.searchParams.get("v");
      const match = u.pathname.match(/\/(embed|shorts|live)\/([\w-]{6,})/);
      if (match) return match[2];
    }
  } catch {
    /* not a URL — fall through */
  }
  return /^[\w-]{11}$/.test(url) ? url : null;
}
