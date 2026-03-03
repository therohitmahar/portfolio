export default function ExperiencePage() {
  const experiences = [
    {
      title: "Front-End Developer",
      company: "Linupex Technologies",
      date: "April 2024 - Present",
      current: true,
      bullets: [
        "Developed a production-grade online assessment platform using React and Next.js with screen recording and facial recognition, reducing cheating incidents by 50%",
        "Designed and implemented reusable React components and custom Redux hooks, doubling feature development speed",
        "Optimized frontend performance using memoization, caching strategies, and controlled re-rendering, reducing unnecessary renders by 50%",
        "Implemented lazy loading and code-splitting techniques to improve initial load performance and UI responsiveness",
        "Integrated Chart.js to build interactive analytics dashboards for clear and actionable data visualization",
        "Developed multiple internal web applications including credential management systems, component libraries, email archival tools, and OTP retrieval systems",
        "Enhanced an existing React Native application by building reusable bottom-sheet components and enabling mobile document upload workflows",
        "Integrated REST APIs and handled asynchronous data flows with proper error handling",
        "Collaborated closely with backend developers and designers to translate Figma designs into responsive and accessible UI using semantic HTML",
      ],
      tags: ["React", "Next.js", "Redux", "Chart.js"],
    },
    {
      title: "Front-End Developer Intern",
      company: "LineupX",
      date: "Nov 2023 - April 2024",
      current: false,
      bullets: [
        "Contributed to AI-driven SaaS features using React.js, Next.js, SCSS, Chart.js, and React Table",
        "Converted Figma designs into responsive and mobile-friendly user interfaces",
        "Implemented Redux-based state management to streamline data flow between frontend and backend services",
        "Built data tables and charts using React Table and Chart.js",
        "Assisted in debugging, UI bug fixes, and performance improvements across the platform",
      ],
      tags: ["React", "Next.js", "SCSS", "React Table"],
    },
  ];

  return (
    <main className="flex-1 mt-24 mb-20">
      <div className="px-4 sm:px-10 mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-semibold mb-6">
          <span className="material-symbols-outlined text-[16px]">
            work_history
          </span>
          <span>Career History</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black leading-tight tracking-[-0.033em] text-[var(--color-text-primary)]">
          Professional Experience
        </h1>
        <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-3xl mt-6">
          A detailed timeline of my career growth, highlighting my transition
          from intern to front-end developer, and the technical impact I&apos;ve
          made in building high-performance web applications.
        </p>
      </div>
      <div className="px-4 sm:px-10 mb-20 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em] text-[var(--color-text-primary)] mb-8 border-b border-[var(--color-border)] pb-4">
            Work History
          </h2>
          <div className="relative pl-8 sm:pl-10 space-y-16 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-0 before:w-[2px] before:bg-[var(--color-border)]">
            {experiences.map((exp) => (
              <div key={exp.title + exp.company} className="relative group">
                <div
                  className={`absolute -left-[35px] sm:-left-[39px] top-1 w-6 h-6 rounded-full border-4 border-[var(--color-bg-page)] flex items-center justify-center transition-transform group-hover:scale-110 ${
                    exp.current
                      ? "bg-primary shadow-[0_0_0_4px_rgba(79,70,229,0.2)]"
                      : "bg-[var(--color-timeline-dot-inactive)]"
                  }`}
                ></div>
                <div className={`bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-6 sm:p-8 shadow-lg shadow-[var(--color-shadow-card)] transition-colors ${exp.current ? "hover:border-primary/50" : "opacity-90 hover:opacity-100 hover:border-slate-500/50"}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                    <div>
                      <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">
                        {exp.title}
                      </h3>
                      <p className={`text-lg font-semibold ${exp.current ? "text-primary" : "text-[var(--color-text-secondary)]"}`}>
                        {exp.company}
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-sm font-medium text-[var(--color-text-secondary)] whitespace-nowrap">
                      <span className="material-symbols-outlined text-[16px]">
                        calendar_month
                      </span>
                      {exp.date}
                    </div>
                  </div>
                  <div className="mt-6 space-y-4 text-[var(--color-text-secondary)] text-base leading-relaxed">
                    <ul className="list-disc list-outside ml-5 space-y-3">
                      {exp.bullets.map((bullet, idx) => (
                         // Using strongly formatted first segments of text since no explicit bolding is in JSON, defaulting to normal text
                        <li key={idx}><span className="text-[var(--color-text-primary)]">{bullet}</span></li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
                    <h4 className="text-sm font-semibold text-[var(--color-text-muted)] mb-3 uppercase tracking-wider">
                      Technologies Used
                    </h4>
                    <div className="flex gap-2 flex-wrap">
                      {exp.tags.map(tag => (
                         <span key={tag} className={`px-3 py-1 rounded-md text-xs font-semibold ${exp.current ? "bg-primary/10 text-primary border border-primary/20" : "bg-[var(--color-tag-bg)] text-[var(--color-tag-text)] border border-[var(--color-tag-border)]"}`}>
                           {tag}
                         </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-32">
            <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em] text-[var(--color-text-primary)] mb-8 border-b border-[var(--color-border)] pb-4">
              Key Competencies
            </h2>
            <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-6 shadow-lg shadow-[var(--color-shadow-card)]">
              <div className="space-y-6">
                <div className="group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                      <span className="material-symbols-outlined text-[18px]">
                        api
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--color-text-primary)] group-hover:text-primary transition-colors">
                      API Integration
                    </h3>
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed pl-11">
                    Expertise in integrating complex RESTful APIs, handling asynchronous operations, and managing data fetching efficiently.
                  </p>
                </div>
                <div className="group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                      <span className="material-symbols-outlined text-[18px]">
                        splitscreen
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--color-text-primary)] group-hover:text-primary transition-colors">
                      Code Splitting
                    </h3>
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed pl-11">
                    Implementing advanced performance optimization techniques including lazy loading to ensure rapid application delivery.
                  </p>
                </div>
                <div className="group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                      <span className="material-symbols-outlined text-[18px]">
                        groups
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--color-text-primary)] group-hover:text-primary transition-colors">
                      Team Collaboration
                    </h3>
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed pl-11">
                    Strong cross-functional collaboration skills, participating in code reviews, and maintaining high-quality codebases.
                  </p>
                </div>
                <div className="group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-primary flex items-center justify-center border border-indigo-500/20">
                      <span className="material-symbols-outlined text-[18px]">
                        architecture
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--color-text-primary)] group-hover:text-primary transition-colors">
                      State Management
                    </h3>
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed pl-11">
                    Designing scalable architectures using Redux Toolkit, Context API, and custom hooks for complex enterprise applications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
