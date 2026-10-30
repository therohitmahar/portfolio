import { useId, type CSSProperties } from "react";
import glyphs from "@/data/brand-glyphs.json";

type Glyph = keyof typeof glyphs.paths;
// A small inset lets the incoming edge pass behind the preceding ink and keeps
// its antialiasing clear of the curtain when the tighter r/o pair is fully open.
const tuckEdge = (glyph: Glyph) => glyphs.rightEdges[glyph] - 12;

export default function BrandLogo() {
  const id = `wordmark-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const scale = glyphs.displayWidth / glyphs.compactWidth;
  const variables = {
    "--wordmark-width": `${glyphs.expandedWidth * scale}px`,
    "--logo-svg-height": `${glyphs.height * scale}px`,
    "--logo-svg-origin": `${(280 - glyphs.minY) * scale}px`,
    "--monogram-m-shift": `${glyphs.mShift}px`,
  } as CSSProperties;
  const clips = [
    { word: "rohit", root: "r" as Glyph, tail: glyphs.firstTail },
    { word: "mahar", root: "m" as Glyph, tail: glyphs.lastTail },
  ];

  // Each following letter lives inside its predecessor's coordinate system.
  // The fixed clip is a curtain at that predecessor's right edge, not a fade.
  function chain(
    word: string,
    tail: typeof glyphs.firstTail,
    parent: Glyph,
    parentX: number,
    index = 0,
  ): React.ReactNode {
    const letter = tail[index];
    if (!letter) return null;
    const glyph = letter.glyph as Glyph;
    const edge = tuckEdge(parent);
    const position = {
      "--letter-open-x": `${letter.x - parentX}px`,
      "--letter-closed-x": `${edge - glyphs.rightEdges[glyph] - 2}px`,
      "--letter-open-delay": `${160 + index * 110}ms`,
      "--letter-close-delay": `${(tail.length - 1 - index) * 110}ms`,
    } as CSSProperties;
    return (
      <g clipPath={`url(#${id}-${word}-${index})`}>
        <g className="brand-letter-step" style={position}>
          {chain(word, tail, glyph, letter.x, index + 1)}
          <path d={glyphs.paths[glyph]} />
        </g>
      </g>
    );
  }

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
        <defs>
          {clips.flatMap(({ word, root, tail }) =>
            tail.map((_, index) => {
              const parent =
                index === 0 ? root : (tail[index - 1].glyph as Glyph);
              return (
                <clipPath
                  id={`${id}-${word}-${index}`}
                  key={`${word}-${index}`}
                  clipPathUnits="userSpaceOnUse"
                >
                  <rect
                    x={tuckEdge(parent)}
                    y={glyphs.minY - 20}
                    width={glyphs.expandedWidth}
                    height={glyphs.height + 40}
                  />
                </clipPath>
              );
            }),
          )}
        </defs>
        {/* Full m sits behind r when compact, then slides out as one rigid shape. */}
        <g className="brand-move-m" fill="var(--ink)">
          {chain("mahar", glyphs.lastTail, "m", glyphs.mShift)}
          <path className="monogram-m" d={glyphs.paths.m} />
        </g>
        <g fill="var(--brand-slash)">
          {chain("rohit", glyphs.firstTail, "r", 0)}
          <path className="monogram-r" d={glyphs.paths.r} />
        </g>
      </svg>
    </span>
  );
}
