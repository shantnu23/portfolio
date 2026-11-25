import type { Metadata } from "next";
import Image from "next/image";
import { assetExists } from "@/lib/assets";
import { about } from "@/content/about";
import { profile } from "@/content/profile";
import { AchievementsSection } from "@/components/home/AchievementsSection";
import { ContactSection } from "@/components/home/ContactSection";
import { CurrentFocus } from "@/components/home/AboutSection";
import { EducationSection } from "@/components/home/EducationSection";
import { SkillsSection } from "@/components/home/SkillsSection";
import { PageIntro } from "@/components/shared/PageIntro";
import { RichText } from "@/components/shared/RichText";
import { Monogram } from "@/components/ui/Monogram";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { canonical } from "@/lib/site";
import { pad } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description: `About ${profile.name} — background, education, how I approach engineering, and the tools I use.`,
  alternates: canonical("/about"),
};

export default function AboutPage() {
  const photo = about.photo && assetExists(about.photo.src) ? about.photo : null;
  return (
    <>
      <PageIntro label="About" title={about.heading} />

      <section aria-label="Introduction" className="container-page py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <Reveal className="space-y-6">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="prose-copy text-lg">
                <RichText text={p} />
              </p>
            ))}
          </Reveal>
          <Reveal delay={0.08} className="space-y-5">
            {photo ? (
              <figure className="card overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  priority
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="aspect-[4/3] w-full object-cover object-[40%_50%]"
                />
                <figcaption className="flex items-center gap-4 border-t border-line p-4">
                  <Monogram className="size-9 text-fg" />
                  <span>
                    <span className="block text-sm font-medium text-fg">{profile.name}</span>
                    {photo.caption && <span className="mt-0.5 block text-xs text-muted">{photo.caption}</span>}
                  </span>
                </figcaption>
              </figure>
            ) : (
              <div className="card bg-dots flex items-center gap-5 p-6">
                <Monogram className="size-16 text-fg" />
                <div>
                  <p className="font-medium text-fg">{profile.name}</p>
                  <p className="mt-1 text-sm text-muted">{profile.shortRole}</p>
                </div>
              </div>
            )}
            <CurrentFocus />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="principles-title" className="container-page py-16 sm:py-24">
        <SectionHeading id="principles-title" index="01" label="Approach" title="How I like to work." />
        <ol className="grid gap-5 md:grid-cols-3">
          {about.principles.map((p, i) => (
            <li key={p.title}>
              <Reveal delay={i * 0.07} className="h-full">
                <div className="card h-full p-6 sm:p-7">
                  <p className="font-mono text-sm text-signal">{pad(i + 1)}</p>
                  <h3 className="mt-6 text-lg font-semibold tracking-tight text-fg">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{p.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <div className="container-page space-y-28 py-16 sm:py-24">
        <EducationSection index="02" compact />
        <SkillsSection index="03" bare />

        <section aria-labelledby="leadership-title">
          <SectionHeading id="leadership-title" index="04" label="Leadership" title="Positions of responsibility." />
          <ul className="grid gap-5 md:grid-cols-2">
            {about.leadership.map((l, i) => (
              <li key={l.role}>
                <Reveal delay={i * 0.07} className="h-full">
                  <div className="card h-full p-6 sm:p-7">
                    <p className="font-mono text-xs text-faint">{l.period}</p>
                    <h3 className="mt-4 text-lg font-semibold tracking-tight text-fg">{l.role}</h3>
                    <p className="mt-1 text-sm text-signal">{l.org}</p>
                    {l.detail && <p className="mt-4 text-sm leading-relaxed text-muted">{l.detail}</p>}
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        <AchievementsSection index="05" bare />
      </div>

      <ContactSection index="06" />
    </>
  );
}
