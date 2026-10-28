import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { work, projectHref } from "@/data/work";
import ProjectDetail from "@/components/ProjectDetail";
export function generateStaticParams() {
  return work
    .filter((p) => p.slug === "lineupx-settings")
    .map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = work.find((p) => p.slug === slug);
  return {
    title: project?.name ?? "Project",
    description: project?.description,
  };
}
export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = work.find((p) => p.slug === slug);
  if (!project) notFound();
  if (project.slug !== "lineupx-settings") redirect(projectHref(project));
  return <ProjectDetail params={params} />;
}
