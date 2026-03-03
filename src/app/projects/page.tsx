import { projects } from '@/data/projects';

export default function ProjectsPage() {
  return (
    <main className="flex-1 mt-24 mb-20 px-4 sm:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 sm:mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-semibold mb-6">
            <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
            <span>Selected Work</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black leading-tight tracking-[-0.033em] text-[var(--color-text-primary)]">
            Product Portfolio
          </h1>
          <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-3xl mt-6">
            A curated collection of projects ranging from complex e-commerce clones to efficient utility tools, demonstrating my proficiency in modern web technologies and user-centered design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <article 
              key={project.name}
              className="modern-card group rounded-xl overflow-hidden flex flex-col h-full"
            >
              <div className="relative pt-4 px-4 pb-0 bg-gradient-to-b from-slate-800/20 to-transparent overflow-hidden">
                <div className="relative z-10 w-full aspect-[16/10] bg-slate-900 rounded-t-lg floating-mockup border-t border-x border-white/10 overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    style={{ backgroundImage: `url("${project.image_url}")` }}
                    role="img"
                    aria-label={project.name}
                  />
                  <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
              </div>

              <div className="p-6 flex flex-col flex-grow relative">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-[var(--color-text-primary)] tracking-tight group-hover:text-primary transition-colors">
                    {project.name.replace(/-/g, ' ')}
                  </h3>
                </div>
                <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed text-sm line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                  <span className="px-3 py-1 text-[10px] font-semibold tracking-wide uppercase text-primary bg-primary/10 rounded-full border border-primary/20">
                    {project.type}
                  </span>
                  {project.install_cmd && (
                    <span className="px-3 py-1 text-[10px] font-semibold tracking-wide uppercase text-[var(--color-text-muted)] bg-[var(--color-bg-elevated)] rounded-full border border-[var(--color-border)] font-mono">
                      $ {project.install_cmd}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 mt-auto">
                  <a 
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex justify-center items-center px-4 py-2.5 text-xs font-semibold text-white bg-primary hover:bg-primary-hover rounded-md transition-all shadow-md shadow-primary/10"
                  >
                    Live Demo
                    <span className="material-symbols-outlined text-[16px] ml-1.5 font-light">visibility</span>
                  </a>
                  <a 
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex justify-center items-center px-4 py-2.5 text-xs font-semibold text-[var(--color-text-primary)] bg-transparent border border-[var(--color-border)] hover:border-primary/50 hover:bg-[var(--color-bg-elevated)] rounded-md transition-all"
                  >
                    GitHub
                    <span className="material-symbols-outlined text-[16px] ml-1.5 font-light">code</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
