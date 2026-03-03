"use client";

export default function ContactPage() {
  return (
    <main className="flex-1 mt-24 mb-20 px-4 sm:px-10">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        <div className="flex-1 flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 w-fit rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-semibold mb-2">
            <span className="material-symbols-outlined text-[16px]">chat</span>
            <span>Get in Touch</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-black leading-tight tracking-[-0.033em] text-[var(--color-text-primary)] mb-4">
            Let&apos;s build something amazing together.
          </h1>

          <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-xl mb-10">
            Whether you have a question, a project idea, or just want to say hi,
            I&apos;m always open to discussing new opportunities and ideas.
          </p>

          <div className="space-y-8 border-t border-[var(--color-border)] pt-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border)] flex items-center justify-center text-primary flex-shrink-0">
                <span className="material-symbols-outlined text-2xl">mail</span>
              </div>
              <div>
                <p className="text-sm text-[var(--color-text-muted)] font-medium mb-1">
                  Email
                </p>
                <a
                  href="mailto:therohitmahar@gmail.com"
                  className="text-lg font-bold text-[var(--color-text-primary)] hover:text-primary transition-colors"
                >
                  therohitmahar@gmail.com
                </a>
              </div>
            </div>


            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border)] flex items-center justify-center text-primary flex-shrink-0">
                <span className="material-symbols-outlined text-2xl">location_on</span>
              </div>
              <div>
                <p className="text-sm text-[var(--color-text-muted)] font-medium mb-1">
                  Location
                </p>
                <p className="text-lg font-bold text-[var(--color-text-primary)]">
                  Mumbai, India
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-10 shadow-xl shadow-[var(--color-shadow-card)]">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mb-8">
              Send a Message
            </h2>
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-[var(--color-text-secondary)]"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-[var(--color-text-muted)]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-[var(--color-text-secondary)]"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="john@example.com"
                  className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-[var(--color-text-muted)]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-sm font-semibold text-[var(--color-text-secondary)]"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="How can I help you?"
                  className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none placeholder:text-[var(--color-text-muted)]"
                />
              </div>

              <button
                type="submit"
                className="mt-4 flex items-center justify-center rounded-xl h-14 px-8 bg-primary text-white text-base font-bold leading-normal hover:bg-primary-hover transition-all hover:scale-[1.02] shadow-xl shadow-indigo-500/25 group w-full"
              >
                <span>Send Message</span>
                <span className="material-symbols-outlined ml-2 text-[20px] transition-transform group-hover:translate-x-1">
                  send
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
