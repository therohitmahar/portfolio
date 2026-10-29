import type { Metadata } from "next";
import { PageIntro, TextLink } from "@/components/UI";
export const metadata: Metadata = {
  title: "Professional work",
  description:
    "Production frontend work at LineupX: data-heavy interfaces, assessment workflows, performance, and legacy UI redesigns.",
};
export default function WorkPage() {
  return (
    <div className="page-content">
      <PageIntro label="Experience / LineupX" title="work" slash>
        <p>
          Production frontend development at LineupX, a startup backed by SINE
          (IIT Bombay). My work spans data-heavy screens, assessment workflows,
          and redesigns within the existing product.
        </p>
      </PageIntro>
      <div className="professional-layout">
        <aside className="work-context">
          <h2>LineupX</h2>
          <p>Mumbai, India</p>
          <dl className="career-list">
            <div>
              <dt>Frontend Developer</dt>
              <dd>Apr 2024 — Present</dd>
            </div>
            <div>
              <dt>Frontend Intern</dt>
              <dd>Nov 2023 — Apr 2024</dd>
            </div>
          </dl>
          <TextLink href="/rohit-mahar-resume.pdf">View resume</TextLink>
        </aside>
        <div className="contributions">
          <section className="work-section">
            <span className="eyebrow">Performance</span>
            <h2>Candidate Database</h2>
            <p className="contribution-lead">
              50% fewer unnecessary re-renders.
            </p>
            <p>
              I used memoization, caching, and state-management changes to
              reduce repeated rendering on the database page, checking rendering
              behavior with React Profiler.
            </p>
            <p className="scope-note">
              This figure describes re-renders on that page; it does not
              represent a 50% reduction in load time.
            </p>
          </section>
          <section className="work-section">
            <span className="eyebrow">Product development</span>
            <h2>Assessment workflows</h2>
            <p>
              Developed frontend assessment screens and integrated screen
              recording and camera-based proctoring. The work involved fitting
              the interaction and capture states into the product’s assessment
              workflow.
            </p>
            <p>
              My contribution was on the frontend and its integrations,
              alongside the backend and product teams.
            </p>
          </section>
          <section className="work-section">
            <span className="eyebrow">UI/UX in an existing product</span>
            <h2>Candidate-field settings</h2>
            <p>
              Replaced a section dropdown with persistent sidebar navigation so
              field groups remain visible while editing. I reused the existing
              table and button components and kept the established field groups.
            </p>
            <TextLink href="/work/lineupx-settings">
              Read the redesign notes
            </TextLink>
          </section>
          <section className="work-section">
            <span className="eyebrow">Shared frontend work</span>
            <h2>Components, hooks & analytics</h2>
            <p>
              Built reusable React components, custom Redux hooks, and
              interactive Chart.js dashboards. Centralising repeated UI behavior
              and state access made those patterns available across product
              screens.
            </p>
          </section>
          <section className="work-section">
            <span className="eyebrow">Working with users</span>
            <h2>From a reported issue to a fix</h2>
            <p>
              I work directly with users to clarify requests and reproduce
              problems, then coordinate changes with product and backend
              colleagues and follow the fixes through delivery.
            </p>
          </section>
        </div>
      </div>
      <section className="page-next">
        <div>
          <span className="eyebrow">Outside work</span>
          <h2>Personal apps & developer tools</h2>
          <p>
            Explore the products and small utilities I build alongside my
            professional work.
          </p>
        </div>
        <TextLink href="/projects">Browse projects</TextLink>
      </section>
    </div>
  );
}
