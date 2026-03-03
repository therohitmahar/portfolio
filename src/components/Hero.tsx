export default function Hero() {
  return (
    <section className="px-4 sm:px-10 mb-20 sm:mb-32">
      <div className="flex flex-col gap-6 items-start max-w-3xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-semibold mb-2">
          <span className="material-symbols-outlined text-[16px]">code</span>
          <span>Front-End Developer</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-7xl font-black leading-tight tracking-[-0.033em] text-[var(--color-text-primary)]">
          Building scalable, high-performance web applications.
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mt-4">
          Hi, I&apos;m Rohit. I specialize in React.js and modern JavaScript to
          create robust digital experiences with a focus on clean architecture.
        </p>

        {/* CTA */}
        <a
          className="mt-8 flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-8 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary-hover transition-all hover:scale-105 shadow-xl shadow-primary/30"
          href="#projects"
        >
          <span className="truncate">View Projects</span>
          <span className="material-symbols-outlined ml-2 text-[20px]">
            arrow_downward
          </span>
        </a>
      </div>
    </section>
  );
}
