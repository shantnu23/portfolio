import { ArrowRight, FileDown } from "lucide-react";
import { profile, resume } from "@/content/profile";
import { LinkButton, PendingButton } from "@/components/ui/Button";
import { SocialIconRow } from "@/components/shared/socials";
import { assetExists } from "@/lib/assets";
import { cn } from "@/lib/utils";
import { HeroSystem } from "./HeroSystem";

export function Hero() {
  const hasResume = assetExists(resume.href);
  const { status } = profile;

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-36 lg:pb-24">
      {/* Background motif */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="bg-grid mask-radial absolute inset-0" />
        <div className="absolute -top-40 left-[8%] h-[480px] w-[560px] rounded-full bg-signal/[0.07] blur-[120px]" />
        <div className="absolute top-40 right-[-10%] h-[420px] w-[520px] rounded-full bg-pulse/[0.06] blur-[120px]" />
      </div>

      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.35fr_0.85fr] lg:gap-12">
        <div>
          {status.enabled && (
            <p className="motion-safe:animate-rise inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 py-1.5 pr-4 pl-3 text-xs text-muted backdrop-blur">
              <span className="relative flex size-2" aria-hidden="true">
                {status.tone === "active" && (
                  <span className="absolute inset-0 rounded-full bg-signal/60 motion-safe:animate-ping" />
                )}
                <span className="relative size-2 rounded-full bg-signal" />
              </span>
              {status.label}
            </p>
          )}

          <p className="motion-safe:animate-rise label-mono mt-8 flex items-center gap-3 text-signal [animation-delay:60ms]">
            {profile.name}
            <span aria-hidden="true" className="h-px w-12 bg-signal/40" />
          </p>

          <h1
            id="hero-title"
            className="motion-safe:animate-rise mt-5 text-display font-semibold text-balance [animation-delay:120ms]"
          >
            <span className="text-fg">{profile.headlineParts.lead} </span>
            <span className="bg-gradient-to-r from-fg/90 via-muted to-muted/70 bg-clip-text text-transparent">
              {profile.headlineParts.tail}
            </span>
          </h1>

          <p className="motion-safe:animate-rise mt-7 max-w-xl text-lg leading-relaxed text-pretty text-muted [animation-delay:180ms]">
            {profile.intro}
          </p>

          <div className="motion-safe:animate-rise mt-9 flex flex-wrap items-center gap-3 [animation-delay:240ms]">
            <LinkButton
              href="/projects"
              variant="primary"
              iconRight={<ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover/btn:translate-x-0.5" />}
            >
              View my work
            </LinkButton>
            <LinkButton href="/experience">Explore experience</LinkButton>
            {hasResume ? (
              <LinkButton
                href={resume.href}
                download={resume.downloadName}
                variant="ghost"
                className="h-11"
                icon={<FileDown aria-hidden="true" className="size-4 text-signal" strokeWidth={1.6} />}
              >
                Download resume
              </LinkButton>
            ) : (
              <PendingButton icon={<FileDown aria-hidden="true" className="size-4" strokeWidth={1.6} />}>
                Resume · coming soon
              </PendingButton>
            )}
          </div>

          <div className="motion-safe:animate-rise mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 [animation-delay:300ms]">
            <SocialIconRow className="-ml-2.5" />
            <span aria-hidden="true" className="hidden h-5 w-px bg-line-strong sm:block" />
            <ul className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-faint">
              {profile.education.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={cn("motion-safe:animate-rise relative mx-auto hidden w-full max-w-[460px] [animation-delay:200ms] lg:block")}>
          <HeroSystem interests={profile.interests} />
        </div>
      </div>
    </section>
  );
}
