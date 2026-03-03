import Link from 'next/link';
import { projects } from '@/data/projects';

export default function Projects() {
  // Render the first 3 projects for the home page as requested
  const featuredProjects = projects.slice(0, 3);

  return (
    <section className="px-4 sm:px-10 mb-20" id="projects">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold leading-tight tracking-[-0.015em] text-[var(--color-text-primary)]">
          Selected Projects
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProjects.map((project) => (
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
      <div className="mt-12 flex justify-center">
        <Link 
          href="/projects" 
          className="flex items-center gap-2 text-primary hover:text-primary-hover font-bold text-lg transition-colors group"
        >
          View All Projects
          <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
        </Link>
      </div>
    </section>
  );
}
