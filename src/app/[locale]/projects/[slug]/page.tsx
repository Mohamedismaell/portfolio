import { notFound } from "next/navigation";
import { projectsMap } from "@/data/projects-map";
import ProjectDetailsPage from "@/components/case-study/ProjectDetailsPage";

type PageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const project = Object.values(projectsMap).find(
    (item: any) => item.slug === slug
  );

  if (!project) {
    notFound();
  }

  return <ProjectDetailsPage project={project} />;
}