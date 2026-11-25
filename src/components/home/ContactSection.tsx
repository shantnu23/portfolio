import { ArrowUpRight, Mail } from "lucide-react";
import { links } from "@/content/profile";
import { LinkButton } from "@/components/ui/Button";
import { CopyButton } from "@/components/shared/CopyButton";
import { getSocials } from "@/components/shared/socials";
import { cn } from "@/lib/utils";

export function ContactSection({ index = "07" }: { index?: string }) {
  const socials = getSocials();

  return (
    <section id="contact" aria-labelledby="contact-title" className="container-page py-20 sm:py-28">
      <div className="card relative isolate overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,#000,transparent_70%)]" />
          <div className="absolute -top-32 -left-20 h-80 w-96 rounded-full bg-signal/[0.08] blur-[100px]" />
          <div className="absolute -right-20 -bottom-40 h-80 w-96 rounded-full bg-pulse/[0.07] blur-[100px]" />
        </div>

        <div className="grid gap-12 p-7 sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:p-16">
          <div>
            <p className="label-mono flex items-center gap-3 text-faint">
              <span className="text-signal">{index}</span> / Contact
              <span aria-hidden="true" className="h-px w-10 bg-gradient-to-r from-line-strong to-transparent" />
            </p>
            <h2 id="contact-title" className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-balance text-fg sm:text-5xl">
              Have an idea worth building? <span className="text-signal">Let&apos;s talk.</span>
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-muted">
              Whether it&apos;s a role, a project or a half-formed idea, email is the fastest way to reach me.
            </p>

            <p className="mt-9 font-mono text-base break-all text-fg sm:text-lg">{links.email}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <CopyButton value={links.email} variant="primary" label="Copy email" />
              <LinkButton href={`mailto:${links.email}`} icon={<Mail aria-hidden="true" className="size-4" strokeWidth={1.6} />}>
                Send an email
              </LinkButton>
            </div>
          </div>

          <ul className="grid content-start gap-3">
            {socials.map(({ key, label, display, href, Icon }) => {
              const inner = (
                <>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-line bg-canvas/60 text-fg">
                    <Icon className="size-[18px]" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-fg">{label}</span>
                    <span className="block truncate font-mono text-xs text-muted">{href || display ? display : "Link coming soon"}</span>
                  </span>
                  {href && (
                    <ArrowUpRight aria-hidden="true" className="size-4 text-faint transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal" />
                  )}
                </>
              );
              const base = "group flex items-center gap-4 rounded-xl border px-4 py-3.5 transition-colors";
              return (
                <li key={key}>
                  {href ? (
                    <a
                      href={href}
                      className={cn(base, "border-line bg-canvas/40 hover:border-signal/40 hover:bg-canvas/70")}
                      {...(href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                    >
                      {inner}
                    </a>
                  ) : key === "discord" && display ? (
                    <div className={cn(base, "border-line bg-canvas/40")}>
                      {inner}
                      <CopyButton value={display} label="Copy" variant="compact" />
                    </div>
                  ) : (
                    <div className={cn(base, "border-dashed border-line text-faint")}>
                      {inner}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
