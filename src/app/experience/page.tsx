import type { Metadata } from "next";
import { experiences } from "@/content/experience";
import { ExperienceTimeline } from "@/components/experience/ExperienceTimeline";
import { PageIntro } from "@/components/shared/PageIntro";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Experience",
  description: "Internships in AI engineering, product development and robotics simulation — each with a detailed case study.",
  alternates: canonical("/experience"),
};

export default function ExperiencePage() {
  return (
    <>
      <PageIntro
        label="Experience"
        title="Internships, written up as case studies."
        lead="What each team was building, what I worked on, and what I learned. Detail varies by what can be shared publicly."
      />
      <div className="container-page pt-14">
        <ExperienceTimeline items={experiences} detailed />
      </div>
    </>
  );
}
