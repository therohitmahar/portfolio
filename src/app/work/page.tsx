import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Professional work" };
export default function WorkPage() {
  return (
    <div className="page-content">
      <div className="page-intro">
        <h1>Professional work.</h1>
        <p>
          Production frontend development and interface redesigns at LineupX, a
          startup backed by SINE (IIT Bombay).
        </p>
      </div>
      <div className="work-intro">
        <div>
          <h2>LineupX</h2>
          <p>
            Frontend Developer · Apr 2024–Present
            <br />
            Frontend Intern · Nov 2023–Apr 2024
          </p>
        </div>
        <p>
          I work on data-heavy screens, assessment workflows, and shared React
          components. I also work directly with users to clarify requests,
          reproduce issues, and coordinate fixes with product and backend teams.
        </p>
      </div>
      <section className="section">
        <div className="section-heading">
          <h2>Selected contributions</h2>
        </div>
        <div className="contribution-list">
          <article>
            <h3>Candidate-field settings</h3>
            <p>
              Replaced the section dropdown with sidebar navigation and reused
              the existing table and button components.
            </p>
          </article>
          <article>
            <h3>Candidate Database performance</h3>
            <p>
              Reduced unnecessary re-renders by 50% using memoization, caching,
              and state-management changes. Checked rendering with React
              Profiler.
            </p>
          </article>
          <article>
            <h3>Assessment workflows</h3>
            <p>
              Developed frontend assessment screens and integrated screen
              recording and camera-based proctoring.
            </p>
          </article>
          <article>
            <h3>Components & analytics</h3>
            <p>
              Built reusable React components, custom Redux hooks, and
              interactive Chart.js dashboards.
            </p>
          </article>
        </div>
      </section>
      <div className="next-project">
        <span>Outside work</span>
        <Link href="/projects">Personal projects ↗</Link>
      </div>
    </div>
  );
}
