import { PencilLine } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Clearly-marked content placeholder, used where information hasn't been
 * supplied yet. It is never styled to look like real content.
 */
export function Pending({ children, className }: { children: string; className?: string }) {
  return (
    <p
      className={cn(
        "flex items-start gap-3 rounded-lg border border-dashed border-pulse/30 bg-pulse/[0.04] px-4 py-3 text-sm leading-relaxed text-muted",
        className,
      )}
    >
      <PencilLine aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-pulse" strokeWidth={1.6} />
      <span>
        <span className="label-mono mr-2 !text-[0.65rem] text-pulse">Content pending</span>
        {children}
      </span>
    </p>
  );
}
