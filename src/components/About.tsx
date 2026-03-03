import Link from 'next/link';

export default function About() {
  return (
    <section className="px-4 sm:px-10 mb-20" id="about">
      <div className="max-w-3xl border-l-4 border-primary pl-6 sm:pl-10">
        <h2 className="text-3xl sm:text-4xl font-bold leading-tight tracking-[-0.015em] text-[var(--color-text-primary)] mb-6">
          About Me
        </h2>
        <p className="text-xl sm:text-2xl text-[var(--color-text-secondary)] leading-relaxed font-medium">
          Front-End Developer with 2+ years of experience building scalable and
          high-performance web applications. Strong focus on reusable components,
          performance optimization, and clean frontend architecture.
        </p>
        <div className="mt-8">
          <Link 
            href="/about" 
            className="flex items-center gap-2 text-primary hover:text-primary-hover font-bold text-lg transition-colors group w-fit"
          >
            Learn More About Me
            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
