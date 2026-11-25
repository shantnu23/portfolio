import type { ProjectStatus } from "@/content/types";
import { cn } from "@/lib/utils";

const tones: Record<ProjectStatus["tone"], { dot: string; text: string; ring: string }> = {
  live: { dot: "bg-signal", text: "text-signal", ring: "border-signal/30" },
  complete: { dot: "bg-muted", text: "text-muted", ring: "border-line-strong" },
  prototype: { dot: "bg-solar", text: "text-solar", ring: "border-solar/30" },
  planned: { dot: "bg-pulse animate-blink", text: "text-pulse", ring: "border-pulse/35" },
};

export function StatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  const t = tones[status.tone];
  return (
    <span
      className={cn(
        "label-mono inline-flex items-center gap-2 whitespace-nowrap rounded-full border bg-canvas/70 px-2.5 py-1.5 !text-[0.65rem] backdrop-blur",
        t.ring,
        t.text,
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", t.dot)} aria-hidden="true" />
      {status.label}
    </span>
  );
}
