import { ProjectLink } from "./ProjectMotion";
import { type Work, projectHref } from "@/data/work";
import { stories } from "@/data/stories";
import { ProjectMedia } from "./UI";
import ArrowIcon from "./ArrowIcon";
export default function ProjectCard({
  project: p,
  priority = false,
}: {
  project: Work;
  priority?: boolean;
}) {
  return (
    <article className={`project-card card-${p.slug}`}>
      <ProjectLink
        slug={p.slug}
        className="project-cover-link"
        href={projectHref(p)}
        aria-label={`Read ${p.name} project notes`}
      >
        <ProjectMedia slug={p.slug} priority={priority} compact />
      </ProjectLink>
      <div className="project-card-copy">
        <h2>
          <ProjectLink slug={p.slug} href={projectHref(p)}>
            {p.name}
          </ProjectLink>
        </h2>
        <p>{p.description}</p>
        <p className="project-evidence">{stories[p.slug].takeaway}</p>
        <div className="stack">
          <span>{p.kind === "Interface" ? "UI exploration" : p.kind}</span>
          <span>{p.stack}</span>
        </div>
        <div className="project-links">
          <ProjectLink slug={p.slug} href={projectHref(p)}>
            Read project notes <ArrowIcon direction="right" />
          </ProjectLink>
          {p.live && (
            <a href={p.live} target="_blank" rel="noreferrer">
              {p.kind === "Tool" ? "Open tool" : "Visit project"}
              <ArrowIcon />
            </a>
          )}
          {p.source && (
            <a href={p.source} target="_blank" rel="noreferrer">
              Source <ArrowIcon />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
