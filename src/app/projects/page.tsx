import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { PageIntro } from "@/components/shared/PageIntro";
import { Reveal } from "@/components/ui/Reveal";
import { canonical } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects by Shantnu Saxena — blockchain, full-stack web applications and product concepts, each with its own case study.",
  alternates: canonical("/projects"),
};

/**
 * Gallery layout: the first project is wide, the next two sit side by side,
 * and planned projects appear as a compact strip. Additional projects fall
 * into the two-column grid automatically.
 */
export default function ProjectsPage() {
  const built = projects.filter((p) => p.status.tone !== "planned");
  const planned = projects.filter((p) => p.status.tone === "planned");
  const categories = Array.from(new Set(projects.map((p) => p.category)));

  return (
    <>
      <PageIntro
        label="Projects"
        title="Things I've built — and one I'm building."
        lead="Each project has its own page covering the problem, how it works, the stack, and what I learned."
      >
        <ul className="mt-8 flex flex-wrap gap-2" aria-label="Categories">
          {categories.map((c) => (
            <li key={c} className="label-mono rounded-full border border-line bg-surface/70 px-3 py-1.5 !text-[0.62rem] text-muted">
              {c} <span className="text-faint">· {projects.filter((p) => p.category === c).length}</span>
            </li>
          ))}
        </ul>
      </PageIntro>

      <div className="container-page pt-14">
        <div className="grid gap-5 md:grid-cols-2">
          {built.map((p, i) => (
            <Reveal key={p.slug} delay={i === 0 ? 0 : (i % 2) * 0.06} className={cn(i === 0 && "md:col-span-2")}>
              <ProjectCard project={p} size={i === 0 ? "feature" : "standard"} index={i + 1} headingLevel="h2" />
            </Reveal>
          ))}
        </div>

        {planned.length > 0 && (
          <section aria-labelledby="in-progress" className="mt-16">
            <p id="in-progress" className="label-mono mb-5 flex items-center gap-3 text-faint">
              <span className="size-1.5 rounded-full bg-pulse" aria-hidden="true" />
              In pre-production
            </p>
            <div className="grid gap-5">
              {planned.map((p, i) => (
                <Reveal key={p.slug}>
                  <ProjectCard project={p} size="compact" index={built.length + i + 1} headingLevel="h2" />
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
