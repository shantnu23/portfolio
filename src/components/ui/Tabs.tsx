"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Accessible tabs (WAI-ARIA tab pattern, arrow-key navigation).
 * Inactive panels stay mounted but hidden, so their state is kept.
 */
export function Tabs({
  tabs,
  label,
  actions,
}: {
  tabs: { label: string; content: ReactNode }[];
  label: string;
  /** Optional controls shown at the end of the tab row (e.g. an external link). */
  actions?: ReactNode;
}) {
  const [active, setActive] = useState(0);
  const id = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = (i: number) => {
    const next = (i + tabs.length) % tabs.length;
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <div
        role="tablist"
        aria-label={label}
        className="inline-flex max-w-full overflow-x-auto rounded-full border border-line bg-surface p-1"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") focusTab(active + 1);
          if (e.key === "ArrowLeft") focusTab(active - 1);
        }}
      >
        {tabs.map((t, i) => (
          <button
            key={t.label}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${id}-panel-${i}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={cn(
              "shrink-0 whitespace-nowrap rounded-full px-4 py-1.5 text-sm transition-colors",
              i === active ? "bg-white/[0.08] text-fg" : "text-muted hover:text-fg",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      {actions}
      </div>
      {tabs.map((t, i) => (
        <div key={t.label} role="tabpanel" id={`${id}-panel-${i}`} aria-labelledby={`${id}-tab-${i}`} hidden={i !== active}>
          {t.content}
        </div>
      ))}
    </div>
  );
}
