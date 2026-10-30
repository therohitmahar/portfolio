"use client";
import { useRef, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";
// Cards are rendered on the server; the client only owns category selection.
export default function ProjectArchive({
  items,
}: {
  items: { slug: string; kind: string; node: ReactNode }[];
}) {
  const grid = useRef<HTMLDivElement>(null);
  const active = useRef<ViewTransition | null>(null);
  function selectFilter(next: string, keyboard: boolean) {
    active.current?.skipTransition();
    if (
      keyboard ||
      !document.startViewTransition ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setFilter(next);
      return;
    }
    const nameSlots = () =>
      grid.current
        ?.querySelectorAll<HTMLElement>("[data-project-slot]")
        .forEach((slot) => {
          slot.style.viewTransitionName = `filter-${slot.dataset.projectSlot}`;
        });
    nameSlots();
    const transition = document.startViewTransition(() => {
      flushSync(() => setFilter(next));
      nameSlots();
    });
    active.current = transition;
    void transition.ready.catch(() => {});
    void transition.finished
      .catch(() => {})
      .then(() => {
        if (active.current !== transition) return;
        active.current = null;
        grid.current
          ?.querySelectorAll<HTMLElement>("[data-project-slot]")
          .forEach((slot) => slot.style.removeProperty("view-transition-name"));
      });
  }
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
              onClick={(event) => selectFilter(f, event.detail === 0)}
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
      <div className="project-grid" ref={grid}>
        {visible.map((p) => (
          <div className="project-slot" key={p.slug} data-project-slot={p.slug}>
            {p.node}
          </div>
        ))}
      </div>
    </>
  );
}
