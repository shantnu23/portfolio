import type { Fact } from "@/content/types";
import { cn } from "@/lib/utils";

const cols = { 1: "sm:grid-cols-1", 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-4" } as const;

export function FactList({ facts, className }: { facts: Fact[]; className?: string }) {
  const n = Math.min(Math.max(facts.length, 1), 4) as 1 | 2 | 3 | 4;
  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line",
        "[&>*:last-child:nth-child(odd)]:col-span-2 sm:[&>*:last-child:nth-child(odd)]:col-span-1",
        cols[n],
        className,
      )}
    >
      {facts.map((f) => (
        <div key={f.label} className="bg-surface px-4 py-4">
          <dt className="label-mono !text-[0.62rem] text-faint">{f.label}</dt>
          <dd className="mt-2 text-sm text-fg">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}
