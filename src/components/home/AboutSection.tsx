import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { about } from "@/content/about";
import { profile } from "@/content/profile";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RichText } from "@/components/shared/RichText";

export function AboutSection() {
  return (
    <section aria-labelledby="about-title" className="container-page py-20 sm:py-28">
      <SectionHeading id="about-title" index="01" label="About" title={about.heading} />
      <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <Reveal className="space-y-5">
          {about.paragraphs.slice(0, 2).map((p) => (
            <p key={p.slice(0, 24)} className="prose-copy">
              <RichText text={p} />
            </p>
          ))}
          <Link href="/about" className="group mt-2 inline-flex items-center gap-2 text-sm font-medium text-signal">
            More about me
            <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <Reveal delay={0.08}>
          <CurrentFocus />
        </Reveal>
      </div>
    </section>
  );
}

/** Terminal-flavoured "currently" panel driven by profile.currentFocus. */
export function CurrentFocus() {
  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <p className="label-mono text-faint">
          <span className="text-signal">~/</span>currently
        </p>
        <span className="label-mono flex items-center gap-2 !text-[0.62rem] text-faint">
          <span className="size-1.5 rounded-full bg-signal motion-safe:animate-blink" aria-hidden="true" />
          Now
        </span>
      </div>
      <ul className="divide-y divide-line">
        {profile.currentFocus.map((item) => {
          const content = (
            <>
              <span aria-hidden="true" className="mt-[3px] font-mono text-xs text-signal">
                &gt;
              </span>
              <span className="flex-1">
                <span className="block font-medium text-fg">{item.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-muted">{item.detail}</span>
              </span>
              {item.href && (
                <ArrowUpRight aria-hidden="true" className="mt-1 size-4 text-faint transition-colors group-hover:text-signal" />
              )}
            </>
          );
          return (
            <li key={item.title}>
              {item.href ? (
                <Link href={item.href} className="group flex gap-3 px-5 py-4 transition-colors hover:bg-white/[0.02]">
                  {content}
                </Link>
              ) : (
                <div className="flex gap-3 px-5 py-4">{content}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
