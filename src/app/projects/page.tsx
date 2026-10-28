import type { Metadata } from "next";
import { Projects } from "@/components/Portfolio";
export const metadata: Metadata = { title: "Projects" };
export default function ProjectsPage() {
  return (
    <div className="page-content">
      <div className="page-intro">
        <h1>Personal projects.</h1>
        <p>
          Product apps, small developer tools, and interface explorations.
          Filter by the kind of work you want to see.
        </p>
      </div>
      <Projects archive />
    </div>
  );
}
