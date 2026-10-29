"use client";
import { useState } from "react";
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
  return null;
}
