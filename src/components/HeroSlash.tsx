"use client";

import { useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";

function subscribeToMotionPreference(notify: () => void) {
  const preference = matchMedia("(prefers-reduced-motion: reduce)");
  preference.addEventListener("change", notify);
  return () => preference.removeEventListener("change", notify);
}

// A single-character adaptation of React Bits' Stroke Text: outline, fill, hold,
// then reverse. The native glyph reserves its original space at every breakpoint.
export default function HeroSlash() {
  const root = useRef<HTMLButtonElement>(null);
  const [paused, setPaused] = useState(false);
  const reduced = useSyncExternalStore(
    subscribeToMotionPreference,
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true,
  );

  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    const svg = element.querySelector("svg");
    const context = document.createElement("canvas").getContext("2d");
    if (!svg || !context) return;
    let disposed = false;
    const measure = () => {
      if (disposed) return;
      const style = getComputedStyle(element);
      const bounds = element.getBoundingClientRect();
      const size = parseFloat(style.fontSize);
      if (!bounds.width || !bounds.height || !size) return;
      context.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      const metrics = context.measureText("/");
      const ascent = metrics.fontBoundingBoxAscent ?? size * 0.9;
      const descent = metrics.fontBoundingBoxDescent ?? size * 0.21;
      const baseline = (bounds.height - ascent - descent) / 2 + ascent;
      svg.setAttribute("viewBox", `0 0 ${bounds.width} ${bounds.height}`);
      element.style.setProperty("--slash-dash", `${size * 2}px`);
      element.style.setProperty("--slash-stroke", `${size * 0.018}px`);
      svg.querySelectorAll("text").forEach((text) => {
        text.setAttribute("y", String(baseline));
        text.style.font = style.font;
        text.style.letterSpacing = style.letterSpacing;
      });
      element.dataset.strokeReady = "true";
    };
    measure();
    void document.fonts.ready.then(measure);
    const resize = new ResizeObserver(measure);
    resize.observe(element);
    const intersection = new IntersectionObserver(([entry]) => {
      element.dataset.inView = String(entry.isIntersecting);
    });
    intersection.observe(element);
    const visibility = () => {
      element.dataset.documentVisible = String(!document.hidden);
    };
    visibility();
    document.addEventListener("visibilitychange", visibility);
    return () => {
      disposed = true;
      resize.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  const label = reduced
    ? "Slash animation disabled by reduced-motion preference"
    : paused
      ? "Resume slash animation"
      : "Pause slash animation";
  return (
    <button
      type="button"
      className="brand-slash hero-separator hero-slash-control"
      ref={root}
      aria-label={label}
      title={label}
      aria-pressed={paused}
      disabled={reduced}
      data-paused={paused}
      onClick={() => setPaused((current) => !current)}
    >
      <span className="hero-slash-glyph" aria-hidden="true">
        /
      </span>
      <svg
        className="hero-slash-svg"
        aria-hidden="true"
        focusable="false"
        preserveAspectRatio="none"
      >
        <text className="hero-slash-outline" x="0" y="0">
          /
        </text>
        <text className="hero-slash-fill" x="0" y="0">
          /
        </text>
      </svg>
    </button>
  );
}
