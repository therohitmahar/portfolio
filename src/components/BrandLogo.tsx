"use client";
import { useLayoutEffect, useRef } from "react";

export default function BrandLogo() {
  const mark = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    const element = mark.current;
    if (!element) return;
    const name = element.querySelector<HTMLElement>(".brand-wordmark");
    const lastName = element.querySelector<HTMLElement>(".brand-last-word");
    if (!name || !lastName) return;
    const measure = () => {
      element.style.setProperty("--wordmark-width", `${name.offsetWidth}px`);
      // SVG transform units follow its 920-unit viewBox, not the rendered 44px width.
      element.style.setProperty(
        "--monogram-m-shift",
        `${(lastName.offsetLeft - 20) * (920 / 44)}px`,
      );
      element.dataset.wordmarkReady = "true";
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(name);
    return () => observer.disconnect();
  }, []);
  return (
    <span className="brand-logo" ref={mark} aria-hidden="true">
      <svg
        className="brand-monogram"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 920 560"
        width="44"
        height="27"
        aria-hidden="true"
        focusable="false"
      >
        <path
          className="monogram-r"
          fill="var(--brand-slash)"
          d="M20 540V40H138V117C186 55 254 24 330 24C367 24 389 32 401 48C415 67 418 91 410 112C402 135 385 149 361 149C343 149 323 144 301 144C211 144 138 203 138 290V540Z"
        />
        <path
          className="monogram-m"
          fill="var(--ink)"
          d="M424 32C466 48 495 76 516 109C563 51 620 20 694 20C814 20 900 108 900 243V540H782V266C782 182 743 139 679 139C611 139 558 189 558 272V540H440V269C440 217 426 187 397 164C430 152 444 122 443 93C442 69 435 49 424 32Z"
        />
      </svg>
      <span className="brand-wordmark">
        <span className="brand-first-word">
          <span className="brand-initial">r</span>
          <span className="brand-tail">ohit</span>
        </span>{" "}
        <span className="brand-last-word">
          <span className="brand-initial">m</span>
          <span className="brand-tail">ahar</span>
        </span>
      </span>
    </span>
  );
}
