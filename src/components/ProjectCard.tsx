import Link from "next/link";
import { type Work, projectHref } from "@/data/work";
import { stories } from "@/data/stories";
import { ProjectMedia } from "./UI";
export default function ProjectCard({
  project: p,
  priority = false,
}: {
  project: Work;
  priority?: boolean;
}) {
  return (
    <article className={`project-card card-${p.slug}`}>
      <Link
        className="project-cover-link"
        href={projectHref(p)}
        aria-label={`Read ${p.name} project notes`}
      >
        <ProjectMedia slug={p.slug} priority={priority} compact />
      </Link>
      <div className="project-card-copy">
        <span className="eyebrow">
          {p.kind === "Interface" ? "UI exploration" : p.kind}
        </span>
        <h2>
          <Link href={projectHref(p)}>{p.name}</Link>
        </h2>
        <p>{p.description}</p>
        <p className="project-evidence">{stories[p.slug].takeaway}</p>
        <div className="stack">{p.stack}</div>
        <div className="project-links">
          <Link href={projectHref(p)}>
            Read project notes <span aria-hidden="true">↗</span>
          </Link>
          {p.live && (
            <a href={p.live} target="_blank" rel="noreferrer">
              {p.kind === "Tool" ? "Open tool" : "Visit project"}
            </a>
          )}
          {p.source && (
            <a href={p.source} target="_blank" rel="noreferrer">
              Source
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
