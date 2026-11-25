import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/types";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { LinkButton } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TechList } from "@/components/ui/TechBadge";
import { BackLink } from "@/components/case-study/PageNav";
import { FactList } from "@/components/case-study/FactList";
import { accentRgb, accentText } from "@/lib/utils";
import { ProjectArtwork } from "./ProjectArtwork";

export function ProjectHero({ project }: { project: Project }) {
  const rgb = accentRgb[project.accent];
  const { github, live } = project.links;

  return (
    <header className="relative isolate overflow-hidden border-b border-line pt-28 pb-14 sm:pt-32 sm:pb-20">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="bg-grid mask-fade-b absolute inset-0 opacity-70" />
        <div className="absolute -top-48 left-[5%] h-[420px] w-[620px] rounded-full blur-[130px]" style={{ background: `rgb(${rgb} / 0.08)` }} />
      </div>

      <div className="container-page">
        <BackLink href="/projects" label="All projects" />

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className={`label-mono ${accentText[project.accent]}`}>{project.category}</p>
              <StatusBadge status={project.status} />
            </div>
            <h1 className="mt-5 text-5xl font-semibold tracking-[-0.04em] text-fg sm:text-7xl">{project.name}</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-pretty text-fg/85">{project.tagline}</p>
            <p className="mt-4 max-w-xl leading-relaxed text-pretty text-muted">{project.overview}</p>
            <p className="mt-5 font-mono text-xs text-faint">{project.context}</p>

            {(live || github) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {live && (
                  <LinkButton href={live} variant="primary" iconRight={<ArrowUpRight aria-hidden="true" className="size-4" />}>
                    Live demo
                  </LinkButton>
                )}
                {github && (
                  <LinkButton href={github} icon={<GitHubIcon className="size-4" />}>
                    View source
                  </LinkButton>
                )}
              </div>
            )}
          </div>

          <div className="card relative aspect-[16/10] overflow-hidden">
            <ProjectArtwork variant={project.artwork} accent={project.accent} />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-white/5 ring-inset" />
            <span className="label-mono absolute right-4 bottom-4 !text-[0.6rem] text-faint">fig. {project.slug}</span>
          </div>
        </div>

        <FactList facts={project.facts} className="mt-12" />
        <TechList items={project.tech} className="mt-6" />
      </div>
    </header>
  );
}
