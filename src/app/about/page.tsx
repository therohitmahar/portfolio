import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, TextLink } from "@/components/UI";
import ArrowIcon from "@/components/ArrowIcon";
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
      <section className="about-profile" aria-labelledby="experience-heading">
        <h2 id="experience-heading">Experience at LineupX</h2>
        <ol className="about-timeline" role="list">
          <li>
            <h3>Frontend Developer</h3>
            <p>
              <time dateTime="2024-04">Apr 2024</time> — Present
            </p>
          </li>
          <li>
            <h3>Frontend Intern</h3>
            <p>
              <time dateTime="2023-11">Nov 2023</time> —{" "}
              <time dateTime="2024-04">Apr 2024</time>
            </p>
          </li>
        </ol>
        <div className="about-profile-actions">
          <TextLink href="/work">View professional work</TextLink>
        </div>
      </section>
      <div className="about-editorial">
        <div className="about-story">
          <h2>How I work</h2>
          <section data-reveal>
            <h3>Frontend engineering</h3>
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
          <section data-reveal>
            <h3>UI/UX and product redesigns</h3>
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
                View LineupX redesign
              </TextLink>
              <TextLink href="/projects/clearmind">
                View ClearMind exploration
              </TextLink>
            </div>
          </section>
          <section data-reveal>
            <h3>User collaboration</h3>
            <p>
              Direct conversations with users help me understand what is
              happening before deciding what to change. I clarify requests,
              reproduce issues, and work with product and backend colleagues to
              get fixes into the product.
            </p>
          </section>
        </div>
        <aside className="about-facts" aria-labelledby="background-heading">
          <h2 id="background-heading">Skills & education</h2>
          <section data-reveal>
            <h3>Technologies</h3>
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
          <section data-reveal>
            <h3>Education</h3>
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
          <h2>Talk about the work</h2>
          <p>
            For frontend opportunities, project enquiries, or questions about a
            build.
          </p>
        </div>
        <Link className="primary-link" href="/contact">
          Get in touch <ArrowIcon direction="right" />
        </Link>
      </section>
    </div>
  );
}
