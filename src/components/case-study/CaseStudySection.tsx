import type { ReactNode } from "react";
import type { Accent } from "@/content/types";
import { Pending } from "@/components/ui/Pending";
import { Reveal } from "@/components/ui/Reveal";
import { accentText, cn } from "@/lib/utils";

/** One numbered section of a case study: "02 — The Architecture", heading, lead, content. */
export function CaseStudySection({
  id,
  number,
  title,
  heading,
  intro,
  pending,
  accent = "signal",
  children,
  wide = false,
}: {
  id: string;
  number: string;
  title: string;
  heading?: string;
  intro?: string;
  pending?: string;
  accent?: Accent;
  children?: ReactNode;
  /** Wide sections (diagrams, galleries) use the full column width for the content. */
  wide?: boolean;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="border-t border-line py-14 first:border-t-0 first:pt-0 sm:py-20">
      <Reveal>
        <p className="label-mono flex items-center gap-3 text-faint">
          <span className={accentText[accent]}>{number}</span>
          <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
          <span>{title}</span>
        </p>
        <h2
          id={`${id}-h`}
          className="mt-4 max-w-3xl text-2xl font-semibold tracking-[-0.02em] text-balance text-fg sm:text-[2rem] sm:leading-[1.15]"
        >
          {heading ?? title}
        </h2>
        {intro && <p className="prose-copy mt-5 max-w-3xl">{intro}</p>}
      </Reveal>
      {children && <div className={cn("mt-10", !wide && "max-w-4xl")}>{children}</div>}
      {pending && <Pending className="mt-8 max-w-3xl">{pending}</Pending>}
    </section>
  );
}
