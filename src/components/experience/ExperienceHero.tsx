import Image from "next/image";
import { ArrowUpRight, Lock, MonitorSmartphone } from "lucide-react";
import type { Experience } from "@/content/types";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { LinkButton, PendingButton } from "@/components/ui/Button";
import { TechList } from "@/components/ui/TechBadge";
import { BackLink } from "@/components/case-study/PageNav";
import { FactList } from "@/components/case-study/FactList";
import { MediaPlaceholder } from "@/components/case-study/MediaPlaceholder";
import { assetExists } from "@/lib/assets";
import { accentRgb, accentText, cn, experienceRange } from "@/lib/utils";

export function ExperienceHero({ exp }: { exp: Experience }) {
  const rgb = accentRgb[exp.accent];

  return (
    <header className="relative isolate overflow-hidden border-b border-line pt-28 pb-14 sm:pt-32 sm:pb-20">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="bg-grid mask-fade-b absolute inset-0 opacity-70" />
        <div className="absolute -top-48 right-[10%] h-[420px] w-[620px] rounded-full blur-[130px]" style={{ background: `rgb(${rgb} / 0.08)` }} />
      </div>

      <div className="container-page">
        <BackLink href="/experience" label="All experience" />

        <div className={cn("mt-10 grid gap-12", exp.layout === "product" && "lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14")}>
          <div className={cn(exp.layout !== "product" && "max-w-3xl")}>
            <p className="label-mono flex flex-wrap items-center gap-x-3 gap-y-1 text-faint">
              <span className={accentText[exp.accent]}>Internship</span>
              <span aria-hidden="true">/</span>
              <span>{exp.domain}</span>
              <span aria-hidden="true">/</span>
              <span>{experienceRange(exp)}</span>
            </p>
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.035em] text-balance text-fg sm:text-6xl">{exp.company}</h1>
            <p className={cn("mt-3 text-lg font-medium", accentText[exp.accent])}>{exp.role}</p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted">{exp.overview}</p>

            {exp.confidential && (
              <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-3.5 py-1.5 text-xs text-muted">
                <Lock aria-hidden="true" className="size-3.5" strokeWidth={1.7} />
                Details limited by a non-disclosure agreement
              </p>
            )}

            <HeroActions exp={exp} />
          </div>

          {exp.layout === "product" && <ProductCover exp={exp} />}
        </div>

        {exp.layout === "architecture" && <AgentPipeline exp={exp} />}

        <FactList facts={exp.facts} className="mt-12" />
        <TechList items={exp.tech} className="mt-6" />
      </div>
    </header>
  );
}

function HeroActions({ exp }: { exp: Experience }) {
  const showLive = exp.layout === "product" || exp.liveUrl;
  if (!showLive && !exp.website && !exp.repoUrl) return null;
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {exp.repoUrl && (
        <LinkButton href={exp.repoUrl} variant={showLive ? "secondary" : "primary"} icon={<GitHubIcon className="size-4" />}>
          View source
        </LinkButton>
      )}
      {showLive &&
        (exp.liveUrl ? (
          <LinkButton href={exp.liveUrl} variant="primary" iconRight={<ArrowUpRight aria-hidden="true" className="size-4" />}>
            Visit live website
          </LinkButton>
        ) : (
          <PendingButton>Live link coming soon</PendingButton>
        ))}
      {exp.website && (
        <LinkButton href={exp.website} iconRight={<ArrowUpRight aria-hidden="true" className="size-4" />}>
          {exp.company} website
        </LinkButton>
      )}
    </div>
  );
}

/** Browser-framed product cover. Shows a placeholder until a real screenshot is added. */
function ProductCover({ exp }: { exp: Experience }) {
  const cover = exp.cover && assetExists(exp.cover.src) ? exp.cover : null;
  return (
    <div className="rounded-[18px] border border-line-strong bg-surface p-2 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.8)]">
      <div className="flex items-center gap-2 px-2.5 pt-1 pb-2.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-2.5 rounded-full bg-line-strong" />
        ))}
        <span className="ml-3 h-5 flex-1 rounded-md bg-canvas/70" />
      </div>
      {cover ? (
        <Image
          src={cover.src}
          alt={cover.alt}
          width={cover.width}
          height={cover.height}
          priority
          sizes="(min-width: 1024px) 600px, 100vw"
          className="h-auto w-full rounded-xl border border-line"
        />
      ) : (
        <MediaPlaceholder
          label="Application screenshot coming soon"
          hint="Real screenshots only"
          icon={<MonitorSmartphone aria-hidden="true" className="size-4" strokeWidth={1.6} />}
          className="rounded-xl border-solid"
        />
      )}
    </div>
  );
}

/** Compact pipeline strip derived from the case study's agents block. */
function AgentPipeline({ exp }: { exp: Experience }) {
  const agents = exp.sections.find((s) => s.type === "agents");
  if (!agents || agents.type !== "agents") return null;
  const [first, ...branches] = agents.items;
  const rgb = accentRgb[exp.accent];

  return (
    <div aria-hidden="true" className="mt-12 overflow-x-auto pb-2">
      <div className="flex min-w-max items-center gap-0 font-mono text-xs">
        <Node label="Lead data" muted />
        <Wire rgb={rgb} />
        <Node label={first.name} rgb={rgb} />
        <Wire rgb={rgb} label="route" />
        <div className="flex flex-col gap-3">
          {branches.map((b) => (
            <div key={b.name} className="flex items-center">
              {b.route && <span className="mr-3 w-10 text-right text-[0.65rem] text-faint uppercase">{b.route}</span>}
              <Node label={b.name} rgb={rgb} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Node({ label, rgb, muted }: { label: string; rgb?: string; muted?: boolean }) {
  return (
    <span
      className={cn("rounded-lg border px-3.5 py-2.5 uppercase tracking-[0.08em]", muted ? "border-line text-faint" : "text-fg")}
      style={rgb ? { borderColor: `rgb(${rgb} / 0.4)`, background: `rgb(${rgb} / 0.06)` } : undefined}
    >
      {label}
    </span>
  );
}

function Wire({ rgb, label }: { rgb: string; label?: string }) {
  return (
    <span className="relative flex w-16 items-center">
      <svg viewBox="0 0 64 8" className="h-2 w-16" fill="none">
        <line x1="0" y1="4" x2="58" y2="4" stroke={`rgb(${rgb} / 0.55)`} strokeWidth="1.25" className="flow-line animate-dash" />
        <path d="M56 1l4 3-4 3" stroke={`rgb(${rgb} / 0.8)`} strokeWidth="1.25" />
      </svg>
      {label && <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[0.6rem] text-faint uppercase">{label}</span>}
    </span>
  );
}
