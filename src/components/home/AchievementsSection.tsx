import Link from "next/link";
import { ArrowUpRight, Award } from "lucide-react";
import { achievements, type Achievement } from "@/content/achievements";
import { projects } from "@/content/projects";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function AchievementsSection({ index = "06", bare = false }: { index?: string; bare?: boolean }) {
  return (
    <section aria-labelledby="achievements-title" className={bare ? "" : "container-page py-16 sm:py-20"}>
      <SectionHeading id="achievements-title" index={index} label="Recognition" title="Selected highlights." />
      <Reveal>
        <AchievementList items={achievements} />
      </Reveal>
    </section>
  );
}

/** Compact, secondary list — achievements support the work rather than headline it. */
export function AchievementList({ items, showProjectLinks = true }: { items: Achievement[]; showProjectLinks?: boolean }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((a) => {
        const project = showProjectLinks && a.project ? projects.find((p) => p.slug === a.project) : undefined;
        return (
          <li key={a.id} className="grid gap-2 py-5 sm:grid-cols-[6rem_1fr_auto] sm:items-baseline sm:gap-6">
            <p className="font-mono text-sm text-faint">{a.year ?? "—"}</p>
            <div>
              <p className="flex flex-wrap items-center gap-x-2 text-fg">
                <Award aria-hidden="true" className="size-4 translate-y-[1px] text-solar" strokeWidth={1.6} />
                <span className="font-medium">{a.title}</span>
                <span className="text-faint">—</span>
                <span>{a.event}</span>
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{a.description}</p>
            </div>
            {project && (
              <Link
                href={`/projects/${project.slug}`}
                className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-signal"
              >
                {project.name}
                <ArrowUpRight aria-hidden="true" className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
