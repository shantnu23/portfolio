import { ArrowUpRight, Check, CircleDashed, Eye, Info, Lock, Sparkles } from "lucide-react";
import type {
  Accent,
  AgentsBlock,
  CalloutBlock,
  LinksBlock,
  NotesBlock,
  ProseBlock,
  RoadmapBlock,
  RolesBlock,
  StackBlock,
  StepsBlock,
} from "@/content/types";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { LinkButton, PendingButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { TechBadge } from "@/components/ui/TechBadge";
import { RichText } from "@/components/shared/RichText";
import { accentRgb, accentText, cn, pad } from "@/lib/utils";

/* ---------------------------------------------------------------- */
/*  Prose                                                            */
/* ---------------------------------------------------------------- */
export function Prose({ block }: { block: ProseBlock }) {
  return (
    <div className={cn("grid gap-10", block.aside && "lg:grid-cols-[1fr_17rem] lg:gap-14")}>
      <Reveal className="space-y-5">
        {block.body.map((p) => (
          <p key={p.slice(0, 32)} className="prose-copy">
            <RichText text={p} />
          </p>
        ))}
      </Reveal>
      {block.aside && (
        <Reveal delay={0.08}>
          <aside className="rounded-xl border border-line bg-surface/70 p-5">
            <p className="label-mono text-faint">{block.aside.title}</p>
            <ol className="mt-4 space-y-3">
              {block.aside.items.map((item, i) => (
                <li key={item} className="flex gap-3 text-sm text-muted">
                  <span className="font-mono text-xs text-signal">{pad(i + 1)}</span>
                  {item}
                </li>
              ))}
            </ol>
          </aside>
        </Reveal>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  Agents                                                           */
/* ---------------------------------------------------------------- */
export function AgentCards({ block, accent }: { block: AgentsBlock; accent: Accent }) {
  return (
    <ol className="grid gap-5 lg:grid-cols-3">
      {block.items.map((agent, i) => (
        <li key={agent.name}>
          <Reveal delay={i * 0.07} className="h-full">
            <article className="card flex h-full flex-col overflow-hidden">
              <header className="flex items-center justify-between border-b border-line px-5 py-3.5">
                <span className="label-mono text-faint">
                  <span className={accentText[accent]}>agent.{pad(i + 1)}</span>
                </span>
                <span className="label-mono rounded-full border border-line px-2 py-1 !text-[0.6rem] text-muted">{agent.role}</span>
              </header>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-semibold tracking-tight text-fg">{agent.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{agent.description}</p>
                <ul className="mt-5 space-y-2">
                  {agent.responsibilities.map((r) => (
                    <li key={r} className="flex gap-2.5 text-sm text-fg/85">
                      <Check aria-hidden="true" className={cn("mt-0.5 size-4 shrink-0", accentText[accent])} strokeWidth={1.8} />
                      {r}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <p className="label-mono mb-2 !text-[0.6rem] text-faint">Uses</p>
                  <ul className="flex flex-wrap gap-1.5">
                    {agent.tools.map((t) => (
                      <li key={t}>
                        <TechBadge>{t}</TechBadge>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

/* ---------------------------------------------------------------- */
/*  Steps                                                            */
/* ---------------------------------------------------------------- */
export function Steps({ block, accent }: { block: StepsBlock; accent: Accent }) {
  const rgb = accentRgb[accent];
  return (
    <ol className="relative grid gap-4 md:grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]">
      {block.items.map((step, i) => (
        <li key={step.title}>
          <Reveal delay={i * 0.06} className="relative h-full">
            <div className="flex h-full flex-col rounded-xl border border-line bg-surface p-5">
              <div className="flex items-center gap-3">
                <span
                  className="flex size-8 items-center justify-center rounded-full border font-mono text-xs"
                  style={{ borderColor: `rgb(${rgb} / 0.45)`, color: `rgb(${rgb})`, background: `rgb(${rgb} / 0.08)` }}
                >
                  {i + 1}
                </span>
                {i < block.items.length - 1 && (
                  <span aria-hidden="true" className="h-px flex-1" style={{ background: `linear-gradient(to right, rgb(${rgb} / 0.4), transparent)` }} />
                )}
              </div>
              <h3 className="mt-4 font-medium text-fg">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

/* ---------------------------------------------------------------- */
/*  Stack                                                            */
/* ---------------------------------------------------------------- */
export function Stack({ block }: { block: StackBlock }) {
  return (
    <Reveal>
      <dl className="divide-y divide-line rounded-xl border border-line bg-surface">
        {block.groups.map((g) => (
          <div key={g.label} className="grid gap-3 px-5 py-4 sm:grid-cols-[11rem_1fr] sm:items-center">
            <dt className="label-mono text-faint">{g.label}</dt>
            <dd>
              <ul className="flex flex-wrap gap-1.5">
                {g.items.map((t) => (
                  <li key={t}>
                    <TechBadge className="text-fg/85">{t}</TechBadge>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}

/* ---------------------------------------------------------------- */
/*  Notes (decisions, learnings, challenges, extensions)            */
/* ---------------------------------------------------------------- */
export function Notes({ block, accent }: { block: NotesBlock; accent: Accent }) {
  const proposed = block.tone === "proposed";
  if (block.items.length === 0) return null;
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {block.items.map((n, i) => (
        <li key={n.title}>
          <Reveal delay={(i % 2) * 0.06} className="h-full">
            <div
              className={cn(
                "flex h-full gap-4 rounded-xl border p-5",
                proposed ? "border-dashed border-pulse/30 bg-pulse/[0.03]" : "border-line bg-surface",
              )}
            >
              <span className={cn("font-mono text-xs", proposed ? "text-pulse" : accentText[accent])}>
                {proposed ? <CircleDashed aria-hidden="true" className="size-4" strokeWidth={1.6} /> : pad(i + 1)}
              </span>
              <div>
                <h3 className="font-medium text-fg">
                  {n.title}
                  {proposed && <span className="sr-only"> (proposed, not implemented)</span>}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{n.description}</p>
              </div>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

/* ---------------------------------------------------------------- */
/*  List (contributions)                                             */
/* ---------------------------------------------------------------- */
export function BulletList({ items, accent }: { items: string[]; accent: Accent }) {
  return (
    <Reveal>
      <ul className="divide-y divide-line border-y border-line">
        {items.map((item, i) => (
          <li key={item} className="flex gap-5 py-4">
            <span className={cn("pt-0.5 font-mono text-xs", accentText[accent])}>{pad(i + 1)}</span>
            <span className="leading-relaxed text-fg/90">
              <RichText text={item} />
            </span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

/* ---------------------------------------------------------------- */
/*  Roles                                                            */
/* ---------------------------------------------------------------- */
export function Roles({ block, accent }: { block: RolesBlock; accent: Accent }) {
  if (block.items.length === 0) return null;
  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {block.items.map((role, i) => (
        <li key={role.name}>
          <Reveal delay={i * 0.06} className="h-full">
            <div className="card h-full p-5">
              <p className={cn("label-mono", accentText[accent])}>role.{pad(i + 1)}</p>
              <h3 className="mt-3 text-lg font-semibold text-fg">{role.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{role.description}</p>
              <ul className="mt-4 space-y-1.5">
                {role.capabilities.map((c) => (
                  <li key={c} className="flex gap-2 text-sm text-fg/85">
                    <Check aria-hidden="true" className={cn("mt-0.5 size-4 shrink-0", accentText[accent])} strokeWidth={1.8} />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

/* ---------------------------------------------------------------- */
/*  Roadmap                                                          */
/* ---------------------------------------------------------------- */
const phaseLabel = { done: "Done", current: "Current", planned: "Planned" } as const;

export function Roadmap({ block }: { block: RoadmapBlock }) {
  return (
    <ol className="relative grid gap-4 md:grid-cols-4">
      <span aria-hidden="true" className="absolute top-[19px] right-0 left-0 hidden h-px bg-gradient-to-r from-pulse/50 via-line-strong to-transparent md:block" />
      {block.phases.map((p, i) => (
        <li key={p.title} className="relative">
          <Reveal delay={i * 0.06}>
            <span
              className={cn(
                "relative flex size-10 items-center justify-center rounded-full border bg-canvas font-mono text-xs",
                p.status === "current" && "border-pulse text-pulse shadow-[0_0_0_6px_rgb(168_154_247/0.1)]",
                p.status === "done" && "border-signal/60 text-signal",
                p.status === "planned" && "border-dashed border-line-strong text-faint",
              )}
            >
              {p.status === "done" ? <Check aria-hidden="true" className="size-4" /> : pad(i + 1)}
            </span>
            <p
              className={cn(
                "label-mono mt-5 !text-[0.62rem]",
                p.status === "current" ? "text-pulse" : p.status === "done" ? "text-signal" : "text-faint",
              )}
            >
              {phaseLabel[p.status]}
            </p>
            <h3 className="mt-2 font-medium text-fg">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{p.description}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

/* ---------------------------------------------------------------- */
/*  Links                                                            */
/* ---------------------------------------------------------------- */
export function LinksRow({ block }: { block: LinksBlock }) {
  return (
    <Reveal>
      <div className="flex flex-wrap gap-3">
        {block.links.map((l) => {
          const icon =
            l.kind === "github" ? (
              <GitHubIcon className="size-4" />
            ) : (
              <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            );
          return l.href ? (
            <LinkButton
              key={l.label}
              href={l.href}
              variant={l.kind === "live" || l.kind === "demo" ? "primary" : "secondary"}
              {...(l.kind === "github" ? { icon } : { iconRight: icon })}
            >
              {l.label}
            </LinkButton>
          ) : (
            <PendingButton key={l.label} icon={l.kind === "github" ? <GitHubIcon className="size-4" /> : undefined}>
              {l.pendingLabel ?? `${l.label} · coming soon`}
            </PendingButton>
          );
        })}
      </div>
    </Reveal>
  );
}

/* ---------------------------------------------------------------- */
/*  Callout                                                          */
/* ---------------------------------------------------------------- */
const calloutTone = {
  info: { icon: Info, ring: "border-solar/25 bg-solar/[0.04]", text: "text-solar" },
  confidential: { icon: Lock, ring: "border-line-strong bg-surface", text: "text-muted" },
  concept: { icon: Eye, ring: "border-pulse/30 bg-pulse/[0.05]", text: "text-pulse" },
  proposed: { icon: Sparkles, ring: "border-pulse/30 bg-pulse/[0.04]", text: "text-pulse" },
} as const;

export function Callout({ block }: { block: CalloutBlock }) {
  const t = calloutTone[block.tone];
  const IconC = t.icon;
  return (
    <aside role="note" className={cn("flex gap-4 rounded-xl border p-5 sm:p-6", t.ring)}>
      <IconC aria-hidden="true" className={cn("mt-0.5 size-5 shrink-0", t.text)} strokeWidth={1.6} />
      <div>
        <p className={cn("label-mono", t.text)}>{block.title}</p>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">{block.body}</p>
      </div>
    </aside>
  );
}
