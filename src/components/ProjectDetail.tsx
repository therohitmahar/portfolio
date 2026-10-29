import { notFound } from "next/navigation";
import { work, projectHref } from "@/data/work";
import { stories } from "@/data/stories";
import { ProjectVisual } from "@/components/ProjectDemo";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  PageIntro,
  ProjectMeta,
  ProjectMedia,
  TextLink,
} from "@/components/UI";

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = work.find((p) => p.slug === slug);
  if (!project) notFound();
  const story = stories[slug];
  const professional = slug === "lineupx-settings";
  const related = professional
    ? work.filter((p) => p.kind === "Product")
    : work.filter((p) => p.slug !== "lineupx-settings" && p.slug !== slug);
  const next = related.find((p) => p.kind === project.kind) ?? related[0];
  return (
    <article className="page-content case-study">
      <Breadcrumbs
        parent={
          professional
            ? { label: "work", href: "/work" }
            : { label: "projects", href: "/projects" }
        }
        current={project.name.toLowerCase()}
      />
      <PageIntro
        label={`${professional ? "LineupX / Professional work" : project.kind + " / Personal project"}`}
        title={project.name}
      >
        <p>{project.description}</p>
      </PageIntro>
      <div className="case-intro">
        <p className="case-takeaway">{story.takeaway}</p>
        <div className="project-links">
          {project.live && (
            <TextLink href={project.live} external>
              {project.kind === "Tool" ? "Open tool" : "Visit project"}
            </TextLink>
          )}
          {project.source && (
            <TextLink href={project.source} external>
              Public source
            </TextLink>
          )}
        </div>
      </div>
      {!professional && <ProjectMedia slug={slug} priority />}
      <div className="case-layout">
        <aside className="case-aside" aria-label="Project context">
          <ProjectMeta project={project} />
          <nav aria-label="On this page">
            <span className="eyebrow">In these notes</span>
            {story.sections.map((section) => (
              <a key={section.id} href={`#${section.id}`}>
                {section.title}
              </a>
            ))}
          </nav>
        </aside>
        <div className="case-prose">
          <section className="reader-context">
            <span className="eyebrow">Who it is for</span>
            <p>{story.audience}.</p>
          </section>
          {story.sections.map((section) => (
            <section id={section.id} key={section.id} className="story-section">
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
          {project.kind === "Product" && (
            <details className="engineering-demo">
              <summary>Explore a simplified interaction</summary>
              <p>
                This small model explains one part of the implementation. It
                uses sample state and resets when the page reloads.
              </p>
              <ProjectVisual slug={slug} />
            </details>
          )}
        </div>
      </div>
      <section className="case-next">
        <span className="eyebrow">
          {professional ? "Outside work" : "Keep exploring"}
        </span>
        <div>
          <h2>{next.name}</h2>
          <p>{next.description}</p>
          <TextLink href={projectHref(next)}>Read the project</TextLink>
        </div>
        <TextLink href={professional ? "/work" : "/projects"}>
          {professional ? "Back to Work" : "All projects"}
        </TextLink>
      </section>
    </article>
  );
}
