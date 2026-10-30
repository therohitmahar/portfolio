"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import BrandSlash from "./BrandSlash";
import ArrowIcon from "./ArrowIcon";
import BrandLogo from "./BrandLogo";
export default function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="site-header">
      <Link className="identity" href="/" aria-label="Rohit Mahar — home">
        <BrandLogo />
      </Link>
      <nav aria-label="Main navigation">
        {[
          { href: "/work", label: "work" },
          { href: "/projects", label: "projects" },
          { href: "/about", label: "about" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={
              pathname === item.href
                ? "page"
                : pathname.startsWith(item.href + "/")
                  ? "location"
                  : undefined
            }
          >
            <BrandSlash />
            {item.label}
          </Link>
        ))}
        <a className="nav-resume" href="/rohit-mahar-resume.pdf">
          Resume <ArrowIcon />
        </a>
        <ThemeToggle />
      </nav>
    </header>
  );
}
