import type { CSSProperties } from "react";
import glyphs from "@/data/brand-glyphs.json";

// The supplied initials remain the same paths throughout the expansion.
// Only the m moves; the remaining letters share the initials' geometry.
export default function BrandLogo() {
  const scale = glyphs.displayWidth / glyphs.compactWidth;
  const variables = {
    "--wordmark-width": `${glyphs.expandedWidth * scale}px`,
    "--logo-svg-height": `${glyphs.height * scale}px`,
    "--logo-svg-origin": `${(280 - glyphs.minY) * scale}px`,
    "--monogram-m-shift": `${glyphs.mShift}px`,
  } as CSSProperties;
  const letters = (tail: typeof glyphs.firstTail, startDelay: number) =>
    tail.map((letter, index) => (
      <g
        key={`${letter.glyph}-${letter.x}`}
        transform={`translate(${letter.x} 0)`}
      >
        <path
          className="brand-letter"
          d={glyphs.paths[letter.glyph as keyof typeof glyphs.paths]}
          style={
            {
              "--letter-delay": `${startDelay + index * 35}ms`,
            } as CSSProperties
          }
        />
      </g>
    ));
  return (
    <span className="brand-logo" style={variables} aria-hidden="true">
      <svg
        className="brand-monogram"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 ${glyphs.minY} ${glyphs.expandedWidth} ${glyphs.height}`}
        width={glyphs.expandedWidth * scale}
        height={glyphs.height * scale}
        aria-hidden="true"
        focusable="false"
        fillRule="evenodd"
      >
        <g fill="var(--brand-slash)">
          <path className="monogram-r" d={glyphs.paths.r} />
          {letters(glyphs.firstTail, 60)}
        </g>
        <g fill="var(--ink)">
          <path className="monogram-m" d={glyphs.paths.m} />
          {letters(glyphs.lastTail, 130)}
        </g>
      </svg>
    </span>
  );
}
