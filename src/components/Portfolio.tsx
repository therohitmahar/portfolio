"use client";

import { useState } from "react";
import Link from "next/link";
import { work, moreProjects, projectHref, type Work } from "@/data/work";

export function ProjectLinks({ project }: { project: Work }) {
  return (
    <div className="project-links">
      <Link href={projectHref(project)}>
        Read project notes <span aria-hidden="true">↗</span>
      </Link>
      {project.live && (
        <a href={project.live} target="_blank" rel="noreferrer">
          {project.kind === "Tool" ? "Open tool" : "Visit project"}
        </a>
      )}
      {project.source && (
        <a href={project.source} target="_blank" rel="noreferrer">
          Source
        </a>
      )}
    </div>
  );
}

export function ProjectVisual({ slug }: { slug: string }) {
  const [paused, setPaused] = useState(true);
  const [selected, setSelected] = useState("Context");
  const [reading, setReading] = useState(false);
  if (slug === "pr-tracker")
    return (
      <div className="project-visual sync-visual">
        <div className="visual-top">
          <span>PR Tracker / Sync design</span>
          <span>01</span>
        </div>
        <div className="sync-path">
          <span>GitHub</span>
          <span aria-hidden="true">→</span>
          <span>Checkpoint</span>
          <span aria-hidden="true">→</span>
          <span>IndexedDB</span>
        </div>
        <div className="sync-progress">
          <span style={{ width: paused ? "58%" : "100%" }} />
        </div>
        <div className="sync-bottom">
          <div>
            <strong>
              {paused ? "Import interrupted" : "Resume from checkpoint"}
            </strong>
            <p>
              {paused
                ? "Keep what has already been fetched."
                : "Continue the import without repeating saved batches."}
            </p>
          </div>
          <button onClick={() => setPaused(!paused)}>
            {paused ? "Resume demo" : "Reset demo"}
          </button>
        </div>
        <small>Interactive explanation · no GitHub requests</small>
      </div>
    );
  if (slug === "context-flow-ai")
    return (
      <div className="project-visual flow-visual">
        <div className="visual-top">
          <span>Context Flow AI / Context model</span>
          <span>02</span>
        </div>
        <div className="flow-demo">
          <div className="node-list">
            {["Context", "Instructions", "Reference"].map((n) => (
              <button
                key={n}
                aria-pressed={selected === n}
                onClick={() => setSelected(n)}
              >
                {n}
                <span aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
          <div className="flow-connector" aria-hidden="true">
            →
          </div>
          <div className="composer">
            <span>Composer</span>
            <p aria-live="polite">
              {selected === "Context"
                ? "What the task is about."
                : selected === "Instructions"
                  ? "How the response should be written."
                  : "The material the response should use."}
            </p>
            <code>@{selected.toLowerCase()}</code>
          </div>
        </div>
        <small>Select a block · simplified interaction model</small>
      </div>
    );
  if (slug === "next-shelf")
    return (
      <div className="project-visual shelf-visual">
        <div className="visual-top">
          <span>Next Shelf / Reading state</span>
          <span>03</span>
        </div>
        <div className="shelf-demo">
          <div className="book-cover">
            <span>
              A book
              <br />
              to come
              <br />
              back to.
            </span>
            <small>Reading library</small>
          </div>
          <div className="reading-state">
            <span>Sample book</span>
            <h3>{reading ? "Reading" : "Want to read"}</h3>
            <p>
              {reading
                ? "Your place, saved on your device."
                : "A place for the next book on your list."}
            </p>
            <button aria-pressed={reading} onClick={() => setReading(!reading)}>
              {reading ? "Move to want to read" : "Start reading"}
            </button>
          </div>
        </div>
        <small>Interaction demo · sample data, resets on reload</small>
      </div>
    );
  return (
    <div className="settings-diagram">
      <div>
        <span>Before</span>
        <p>
          Section <strong>Candidate fields ▾</strong>
        </p>
      </div>
      <span aria-hidden="true">→</span>
      <div>
        <span>After</span>
        <p>
          <strong>Candidate fields</strong>
          <br />
          Work experience
          <br />
          Education
        </p>
      </div>
    </div>
  );
}

export function Projects({ archive = false }: { archive?: boolean }) {
  const [filter, setFilter] = useState("All");
  const items = archive
    ? work.filter(
        (p) =>
          p.slug !== "lineupx-settings" &&
          (filter === "All" || p.kind === filter),
      )
    : work.slice(0, 3);
  return (
    <>
      <div className="section-heading">
        <h2>{archive ? "Project archive" : "Selected projects"}</h2>
        {archive ? (
          <div className="filters" aria-label="Filter projects">
            {["All", "Product", "Tool", "Interface"].map((f) => (
              <button
                key={f}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {f === "All" ? "All projects" : f + "s"}
              </button>
            ))}
          </div>
        ) : (
          <Link href="/projects">
            All projects <span aria-hidden="true">↗</span>
          </Link>
        )}
      </div>
      <div aria-live="polite">
        {items.map((p, i) => (
          <article
            key={p.slug}
            className={`project-row ${archive && p.kind !== "Product" ? "compact-project" : ""}`}
          >
            <div className="project-copy">
              <span className="project-type">
                {String(i + 1).padStart(2, "0")} / {p.kind}
              </span>
              <h3>
                <Link href={projectHref(p)}>{p.name}</Link>
              </h3>
              <p>{p.description}</p>
              <p className="project-evidence">
                {p.slug === "pr-tracker"
                  ? "3,000+ PR records synced. Resumable imports, rate-limit recovery, and coordination across browser tabs."
                  : p.slug === "context-flow-ai"
                    ? "Graph state, undo/redo, and draft recovery."
                    : p.slug === "next-shelf"
                      ? "On-device persistence and versioned backups, with tests for older formats."
                      : p.decisions[0]}
              </p>
              <div className="stack">{p.stack}</div>
              <ProjectLinks project={p} />
            </div>
            {p.kind === "Product" && <ProjectVisual slug={p.slug} />}
          </article>
        ))}
      </div>
      {archive && (
        <div className="more-projects">
          <h3>Other builds</h3>
          {moreProjects.map((p) => (
            <div key={p.name}>
              <span>{p.name}</span>
              <span>{p.description}</span>
              {p.source && (
                <a href={p.source} target="_blank" rel="noreferrer">
                  Source
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export function Tools() {
  return (
    <section id="tools" className="section">
      <div className="section-heading">
        <h2>Developer tools</h2>
        <span>Packages & editor extensions</span>
      </div>
      <div className="tool-list">
        {work
          .filter((p) => p.kind === "Tool")
          .map((p) => (
            <Link href={projectHref(p)} key={p.slug}>
              <strong>{p.name}</strong>
              <span>{p.description}</span>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
      </div>
    </section>
  );
}

export function AboutContent() {
  return (
    <div className="about-grid">
      <div>
        <h2>About</h2>
        <p>
          I’m a frontend developer at LineupX in Mumbai. I work on data-heavy
          screens, assessment workflows, and reusable React components.
        </p>
        <p>
          Working directly with users helps me reproduce issues, understand
          requests, and coordinate fixes with product and backend teams.
        </p>
        <p>
          Over the past few months, I’ve been exploring UI/UX through redesigns
          of existing LineupX screens and personal interface projects.
        </p>
        <a href="/rohit-mahar-resume.pdf">View resume</a>
      </div>
      <div className="experience">
        <h3>Experience</h3>
        <strong>LineupX</strong>
        <p>
          Frontend Developer
          <br />
          <span>Apr 2024 — Present</span>
        </p>
        <p>
          Frontend Intern
          <br />
          <span>Nov 2023 — Apr 2024</span>
        </p>
        <small>Startup backed by SINE (IIT Bombay)</small>
        <h3>Working with</h3>
        <p>
          React, Next.js, TypeScript, React Native, Redux, Zustand, SCSS, Jest,
          React Profiler
        </p>
        <h3>Education</h3>
        <p>
          Bachelor of Computer Applications
          <br />
          <span>Chandrabhan Sharma College · 2021</span>
        </p>
      </div>
    </div>
  );
}

export default function Portfolio() {
  return (
    <>
      <section className="hero">
        <div className="hero-context">
          <span>Mumbai, India</span>
          <span>React / Next.js / TypeScript</span>
        </div>
        <h1 className="hero-title">
          <span className="hero-name">Rohit Mahar</span>{" "}
          <span className="hero-separator" aria-hidden="true">
            /
          </span>{" "}
          <span className="hero-role">
            Frontend developer<span className="period">.</span>
          </span>
        </h1>
        <div className="hero-intro">
          <p>
            I build React and Next.js applications at LineupX, alongside
            personal apps and developer tools.
          </p>
          <Link className="primary-link" href="/work">
            View professional work <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="hero-foot">
          <span>Currently at LineupX</span>
          <span>Exploring UI/UX through product redesigns</span>
        </div>
      </section>
      <section className="home-directory" aria-label="Explore the portfolio">
        <Link href="/work">
          <span>Professional work</span>
          <h2>
            At LineupX <span aria-hidden="true">↗</span>
          </h2>
          <p>
            Production interfaces, performance improvements, and legacy UI
            redesigns.
          </p>
        </Link>
        <Link href="/projects">
          <span>Personal projects</span>
          <h2>
            Apps & tools <span aria-hidden="true">↗</span>
          </h2>
          <p>
            PR Tracker, Context Flow AI, Next Shelf, and smaller developer
            utilities.
          </p>
        </Link>
      </section>
    </>
  );
}
