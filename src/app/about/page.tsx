import type { Metadata } from "next";
import { PageIntro, TextLink } from "@/components/UI";
export const metadata: Metadata = {
  title: "About",
  description:
    "Rohit Mahar, a frontend developer in Mumbai working with React, Next.js, TypeScript, and a growing interest in UI/UX.",
};
export default function AboutPage() {
  return (
    <div className="page-content">
      <PageIntro label="Background & approach" title="about" slash>
        <p>
          I’m Rohit Mahar, a frontend developer based in Mumbai. I build React
          and Next.js interfaces at LineupX and explore product ideas through
          personal apps and developer tools.
        </p>
      </PageIntro>
      <div className="about-editorial">
        <div className="about-story">
          <section>
            <h2>The work I’m drawn to</h2>
            <p>
              I like the parts of frontend work where behavior matters: a long
              import that needs to resume, a graph editor that should recover a
              draft, or a reading library that needs to survive a backup
              restore.
            </p>
            <p>
              My side projects give me room to follow those problems through,
              from the interface to the state and persistence underneath it.
            </p>
            <TextLink href="/projects">Explore my projects</TextLink>
          </section>
          <section>
            <h2>More attention to UI/UX</h2>
            <p>
              Over the past few months, I’ve been spending more time on UI/UX.
              That has included redesigning legacy candidate-field settings at
              LineupX and exploring service discovery and booking layouts in
              ClearMind.
            </p>
            <p>
              I’m interested in how navigation, grouping, and feedback can make
              an existing workflow easier to understand.
            </p>
            <div className="inline-links">
              <TextLink href="/work/lineupx-settings">
                LineupX redesign
              </TextLink>
              <TextLink href="/projects/clearmind">
                ClearMind exploration
              </TextLink>
            </div>
          </section>
          <section>
            <h2>Working with people</h2>
            <p>
              Direct conversations with users help me understand what is
              happening before deciding what to change. I clarify requests,
              reproduce issues, and work with product and backend colleagues to
              get fixes into the product.
            </p>
          </section>
        </div>
        <aside className="about-facts">
          <section>
            <h2>Currently</h2>
            <p>Frontend Developer at LineupX</p>
            <span>Apr 2024 — Present</span>
            <p>Previously a Frontend Intern</p>
            <span>Nov 2023 — Apr 2024</span>
            <TextLink href="/work">Professional work</TextLink>
          </section>
          <section>
            <h2>Working with</h2>
            <dl className="capability-list">
              <div>
                <dt>Interfaces</dt>
                <dd>React, Next.js, TypeScript, React Native</dd>
              </div>
              <div>
                <dt>State & styling</dt>
                <dd>Redux, Zustand, SCSS</dd>
              </div>
              <div>
                <dt>Verification</dt>
                <dd>Jest, React Profiler, browser DevTools</dd>
              </div>
            </dl>
          </section>
          <section>
            <h2>Education</h2>
            <p>Bachelor of Computer Applications</p>
            <span>
              Chandrabhan Sharma College
              <br />
              2021
            </span>
          </section>
          <TextLink href="/rohit-mahar-resume.pdf">View resume</TextLink>
        </aside>
      </div>
      <section className="page-next">
        <div>
          <span className="eyebrow">Get in touch</span>
          <h2>Talk about the work</h2>
          <p>
            For frontend opportunities, project enquiries, or questions about a
            build.
          </p>
        </div>
        <TextLink href="/contact">Contact details</TextLink>
      </section>
    </div>
  );
}
