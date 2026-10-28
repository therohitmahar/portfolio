import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { work } from "@/data/work";
import ProjectDetail from "@/components/ProjectDetail";
export function generateStaticParams() {
  return work
    .filter((p) => p.slug !== "lineupx-settings")
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
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!work.some((p) => p.slug === slug && p.slug !== "lineupx-settings"))
    notFound();
  return <ProjectDetail params={params} />;
}
