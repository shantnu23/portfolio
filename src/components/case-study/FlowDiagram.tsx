import { Fragment } from "react";
import type { Accent, FlowBlock } from "@/content/types";
import { accentRgb, cn } from "@/lib/utils";

/**
 * Simplified layered architecture (Client → API → Data → Services), drawn with
 * HTML so it reflows: horizontal on desktop, stacked on mobile.
 */
export function FlowDiagram({ tiers, note, accent = "signal" }: Pick<FlowBlock, "tiers" | "note"> & { accent?: Accent }) {
  const rgb = accentRgb[accent];
  return (
    <figure>
      <div className="card bg-dots overflow-hidden p-5 sm:p-8">
        <div className="flex flex-col items-stretch gap-0 lg:flex-row lg:items-center">
          {tiers.map((tier, i) => (
            <Fragment key={tier.label}>
              {i > 0 && <Connector rgb={rgb} />}
              <div className="flex-1 rounded-xl border border-line bg-canvas/80 p-4 backdrop-blur">
                <p className="label-mono flex items-center justify-between text-faint">
                  <span>{tier.label}</span>
                  <span style={{ color: `rgb(${rgb})` }}>{`L${i + 1}`}</span>
                </p>
                <ul className="mt-3 space-y-2">
                  {tier.nodes.map((n) => (
                    <li key={n.title} className="rounded-lg border border-line bg-surface-2 px-3 py-2.5">
                      <p className="text-sm font-medium text-fg">{n.title}</p>
                      {n.detail && <p className="mt-0.5 text-xs text-muted">{n.detail}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
      {note && <figcaption className="mt-3 font-mono text-xs text-faint">{note}</figcaption>}
    </figure>
  );
}

function Connector({ rgb }: { rgb: string }) {
  return (
    <div aria-hidden="true" className={cn("flex items-center justify-center", "h-8 lg:h-auto lg:w-10")}>
      <svg className="h-8 w-4 lg:hidden" viewBox="0 0 16 32" fill="none">
        <line x1="8" y1="0" x2="8" y2="26" stroke={`rgb(${rgb} / 0.6)`} className="flow-line animate-dash" strokeWidth="1.5" />
        <path d="M4 24l4 5 4-5" stroke={`rgb(${rgb} / 0.8)`} strokeWidth="1.5" />
      </svg>
      <svg className="hidden h-4 w-10 lg:block" viewBox="0 0 40 16" fill="none">
        <line x1="0" y1="8" x2="34" y2="8" stroke={`rgb(${rgb} / 0.6)`} className="flow-line animate-dash" strokeWidth="1.5" />
        <path d="M32 4l5 4-5 4" stroke={`rgb(${rgb} / 0.8)`} strokeWidth="1.5" />
      </svg>
    </div>
  );
}
