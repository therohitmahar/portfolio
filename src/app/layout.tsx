import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://rohitmahar.vercel.app"),
  title: {
    default: "Rohit Mahar — Frontend Developer",
    template: "%s | Rohit Mahar",
  },
  description:
    "Frontend developer in Mumbai. React and Next.js product work, developer tools, and UI/UX explorations.",
  openGraph: {
    title: "Rohit Mahar — Frontend Developer",
    description: "Product interfaces, developer tools, and project notes.",
    type: "website",
    locale: "en_IN",
  },
  twitter: { card: "summary" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div className="site-shell">
          <header className="site-header">
            <Link className="identity" href="/" aria-label="Rohit Mahar — home">
              rm
            </Link>
            <nav aria-label="Main navigation">
              <Link href="/work">Work</Link>
              <Link href="/projects">Projects</Link>
              <Link href="/about">About</Link>
              <a href="/rohit-mahar-resume.pdf">
                Resume <span aria-hidden="true">↗</span>
              </a>
            </nav>
          </header>
          <main id="main">{children}</main>
          <footer id="contact" className="site-footer">
            <div>
              <span className="footer-label">Contact</span>
              <a className="email-link" href="mailto:therohitmahar@gmail.com">
                therohitmahar@gmail.com
              </a>
            </div>
            <div className="footer-links">
              <a
                href="https://github.com/therohitmahar"
                target="_blank"
                rel="noreferrer"
              >
                GitHub ↗
              </a>
              <a
                href="https://www.linkedin.com/in/therohitmahar/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn ↗
              </a>
              <Link href="/contact">Contact details</Link>
            </div>
            <p>Mumbai, India</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
