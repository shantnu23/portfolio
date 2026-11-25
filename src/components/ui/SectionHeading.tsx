import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** "01 / EXPERIENCE" label with a connector line, then a heading and optional lead. */
export function SectionHeading({
  index,
  label,
  title,
  lead,
  action,
  className,
  id,
}: {
  index?: string;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  action?: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div className={cn("mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between", className)}>
      <div className="max-w-2xl">
        <p className="label-mono flex items-center gap-3 text-faint">
          {index && <span className="text-signal">{index}</span>}
          {index && <span aria-hidden="true">/</span>}
          <span>{label}</span>
          <span aria-hidden="true" className="h-px w-10 bg-gradient-to-r from-line-strong to-transparent" />
        </p>
        <h2
          id={id}
          className="mt-4 text-3xl font-semibold tracking-[-0.025em] text-balance text-fg sm:text-[2.5rem] sm:leading-[1.1]"
        >
          {title}
        </h2>
        {lead && <p className="mt-4 max-w-xl text-base leading-relaxed text-pretty text-muted">{lead}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
