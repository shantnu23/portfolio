import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { experiences } from "@/content/experience";
import { LinkButton } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExperienceTimeline } from "@/components/experience/ExperienceTimeline";
import { AboutSection } from "@/components/home/AboutSection";
import { AchievementsSection } from "@/components/home/AchievementsSection";
import { ContactSection } from "@/components/home/ContactSection";
import { EducationSection } from "@/components/home/EducationSection";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Hero } from "@/components/home/Hero";
import { SkillsSection } from "@/components/home/SkillsSection";
import { canonical } from "@/lib/site";

export const metadata: Metadata = { alternates: canonical("/") };

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <EducationSection />

      <section aria-labelledby="experience-title" className="container-page py-20 sm:py-28">
        <SectionHeading
          id="experience-title"
          index="03"
          label="Experience"
          title="Where I've worked."
          lead="Three internships across AI engineering, product development and robotics simulation. Each has its own case study."
          action={
            <LinkButton href="/experience" iconRight={<ArrowRight aria-hidden="true" className="size-4" />}>
              All experience
            </LinkButton>
          }
        />
        <ExperienceTimeline items={experiences} />
      </section>

      <FeaturedProjects />
      <SkillsSection />
      <AchievementsSection />
      <ContactSection />
    </>
  );
}
