"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Entry = { id: string; number: string; title: string };

/** Sticky "On this page" navigation with scroll-spy. Desktop only. */
export function SectionNav({ entries }: { entries: Entry[] }) {
  const [active, setActive] = useState(entries[0]?.id);

  useEffect(() => {
    const els = entries.map((e) => document.getElementById(e.id)).filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (records) => {
        const visible = records.filter((r) => r.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [entries]);

  return (
    <nav aria-label="On this page" className="sticky top-28">
      <p className="label-mono text-faint">On this page</p>
      <ol className="mt-4 space-y-0.5 border-l border-line">
        {entries.map((e) => {
          const on = e.id === active;
          return (
            <li key={e.id}>
              <a
                href={`#${e.id}`}
                aria-current={on ? "location" : undefined}
                className={cn(
                  "-ml-px flex gap-3 border-l py-1.5 pl-4 text-sm transition-colors",
                  on ? "border-signal text-fg" : "border-transparent text-faint hover:text-muted",
                )}
              >
                <span className={cn("font-mono text-xs leading-5", on ? "text-signal" : "")}>{e.number}</span>
                <span className="leading-5">{e.title}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
