import Link from "next/link";
import Image from "next/image";
import BrandSlash from "./BrandSlash";
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
          <BrandSlash className="hero-separator" />{" "}
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
          <figure className="home-project-preview">
            <div>
              <Image
                src="/project-media/context-flow-ai.webp"
                alt="Context Flow AI editor with connected context blocks and an assembled prompt preview"
                width={1440}
                height={1000}
                sizes="(max-width: 650px) 90vw, 1px"
              />
            </div>
            <figcaption>Context Flow AI · a visual context editor</figcaption>
          </figure>
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
