import { ArrowUpRight, PenTool } from "lucide-react";

/**
 * Prominent link to a live diagram that can't be embedded
 * (e.g. an Excalidraw collaboration room, which Excalidraw disables inside iframes).
 */
export function LiveDiagramLink({ url, title }: { url: string; title: string }) {
  let host = "external";
  try {
    host = new URL(url).hostname.replace(/^www\./, "");
  } catch {
    /* keep fallback */
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="card group flex flex-col gap-5 p-5 transition-colors hover:border-signal/40 sm:flex-row sm:items-center sm:p-6"
    >
      <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-signal/30 bg-signal/[0.06] text-signal">
        <PenTool aria-hidden="true" className="size-5" strokeWidth={1.6} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="label-mono block !text-[0.62rem] text-faint">
          <span className="text-signal">{host}</span> · full diagram
        </span>
        <span className="mt-2 block font-medium text-fg">{title}</span>
        <span className="mt-1 block text-sm leading-relaxed text-muted">
          The complete hand-drawn architecture in Excalidraw — every agent, integration and data flow. Opens in a new tab, where you
          can zoom and pan freely.
        </span>
      </span>
      <span className="inline-flex h-10 shrink-0 items-center gap-2 self-start rounded-full bg-signal px-4 text-sm font-medium text-canvas transition-colors group-hover:bg-[#a6ede2] sm:self-center">
        Open diagram
        <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </a>
  );
}
