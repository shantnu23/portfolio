import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { experiences, getExperience } from "@/content/experience";
import { CaseStudyLayout } from "@/components/case-study/CaseStudyLayout";
import { NextNavigation } from "@/components/case-study/PageNav";
import { ExperienceHero } from "@/components/experience/ExperienceHero";
import { canonical } from "@/lib/site";
import { experienceRange } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return experiences.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const exp = getExperience(slug);
  if (!exp) return {};
  const title = `${exp.company} — ${exp.role}`;
  return {
    title,
    description: exp.seoDescription,
    alternates: canonical(`/experience/${exp.slug}`),
    openGraph: { title, description: exp.seoDescription, type: "article" },
  };
}

export default async function ExperienceDetailPage({ params }: Props) {
  const { slug } = await params;
  const exp = getExperience(slug);
  if (!exp) notFound();

  const i = experiences.findIndex((e) => e.slug === exp.slug);
  const toItem = (e: (typeof experiences)[number]) => ({
    href: `/experience/${e.slug}`,
    title: e.company,
    subtitle: `${e.role} · ${experienceRange(e)}`,
  });
  const prev = experiences[i - 1];
  const next = experiences[i + 1];

  return (
    <article>
      <ExperienceHero exp={exp} />
      <CaseStudyLayout
        blocks={exp.sections}
        accent={exp.accent}
        showNav={exp.layout !== "minimal"}
        footer={<NextNavigation label="More experience" prev={prev && toItem(prev)} next={next && toItem(next)} />}
      />
    </article>
  );
}
