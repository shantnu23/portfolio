import type { Accent, FeatureItem } from "@/content/types";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { accentText, cn } from "@/lib/utils";

const statusLabel = { implemented: "Built", proposed: "Proposed", explored: "Explored" } as const;

export function FeatureGrid({ items, columns = 3, accent = "signal" }: { items: FeatureItem[]; columns?: 2 | 3; accent?: Accent }) {
  // Filler cells keep the hairline grid complete when the last row isn't full.
  const fillSm = (2 - (items.length % 2)) % 2;
  const fillLg = columns === 3 ? (3 - (items.length % 3)) % 3 : fillSm;
  const fillers = Array.from({ length: Math.max(fillSm, fillLg) }, (_, i) =>
    cn("bg-surface bg-dots hidden", i < fillSm ? "sm:block" : "sm:hidden", i < fillLg ? "lg:block" : "lg:hidden"),
  );
  return (
    <ul
      className={cn(
        "grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2",
        columns === 3 && "lg:grid-cols-3",
      )}
    >
      {items.map((f, i) => {
        const proposed = f.status === "proposed" || f.status === "explored";
        return (
          <li key={f.title} className="group bg-surface">
            <Reveal delay={(i % columns) * 0.05} className="flex h-full flex-col p-6">
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "flex size-10 items-center justify-center rounded-lg border bg-canvas/60 transition-colors duration-300",
                    proposed ? "border-dashed border-pulse/40 text-pulse" : cn("border-line group-hover:border-line-strong", accentText[accent]),
                  )}
                >
                  <Icon name={f.icon} className="size-[18px]" />
                </span>
                {f.status && (
                  <span className={cn("label-mono !text-[0.6rem]", proposed ? "text-pulse" : "text-faint")}>{statusLabel[f.status]}</span>
                )}
              </div>
              <h3 className="mt-5 font-medium text-fg">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.description}</p>
            </Reveal>
          </li>
        );
      })}
      {fillers.map((cls, i) => (
        <li key={`filler-${i}`} aria-hidden="true" className={cls} />
      ))}
    </ul>
  );
}
