"use client";
import { useState, type ReactNode } from "react";
// Cards are rendered on the server; the client only owns category selection.
export default function ProjectArchive({
  items,
}: {
  items: { slug: string; kind: string; node: ReactNode }[];
}) {
  const [filter, setFilter] = useState("All");
  const visible = items.filter((p) => filter === "All" || p.kind === filter);
  return (
    <>
      <div className="archive-toolbar">
        <div className="filters" aria-label="Filter projects">
          {["All", "Product", "Tool", "Interface"].map((f) => (
            <button
              type="button"
              key={f}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f === "All"
                ? "All projects"
                : f === "Interface"
                  ? "UI explorations"
                  : f + "s"}
              <span>
                {f === "All"
                  ? items.length
                  : items.filter((p) => p.kind === f).length}
              </span>
            </button>
          ))}
        </div>
        <p role="status">
          {visible.length} {visible.length === 1 ? "project" : "projects"}
        </p>
      </div>
      <div className="project-grid">
        {visible.map((p) => (
          <div className="project-slot" key={p.slug}>
            {p.node}
          </div>
        ))}
      </div>
    </>
  );
}
