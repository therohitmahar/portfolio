"use client";
import { useLayoutEffect, useRef } from "react";

export default function HeroSlash() {
  const slash = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      if (sessionStorage.getItem("portfolio-slash-revealed")) return;
      sessionStorage.setItem("portfolio-slash-revealed", "true");
    } catch {
      /* Storage is optional; the slash always remains visible. */
    }
    const animation = slash.current?.animate(
      [{ clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0 0 0 0)" }],
      { duration: 200, easing: "cubic-bezier(.23,1,.32,1)" },
    );
    return () => animation?.cancel();
  }, []);
  return (
    <span className="brand-slash hero-separator" ref={slash} aria-hidden="true">
      /
    </span>
  );
}
