const skills = [
  "React.js",
  "Next.js",
  "JavaScript (ES6+)",
  "Redux Toolkit",
  "TypeScript",
  "React Native",
  "Chart.js",
  "REST APIs",
  "HTML5 & CSS3",
  "Tailwind CSS",
];

export default function Skills() {
  return (
    <section className="px-4 sm:px-10 mb-20" id="skills">
      <h2 className="text-3xl sm:text-4xl font-bold leading-tight tracking-[-0.015em] text-[var(--color-text-primary)] mb-10">
        Technical Skills
      </h2>
      <div className="flex flex-wrap gap-4">
        {skills.map((skill) => (
          <div
            key={skill}
            className="px-4 py-2 rounded-lg bg-[var(--color-tag-bg)] border border-[var(--color-tag-border)] text-[var(--color-tag-text)] font-medium hover:text-primary hover:border-primary transition-colors cursor-default"
          >
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}
