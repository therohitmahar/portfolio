"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link 
              href="/" 
              className="flex items-center gap-3 group transition-transform hover:scale-[1.02]"
            >
              <div className="relative flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 -960 960 960" width="28" fill="#4f46e5" className="drop-shadow-[0_0_8px_rgba(79,70,229,0.4)]">
                  <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H160v400Zm140-40-56-56 103-104-104-104 57-56 160 160-160 160Zm180 0v-80h240v80H480Z"/>
                </svg>
              </div>
              <span className="text-xl sm:text-2xl font-black leading-tight tracking-[-0.033em] text-[var(--color-text-primary)]">
                Rohit Mahar
              </span>
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex space-x-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link text-xs uppercase tracking-widest font-semibold transition-colors ${
                    isActive
                      ? "active text-[var(--color-text-primary)]"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center space-x-6">
            <button
              aria-label="Toggle Theme"
              onClick={toggleTheme}
              className="text-[var(--color-text-muted)] hover:text-yellow-400 transition-colors p-1 rounded-full hover:bg-[var(--color-bg-elevated)]"
            >
              <span className="material-symbols-outlined text-[20px] leading-none">
                {theme === "dark" ? "light_mode" : "dark_mode"}
              </span>
            </button>
            <a
              href="/Rohit Mahar - Frontend Developer Resume (2).pdf"
              download="Rohit-Mahar-Resume.pdf"
              className="inline-flex items-center justify-center px-4 py-1.5 border border-[var(--color-border)] hover:border-primary/50 text-xs font-semibold rounded-full shadow-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] bg-[var(--color-bg-elevated)] hover:bg-[var(--color-bg-card)] transition-all"
            >
              Resume
              <span className="material-symbols-outlined text-[14px] ml-1.5">download</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-4">
             <button
              onClick={toggleTheme}
              className="text-[var(--color-text-muted)] hover:text-yellow-400 transition-colors p-2 rounded-md hover:bg-[var(--color-bg-elevated)]"
            >
              <span className="material-symbols-outlined text-[20px]">
                {theme === "dark" ? "light_mode" : "dark_mode"}
              </span>
            </button>
            <button
              aria-label="Open main menu"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-elevated)] focus:outline-none"
            >
              <span className="material-symbols-outlined">{mobileOpen ? "close" : "menu"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-[var(--color-bg-card)] border-b border-[var(--color-border)] px-4 pt-2 pb-6 flex flex-col gap-4 shadow-xl">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm uppercase tracking-widest font-semibold py-2 transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href="/Rohit Mahar - Frontend Developer Resume (2).pdf"
            download="Rohit-Mahar-Resume.pdf"
            className="flex items-center justify-center px-4 py-2 border border-[var(--color-border)] text-xs font-semibold rounded-full text-[var(--color-text-secondary)] bg-[var(--color-bg-elevated)] w-full"
            onClick={() => setMobileOpen(false)}
          >
            Resume
            <span className="material-symbols-outlined text-[14px] ml-1.5">download</span>
          </a>
        </div>
      )}
    </header>
  );
}
