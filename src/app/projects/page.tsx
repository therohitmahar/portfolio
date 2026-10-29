import type { Metadata } from "next";
import ProjectArchive from "@/components/ProjectArchive";
import ProjectCard from "@/components/ProjectCard";
import { PageIntro } from "@/components/UI";
import { work, moreProjects } from "@/data/work";
export const metadata: Metadata = {
  title: "Personal projects",
  description:
    "React and Next.js apps, developer tools, and interface explorations by Rohit Mahar.",
};
export default function ProjectsPage() {
  const projects = work.filter((p) => p.slug !== "lineupx-settings");
  return (
    <div className="page-content">
      <PageIntro label="Apps, tools & explorations" title="projects" slash>
        <p>
          Products I wanted to use, tools for repeated tasks, and a few
          interface ideas. Each project includes the problem, implementation
          decisions, and what I learned from building it.
        </p>
      </PageIntro>
      <ProjectArchive
        items={projects.map((p, i) => ({
          slug: p.slug,
          kind: p.kind,
          node: <ProjectCard project={p} priority={i < 2} />,
        }))}
      />
      <section className="more-projects">
        <div className="section-heading">
          <h2>Other builds</h2>
          <span>Smaller projects and earlier explorations</span>
        </div>
        {moreProjects.map((p) => (
          <div key={p.name}>
            <span>{p.name}</span>
            <span>{p.description}</span>
            {p.source && (
              <a
                href={p.source}
                target="_blank"
                rel="noreferrer"
                aria-label={`${p.name} public source`}
              >
                Source ↗
              </a>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
