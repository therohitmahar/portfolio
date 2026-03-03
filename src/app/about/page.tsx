export default function AboutPage() {
  return (
    <main className="flex-1 mt-24 mb-20 px-4 sm:px-10">
      <section className="mb-24 max-w-4xl">
        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 w-fit rounded-full bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-[14px]">person</span>
            <span>Profile</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-black leading-tight tracking-[-0.033em] text-[var(--color-text-primary)]">
            About Me
          </h1>
          <p className="text-lg sm:text-2xl text-[var(--color-text-secondary)] leading-relaxed font-medium mt-4">
            Front-End Developer with 2+ years of experience building scalable and high-performance web applications using React.js, Next.js, Redux Toolkit, and modern JavaScript. Strong focus on reusable components, performance optimization, responsive UI, and clean frontend architecture.
          </p>
          <div className="flex gap-4 mt-4">
            <a className="text-primary hover:text-primary-hover font-bold flex items-center gap-2 text-lg transition-colors group" href="/contact">
              Let&apos;s Talk 
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
            </a>
          </div>
        </div>
      </section>

      <section className="mb-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-primary/50 transition-colors duration-300">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-primary text-2xl">speed</span>
          </div>
          <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-3">Performance Optimization</h3>
          <p className="text-[var(--color-text-secondary)] leading-relaxed">
            Obsessed with optimizing for speed and efficiency. I leverage techniques like lazy loading, selective rendering, and memoization to decrease load times and improve interaction metrics.
          </p>
        </div>
        <div className="p-8 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-primary/50 transition-colors duration-300">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-primary text-2xl">architecture</span>
          </div>
          <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-3">Clean Architecture</h3>
          <p className="text-[var(--color-text-secondary)] leading-relaxed">
            Building with the future in mind. I design highly reusable React components and adopt modular directory structures that allow systems to scale seamlessly without accruing technical debt.
          </p>
        </div>
        <div className="p-8 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-primary/50 transition-colors duration-300">
          <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-primary text-2xl">accessibility_new</span>
          </div>
          <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-3">User & Accessibility Centric</h3>
          <p className="text-[var(--color-text-secondary)] leading-relaxed">
            Creating responsive interfaces that work flawlessly across all devices. Accessibility-friendly UI and semantic HTML are core principles, not just afterthoughts, ensuring experiences map exactly to Figma designs.
          </p>
        </div>
      </section>

      <section className="mb-24">
        <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-10 flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">code_blocks</span>
          Technical Skills
        </h2>
        <div className="space-y-10">
          <div>
            <h3 className="text-sm uppercase tracking-wider text-[var(--color-text-muted)] font-semibold mb-4">Frontend Development</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {['React.js', 'Next.js', 'JavaScript (ES6+)', 'Redux Toolkit', 'HTML5', 'CSS3', 'SCSS', 'Tailwind CSS'].map(skill => (
                <div key={skill} className="p-4 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border)] hover:border-primary transition-all flex items-center justify-center text-center font-medium text-[var(--color-text-primary)]">
                  {skill}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-wider text-[var(--color-text-muted)] font-semibold mb-4">Tools & Concepts</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {['REST APIs', 'Git', 'Chart.js', 'Memoization', 'Lazy Loading', 'Code Splitting', 'Responsive Design'].map(skill => (
                <div key={skill} className="p-4 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border)] hover:border-primary transition-all flex items-center justify-center text-center font-medium text-[var(--color-text-primary)]">
                  {skill}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-wider text-[var(--color-text-muted)] font-semibold mb-4">Familiar With</h3>
            <div className="flex flex-wrap gap-4">
              {['React Native', 'Node.js', 'Express.js', 'Go', 'Backend Development'].map(skill => (
                <div key={skill} className="px-4 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] text-sm font-medium">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col md:flex-row gap-12">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-8 flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">school</span>
            Education
          </h2>
          <div className="pl-4 border-l-2 border-[var(--color-border)] hover:border-primary transition-colors">
            <h4 className="text-lg font-semibold text-[var(--color-text-primary)]">Bachelor of Computer Applications</h4>
            <p className="text-primary font-medium mt-1">Chandrabhan Sharma College</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-[var(--color-text-muted)]">
              <span>2021</span>
              <span className="w-1 h-1 bg-[var(--color-text-muted)] rounded-full" />
              <span>79%</span>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-8 flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">emoji_events</span>
            Achievements
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="mt-1 min-w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 border border-yellow-500/20">
                <span className="material-symbols-outlined text-sm">trophy</span>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-[var(--color-text-primary)]">Second Prize Winner</h4>
                <p className="text-[var(--color-text-secondary)] text-sm mt-1">Error Hunt Competition</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-1 min-w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                <span className="material-symbols-outlined text-sm">leaderboard</span>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-[var(--color-text-primary)]">93 Percentile</h4>
                <p className="text-[var(--color-text-secondary)] text-sm mt-1">MCA Entrance Examination</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
