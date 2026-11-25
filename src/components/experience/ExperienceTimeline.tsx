import Link from "next/link";
import { ArrowRight, Lock, MapPin } from "lucide-react";
import type { Experience } from "@/content/types";
import { Reveal } from "@/components/ui/Reveal";
import { Spotlight } from "@/components/ui/Spotlight";
import { TechList } from "@/components/ui/TechBadge";
import { accentRgb, accentText, cn, experienceRange } from "@/lib/utils";

/** Vertical engineering timeline: a rail with nodes, dates on the left (desktop), cards on the right. */
export function ExperienceTimeline({ items, detailed = false }: { items: Experience[]; detailed?: boolean }) {
  return (
    <ol className="relative">
      {/* Rail */}
      <span
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-signal/50 via-line-strong to-transparent md:left-[calc(11rem+7px)]"
      />
      {items.map((exp, i) => (
        <li key={exp.slug} className="relative pb-8 pl-8 last:pb-0 md:grid md:grid-cols-[11rem_1fr] md:pl-0">
          {/* Node */}
          <span
            aria-hidden="true"
            className="absolute top-7 left-0 flex size-[15px] items-center justify-center rounded-full border border-line-strong bg-canvas md:left-44"
          >
            <span className={cn("size-[5px] rounded-full", i === 0 ? "bg-signal" : "bg-muted/60")} />
          </span>

          {/* Date column (desktop) */}
          <div className="hidden pt-6 pr-10 text-right md:block">
            <p className="font-mono text-sm text-fg">{experienceRange(exp)}</p>
            <p className="label-mono mt-2 text-faint">{exp.domain}</p>
          </div>

          <Reveal delay={i * 0.05} className="md:pl-10">
            <ExperienceCard exp={exp} detailed={detailed} />
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

export function ExperienceCard({ exp, detailed }: { exp: Experience; detailed?: boolean }) {
  return (
    <Spotlight rgb={accentRgb[exp.accent]} className="card group">
      <Link href={`/experience/${exp.slug}`} className="block rounded-[inherit] p-6 sm:p-7">
        <div className="space-y-1.5 md:hidden">
          <p className="font-mono text-xs text-fg">{experienceRange(exp)}</p>
          <p className="label-mono text-faint">{exp.domain}</p>
        </div>

        <div className="mt-3 flex items-start justify-between gap-4 md:mt-0">
          <div>
            <h3 className="text-xl font-semibold tracking-[-0.015em] text-fg sm:text-2xl">{exp.company}</h3>
            <p className={cn("mt-1 text-sm font-medium", accentText[exp.accent])}>{exp.role}</p>
          </div>
          <span className="mt-1 inline-flex shrink-0 items-center gap-1.5 text-sm text-muted transition-colors group-hover:text-fg">
            <span className="hidden sm:inline">Case study</span>
            <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>

        <p className="mt-4 max-w-2xl leading-relaxed text-pretty text-muted">{exp.summary}</p>

        {detailed && (
          <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {exp.location && (
              <div className="flex items-center gap-1.5 text-muted">
                <dt className="sr-only">Location</dt>
                <MapPin aria-hidden="true" className="size-3.5 text-faint" />
                <dd>{exp.location}</dd>
              </div>
            )}
            {exp.confidential && (
              <div className="flex items-center gap-1.5 text-muted">
                <dt className="sr-only">Note</dt>
                <Lock aria-hidden="true" className="size-3.5 text-faint" />
                <dd>Details limited by NDA</dd>
              </div>
            )}
          </dl>
        )}

        <TechList items={exp.tech} max={detailed ? undefined : 5} className="mt-5" />
      </Link>
    </Spotlight>
  );
}
