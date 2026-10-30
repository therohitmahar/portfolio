import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import ArrowIcon from "@/components/ArrowIcon";
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
      <head>
        <meta
          name="color-scheme"
          content="light dark"
          suppressHydrationWarning
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var s=localStorage.getItem("portfolio-color-scheme");if(s==="light"||s==="dark")document.querySelector('meta[name="color-scheme"]').content=s}catch{}`,
          }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div className="site-shell">
          <SiteHeader />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
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
                GitHub <ArrowIcon />
              </a>
              <a
                href="https://www.linkedin.com/in/therohitmahar/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn <ArrowIcon />
              </a>
              <Link href="/contact">Contact details</Link>
              <a href="/rohit-mahar-resume.pdf">Resume <ArrowIcon /></a>
            </div>
            <p>Mumbai, India</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
