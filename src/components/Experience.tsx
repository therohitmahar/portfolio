const experiences = [
  {
    title: "Front-End Developer",
    company: "Linupex Technologies",
    description:
      "Leading frontend development initiatives, implementing responsive designs, and optimizing application performance.",
    current: true,
  },
  {
    title: "Intern",
    company: "LineupX",
    description:
      "Assisted in developing user interface components and gained hands-on experience with modern web technologies.",
    current: false,
  },
];

import Link from 'next/link';

export default function Experience() {
  return (
    <section className="px-4 sm:px-10 mb-20 sm:mb-32" id="experience">
      <h2 className="text-3xl sm:text-4xl font-bold leading-tight tracking-[-0.015em] text-[var(--color-text-primary)] mb-10">
        Experience
      </h2>
      <div className="relative pl-8 sm:pl-10 space-y-12 before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-0 before:w-[2px] before:bg-[var(--color-border)]">
        {experiences.map((exp) => (
          <div key={exp.title + exp.company} className="relative">
            <div
              className={`absolute -left-[29px] sm:-left-[33px] top-2 w-4 h-4 rounded-full border-4 border-[var(--color-bg-page)] ${
                exp.current
                  ? "bg-primary shadow-[0_0_0_4px_rgba(79,70,229,0.2)]"
                  : "bg-[var(--color-timeline-dot-inactive)]"
              }`}
            />
            <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
              {exp.title}
            </h3>
            <p className="text-primary font-medium mb-2">{exp.company}</p>
            <p className="text-[var(--color-text-secondary)]">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <Link 
          href="/experience" 
          className="flex items-center gap-2 text-primary hover:text-primary-hover font-bold text-lg transition-colors group"
        >
          View Full Career History
          <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
        </Link>
      </div>
    </section>
  );
}
