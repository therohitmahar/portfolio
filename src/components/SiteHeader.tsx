"use client";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import BrandSlash from "./BrandSlash";
import ArrowIcon from "./ArrowIcon";
import BrandLogo from "./BrandLogo";
export default function SiteHeader() {
  const pathname = usePathname();
  const nav = useRef<HTMLElement>(null);
  const underline = useRef<HTMLSpanElement>(null);
  const instant = useRef(true);
  useLayoutEffect(() => {
    const update = () => {
      const current = nav.current?.querySelector<HTMLElement>("[aria-current]");
      const line = underline.current;
      if (!line || !nav.current) return;
      line.style.transitionDuration = instant.current ? "0s" : "";
      if (!current) {
        line.style.opacity = "0";
        return;
      }
      const bounds = current.getBoundingClientRect();
      const parent = nav.current.getBoundingClientRect();
      line.style.width = `${bounds.width}px`;
      line.style.transform = `translateX(${bounds.left - parent.left}px)`;
      line.style.top = `${bounds.bottom - parent.top + (innerWidth > 650 ? 6 : -2)}px`;
      line.style.opacity = "1";
      nav.current.dataset.motionReady = "true";
    };
    update();
    let initialObservation = true;
    const observer = new ResizeObserver(() => {
      if (initialObservation) {
        initialObservation = false;
        return;
      }
      instant.current = true;
      update();
    });
    if (nav.current) observer.observe(nav.current);
    return () => observer.disconnect();
  }, [pathname]);
  return (
    <header className="site-header">
      <Link className="identity" href="/" aria-label="Rohit Mahar — home">
        <BrandLogo />
      </Link>
      <nav
        aria-label="Main navigation"
        ref={nav}
        onPointerDown={() => {
          instant.current = false;
        }}
        onKeyDown={() => {
          instant.current = true;
        }}
      >
        <span className="nav-active-line" ref={underline} aria-hidden="true" />
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
