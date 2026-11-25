import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/types";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TechList } from "@/components/ui/TechBadge";
import { Spotlight } from "@/components/ui/Spotlight";
import { accentRgb, cn } from "@/lib/utils";
import { ProjectArtwork } from "./ProjectArtwork";

/**
 * Clickable project card. The whole card is one link.
 * - "feature": wide, artwork beside the text (lg+)
 * - "standard": artwork on top
 * - "compact": horizontal strip, used for early-stage projects
 */
export function ProjectCard({
  project,
  size = "standard",
  index,
  className,
  headingLevel = "h3",
}: {
  project: Project;
  size?: "feature" | "standard" | "compact";
  index?: number;
  className?: string;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const planned = project.status.tone === "planned";

  return (
    <Spotlight rgb={accentRgb[project.accent]} className={cn("card group h-full overflow-hidden", className)}>
      <Link
        href={`/projects/${project.slug}`}
        className={cn(
          "relative flex h-full rounded-[inherit]",
          size === "feature" && "flex-col lg:flex-row",
          size === "standard" && "flex-col",
          size === "compact" && "flex-col sm:flex-row sm:items-stretch",
        )}
      >
        {/* Artwork */}
        <div
          className={cn(
            "relative shrink-0 overflow-hidden border-line bg-canvas/40",
            size === "feature" && "aspect-[16/10] border-b lg:order-2 lg:aspect-auto lg:w-[52%] lg:border-b-0 lg:border-l",
            size === "standard" && "aspect-[16/9] border-b",
            size === "compact" && "aspect-[16/7] border-b sm:aspect-auto sm:w-80 sm:border-r sm:border-b-0",
          )}
        >
          <ProjectArtwork
            variant={project.artwork}
            accent={project.accent}
            className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          {planned && (
            <div aria-hidden="true" className="absolute inset-0 bg-[repeating-linear-gradient(135deg,transparent_0_10px,rgb(168_154_247/0.035)_10px_11px)]" />
          )}
          <div className="absolute top-4 left-4">
            <StatusBadge status={project.status} />
          </div>
        </div>

        {/* Text */}
        <div className={cn("flex flex-1 flex-col p-6", size === "feature" && "lg:p-9", size === "compact" && "sm:justify-center")}>
          <div className="flex items-center justify-between gap-4">
            <p className="label-mono text-faint">
              {index !== undefined && <span className="mr-2 text-signal">{String(index).padStart(2, "0")}</span>}
              {project.category}
            </p>
            <span className="inline-flex size-9 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 group-hover:border-signal/50 group-hover:bg-signal/10 group-hover:text-signal">
              <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
          <Heading
            className={cn(
              "mt-4 font-semibold tracking-[-0.02em] text-fg",
              size === "feature" ? "text-3xl lg:text-4xl" : "text-2xl",
            )}
          >
            {project.name}
          </Heading>
          <p className={cn("mt-3 leading-relaxed text-pretty text-muted", size === "feature" ? "text-base lg:text-lg" : "text-[0.95rem]")}>
            {project.tagline}
          </p>
          <p className="mt-3 text-xs text-faint">{project.context}</p>
          <div className={cn("mt-auto pt-6", size === "feature" && "lg:pt-10")}>
            <TechList items={project.tech} max={size === "feature" ? 6 : 4} />
          </div>
        </div>
      </Link>
    </Spotlight>
  );
}
