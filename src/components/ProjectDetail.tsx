import Link from "next/link";
import { notFound } from "next/navigation";
import { work, projectHref } from "@/data/work";
import { ProjectVisual } from "@/components/Portfolio";
export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = work.find((p) => p.slug === slug);
  if (!project) notFound();
  const index = work.indexOf(project);
  const next = work[(index + 1) % work.length];
  return (
    <article className="page-content project-detail">
      <Link
        href={project.slug === "lineupx-settings" ? "/work" : "/projects"}
        className="back-link"
      >
        ←{" "}
        {project.slug === "lineupx-settings"
          ? "Professional work"
          : "All projects"}
      </Link>
      <div className="page-intro">
        <span className="project-type">{project.kind} / Project notes</span>
        <h1>{project.name}</h1>
        <p>{project.description}</p>
        <div className="stack">{project.stack}</div>
        <div className="project-links">
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer">
              {project.kind === "Tool" ? "Open tool ↗" : "Visit project ↗"}
            </a>
          )}
          {project.source && (
            <a href={project.source} target="_blank" rel="noreferrer">
              Public source ↗
            </a>
          )}
        </div>
      </div>
      {project.kind === "Product" && <ProjectVisual slug={slug} />}
      <div className="detail-section">
        <h2>The problem</h2>
        <p>{project.problem}</p>
      </div>
      <div className="detail-section">
        <h2>Implementation</h2>
        <ul className="decision-list">
          {project.decisions.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>
      <div className="detail-section">
        <h2>Evidence & scope</h2>
        <p>{project.evidence}</p>
      </div>
      <div className="next-project">
        <span>Next project</span>
        <Link href={projectHref(next)}>{next.name} ↗</Link>
      </div>
    </article>
  );
}
