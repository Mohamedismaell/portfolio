import { notFound } from "next/navigation";
import CaseStudy from "@/components/case-study/CaseStudy";
import { projectsMap } from "@/data/projects-map";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectsMap[slug];

  if (!project) return notFound();

  return <CaseStudy project={project} />;
}
