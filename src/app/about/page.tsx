import type { Metadata } from "next";
import { AboutContent } from "@/components/Portfolio";
export const metadata: Metadata = { title: "About" };
export default function AboutPage() {
  return (
    <div className="page-content">
      <div className="page-intro">
        <h1>Hi, I’m Rohit.</h1>
        <p>
          Frontend development, product work, and a growing interest in
          interface design.
        </p>
      </div>
      <AboutContent />
    </div>
  );
}
