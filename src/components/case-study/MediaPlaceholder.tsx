import { ImageIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Deliberate empty state for media that hasn't been supplied yet
 * (screenshots, diagrams, video). Never pretends to be real content.
 */
export function MediaPlaceholder({
  label,
  hint,
  icon,
  className,
  aspect = "aspect-[16/10]",
}: {
  label: string;
  hint?: string;
  icon?: ReactNode;
  className?: string;
  aspect?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-line-strong bg-surface/60 p-6 text-center",
        aspect,
        className,
      )}
    >
      <div aria-hidden="true" className="bg-dots absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_75%)]" />
      <span className="relative flex size-10 items-center justify-center rounded-full border border-line bg-canvas text-faint">
        {icon ?? <ImageIcon aria-hidden="true" className="size-4" strokeWidth={1.6} />}
      </span>
      <p className="relative mt-4 text-sm font-medium text-muted">{label}</p>
      {hint && <p className="label-mono relative mt-2 !text-[0.62rem] text-faint">{hint}</p>}
    </div>
  );
}
