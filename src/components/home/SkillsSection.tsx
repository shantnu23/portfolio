import Link from "next/link";
import { skills } from "@/content/skills";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SkillsSection({ index = "05", bare = false }: { index?: string; bare?: boolean }) {
  return (
    <section aria-labelledby="skills-title" className={bare ? "" : "container-page py-20 sm:py-28"}>
      <SectionHeading
        id="skills-title"
        index={index}
        label="Toolkit"
        title="Tools I've worked with."
        lead="Grouped by area, with links to where I've actually used them. No percentage bars."
      />
      <div className="grid overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3 [&>*]:bg-surface gap-px">
        {skills.map((group, i) => (
          <Reveal key={group.title} delay={(i % 3) * 0.05} className="h-full">
            <div className="flex h-full flex-col p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg border border-line bg-canvas/50 text-signal">
                  <Icon name={group.icon} className="size-[18px]" />
                </span>
                <h3 className="font-medium text-fg">{group.title}</h3>
              </div>
              <ul className="mt-5 flex flex-wrap gap-x-1 gap-y-2 text-[0.95rem] text-muted">
                {group.items.map((item) => (
                  <li key={item} className="after:mx-2 after:text-line-strong after:content-['/'] last:after:content-none">
                    {item}
                  </li>
                ))}
              </ul>
              {group.appliedIn.length > 0 && (
                <p className="mt-auto pt-6 text-xs text-faint">
                  <span className="label-mono mr-2 !text-[0.62rem]">Applied in</span>
                  {group.appliedIn.map((a, k) => (
                    <span key={a.href}>
                      <Link href={a.href} className="text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-signal hover:decoration-signal/50">
                        {a.label}
                      </Link>
                      {k < group.appliedIn.length - 1 && ", "}
                    </span>
                  ))}
                </p>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
