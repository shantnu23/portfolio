import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { CaseStudyLayout } from "@/components/case-study/CaseStudyLayout";
import { NextNavigation } from "@/components/case-study/PageNav";
import { ProjectHero } from "@/components/projects/ProjectHero";
import { canonical } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.seoDescription,
    alternates: canonical(`/projects/${project.slug}`),
    openGraph: { title: project.name, description: project.seoDescription, type: "article" },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const i = projects.findIndex((p) => p.slug === project.slug);
  const toItem = (p: (typeof projects)[number]) => ({ href: `/projects/${p.slug}`, title: p.name, subtitle: p.category });
  const prev = projects[i - 1];
  const next = projects[i + 1];

  return (
    <article>
      <ProjectHero project={project} />
      <CaseStudyLayout
        blocks={project.sections}
        accent={project.accent}
        footer={<NextNavigation label="More projects" prev={prev && toItem(prev)} next={next && toItem(next)} />}
      />
    </article>
  );
}
