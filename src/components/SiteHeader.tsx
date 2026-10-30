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
  const returningHome = useRef(false);
  useLayoutEffect(() => {
    const html = document.documentElement;
    let remaining = 5000;
    let timed = true;
    let scrollAfter = performance.now() + 800;
    let started = performance.now();
    let timer: ReturnType<typeof setTimeout>;
    let cleanupTimer: ReturnType<typeof setTimeout>;
    let finished = html.dataset.brandIntro !== "pending";
    const finish = (immediate = false) => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      html.dataset.brandIntro = immediate ? "done" : "closing";
      document.dispatchEvent(new CustomEvent("brand-intro-end", { detail: immediate }));
      cleanupTimer = setTimeout(() => { delete html.dataset.brandIntro; }, immediate ? 0 : 600);
    };
    const schedule = () => {
      started = performance.now();
      timer = setTimeout(() => finish(), remaining);
    };
    const visibility = () => {
      if (finished || !timed) return;
      if (document.hidden) {
        remaining = Math.max(0, remaining - (performance.now() - started));
        clearTimeout(timer);
      } else schedule();
    };
    const skip = () => finish(true);
    const pointerIntent = (event: PointerEvent) => {
      if (!(event.target instanceof Element) || !event.target.closest(".identity")) finish();
    };
    // Ignore restoration during initial layout, but respond to real gestures immediately.
    const scroll = () => { if (!returningHome.current && performance.now() >= scrollAfter) finish(); };
    const scrollGesture = () => finish();
    const replay = () => {
      if (preference.matches || matchMedia("(min-width: 900px) and (hover: hover) and (pointer: fine)").matches) return;
      clearTimeout(timer);
      clearTimeout(cleanupTimer);
      finished = false;
      timed = false;
      scrollAfter = performance.now() + 200;
      html.dataset.brandIntro = "pending";
      document.dispatchEvent(new CustomEvent("brand-intro-open"));
    };
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const reduce = () => { if (preference.matches) skip(); };
    if (!finished && !document.hidden) schedule();
    document.addEventListener("visibilitychange", visibility);
    document.addEventListener("keydown", skip, true);
    document.addEventListener("pointerdown", pointerIntent, true);
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("wheel", scrollGesture, { passive: true });
    window.addEventListener("touchmove", scrollGesture, { passive: true });
    document.addEventListener("brand-intro-request", replay);
    preference.addEventListener("change", reduce);
    return () => {
      clearTimeout(timer);
      clearTimeout(cleanupTimer);
      document.removeEventListener("visibilitychange", visibility);
      document.removeEventListener("keydown", skip, true);
      document.removeEventListener("pointerdown", pointerIntent, true);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("wheel", scrollGesture);
      window.removeEventListener("touchmove", scrollGesture);
      document.removeEventListener("brand-intro-request", replay);
      preference.removeEventListener("change", reduce);
    };
  }, []);
  useLayoutEffect(() => {
    if (pathname === "/" && returningHome.current) {
      const timer = setTimeout(() => { returningHome.current = false; }, 200);
      return () => clearTimeout(timer);
    }
  }, [pathname]);
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
      <Link className="identity" href="/" aria-label="Rohit Mahar — home" onClick={() => {
        if (matchMedia("(min-width: 900px) and (hover: hover) and (pointer: fine)").matches) return;
        returningHome.current = pathname !== "/";
        document.dispatchEvent(new CustomEvent("brand-intro-request"));
      }}>
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
