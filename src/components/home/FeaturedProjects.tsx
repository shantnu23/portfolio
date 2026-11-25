import { ArrowRight } from "lucide-react";
import { projects } from "@/content/projects";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);
  const [lead, ...rest] = featured;
  const upcoming = projects.filter((p) => !p.featured && p.status.tone === "planned");

  return (
    <section aria-labelledby="projects-title" className="container-page py-20 sm:py-28">
      <SectionHeading
        id="projects-title"
        index="04"
        label="Selected Projects"
        title="Things I've built."
        lead="From a blockchain energy exchange to multi-role web applications. Each one has a page explaining how it works."
        action={
          <LinkButton href="/projects" iconRight={<ArrowRight aria-hidden="true" className="size-4" />}>
            All projects
          </LinkButton>
        }
      />

      <div className="grid gap-5 md:grid-cols-2">
        {lead && (
          <Reveal className="md:col-span-2">
            <ProjectCard project={lead} size="feature" index={1} />
          </Reveal>
        )}
        {rest.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.06}>
            <ProjectCard project={p} index={i + 2} />
          </Reveal>
        ))}
        {upcoming.map((p, i) => (
          <Reveal key={p.slug} className="md:col-span-2">
            <ProjectCard project={p} size="compact" index={featured.length + i + 1} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
