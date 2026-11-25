import { GraduationCap } from "lucide-react";
import { education } from "@/content/education";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function EducationSection({ index = "02", compact = false }: { index?: string; compact?: boolean }) {
  return (
    <section aria-labelledby="education-title" className={compact ? "" : "container-page py-20 sm:py-24"}>
      <SectionHeading
        id="education-title"
        index={index}
        label="Education"
        title="Two programmes, in parallel."
        lead="A full-time engineering degree alongside an online data science degree from IIT Madras."
      />
      <div className="relative grid gap-5 md:grid-cols-2">
        {/* Connector between the two cards */}
        <span aria-hidden="true" className="absolute top-1/2 left-1/2 hidden h-px w-5 -translate-x-1/2 bg-line-strong md:block" />
        {education.map((ed, i) => (
          <Reveal key={ed.institution} delay={i * 0.08}>
            <article className="card flex h-full flex-col p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <p className="label-mono text-faint">
                  <span className="text-signal">EDU.{String(i + 1).padStart(2, "0")}</span> · {ed.mode}
                </p>
                <GraduationCap aria-hidden="true" className="size-5 text-faint" strokeWidth={1.5} />
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-[-0.015em] text-fg">{ed.institution}</h3>
              {ed.campus && <p className="mt-1 text-sm text-muted">{ed.campus}</p>}
              <p className="mt-5 text-[0.95rem] text-fg/90">{ed.program}</p>
              <p className="mt-1 text-sm text-muted">{ed.status}</p>
              {ed.note && <p className="mt-4 text-sm leading-relaxed text-faint">{ed.note}</p>}
              <div className="mt-auto pt-8">
                <dl className="flex gap-8 border-t border-line pt-5">
                  {ed.details.map((d) => (
                    <div key={d.label}>
                      <dt className="label-mono text-faint">{d.label}</dt>
                      <dd className="mt-1.5 font-mono text-lg text-fg">{d.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
