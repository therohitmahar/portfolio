"use client";

import { useEffect, useRef, useState } from "react";
import ArrowIcon from "./ArrowIcon";

// A small, explicit equivalent-styles demo inspired by React Bits Pixel Transition.
export default function PixelwindExample() {
  const [utility, setUtility] = useState(false);
  const pixels = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const animations = useRef<Animation[]>([]);
  const [busy, setBusy] = useState(false);
  const finish = useRef<(() => void) | null>(null);
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const stop = () => {
      if (!preference.matches) return;
      clearTimeout(timer.current);
      finish.current?.();
      animations.current.forEach((animation) => animation.cancel());
    };
    preference.addEventListener("change", stop);
    return () => {
      preference.removeEventListener("change", stop);
      clearTimeout(timer.current);
      finish.current = null;
      animations.current.forEach((animation) => animation.cancel());
    };
  }, []);

  function toggle() {
    if (busy) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setUtility(!utility);
      return;
    }
    setBusy(true);
    finish.current = () => {
      setUtility(!utility);
      setBusy(false);
      finish.current = null;
    };
    animations.current = Array.from(
      pixels.current?.children ?? [],
      (pixel, index) =>
        pixel.animate(
          [
            { opacity: 0, offset: 0 },
            { opacity: 1, offset: 0.3 },
            { opacity: 1, offset: 0.65 },
            { opacity: 0, offset: 1 },
          ],
          { duration: 320, delay: (index % 8) * 5, easing: "ease-out" },
        ),
    );
    timer.current = setTimeout(() => {
      setUtility(!utility);
    }, 150);
    void Promise.all(
      animations.current.map((animation) => animation.finished.catch(() => {})),
    ).then(() => finish.current?.());
  }

  return (
    <figure className="tool-artwork artwork-pixelwind pixelwind-example">
      <div className="artwork-label">The same 13px padding, two ways</div>
      <div className="pixelwind-code">
        <pre
          tabIndex={0}
          aria-label={
            utility ? "Pixelwind utility example" : "Inline style example"
          }
        >
          <code>
            {utility
              ? '<div className="p-13px">\n  Reading list\n</div>'
              : '<div style={{ padding: "13px" }}>\n  Reading list\n</div>'}
          </code>
        </pre>
        <div className="pixelwind-pixels" ref={pixels} aria-hidden="true">
          {Array.from({ length: 32 }, (_, index) => (
            <span key={index} />
          ))}
        </div>
      </div>
      <button
        type="button"
        className="button-secondary"
        onClick={toggle}
        aria-pressed={utility}
        aria-disabled={busy}
      >
        {utility ? "Show inline style" : "Show utility class"}{" "}
        <ArrowIcon direction="right" />
      </button>
      <p className="pixelwind-status" role="status">
        {utility
          ? "Pixelwind class · padding: 13px"
          : "Inline style · padding: 13px"}
      </p>
      <figcaption>
        Illustrated equivalent styles · this example does not run a code
        conversion.
      </figcaption>
    </figure>
  );
}
