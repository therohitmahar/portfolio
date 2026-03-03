import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";

export default function Home() {
  return (
    <main className="flex-1 mt-20 mb-20">
      <Hero />
      <Projects />
      <About />
      <Skills />
      <Experience />
    </main>
  );
}
