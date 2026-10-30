"use client";
import { useId, useLayoutEffect, useRef, type CSSProperties } from "react";
import { bindWordmarkMotion, wordmarkTiming } from "@/lib/wordmark-motion";
import glyphs from "@/data/brand-glyphs.json";

type Glyph = keyof typeof glyphs.paths;
// A small inset lets the incoming edge pass behind the preceding ink and keeps
// its antialiasing clear of the curtain when the tighter r/o pair is fully open.
const tuckEdge = (glyph: Glyph) => glyphs.rightEdges[glyph] - 12;

export default function BrandLogo() {
  const mark = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    if (!mark.current) return;
    const motion = bindWordmarkMotion(mark.current);
    const finish = (event: Event) => motion?.finishIntro((event as CustomEvent<boolean>).detail);
    const open = () => motion?.startIntro();
    document.addEventListener("brand-intro-open", open);
    document.addEventListener("brand-intro-end", finish);
    return () => {
      document.removeEventListener("brand-intro-open", open);
      document.removeEventListener("brand-intro-end", finish);
      motion?.destroy();
    };
  }, []);
  const id = `wordmark-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const scale = glyphs.displayWidth / glyphs.compactWidth;
  const variables = {
    "--wordmark-width": `${glyphs.expandedWidth * scale}px`,
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
      "--letter-open-delay": `${index * wordmarkTiming.stagger}ms`,
      "--letter-close-delay": `${(tail.length - 1 - index) * wordmarkTiming.stagger}ms`,
    } as CSSProperties;
    return (
      <g clipPath={`url(#${id}-${word}-${index})`}>
        <g
          className="brand-letter-step"
          style={position}
          data-word={word}
          data-step={index}
        >
          {chain(word, tail, glyph, letter.x, index + 1)}
          <path d={glyphs.paths[glyph]} />
        </g>
      </g>
    );
  }

  return (
    <span
      className="brand-logo"
      ref={mark}
      style={variables}
      aria-hidden="true"
    >
      <svg
        className="brand-monogram"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${glyphs.compactWidth} 560`}
        width={glyphs.displayWidth}
        height={27}
        aria-hidden="true"
        focusable="false"
        fillRule="evenodd"
      >
        <defs>
          {/* Only the missing arch is occluded; the supplied visible m is drawn directly. */}
          <clipPath id={`${id}-m-occlusion`} clipPathUnits="userSpaceOnUse">
            <rect
              x={glyphs.mRevealEdge}
              y={glyphs.minY - 20}
              width={glyphs.expandedWidth}
              height={glyphs.height + 40}
            />
          </clipPath>
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
        <g fill="var(--brand-slash)">
          {chain("rohit", glyphs.firstTail, "r", 0)}
        </g>
        <g fill="var(--ink)">
          <g clipPath={`url(#${id}-m-occlusion)`}>
            <g className="brand-move-m">
              <path
                className="m-hidden-arch"
                d={glyphs.mCompletion}
                stroke="var(--ink)"
                strokeWidth={2}
              />
            </g>
          </g>
          <g className="brand-move-m">
            {chain("mahar", glyphs.lastTail, "m", glyphs.mShift)}
            <path className="monogram-m" d={glyphs.paths.m} />
          </g>
        </g>
      </svg>
      <svg
        className="brand-monogram brand-anchor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${glyphs.compactWidth} 560`}
        width={glyphs.displayWidth}
        height={27}
        aria-hidden="true"
        focusable="false"
      >
        <path
          className="monogram-r"
          fill="var(--brand-slash)"
          d={glyphs.paths.r}
        />
      </svg>
    </span>
  );
}
