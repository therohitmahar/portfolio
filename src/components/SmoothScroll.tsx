"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Native document scrolling keeps sticky positioning and Next's scroll restoration.
export default function SmoothScroll() {
  const pathname = usePathname();
  useEffect(() => {
    const desktopMotion = matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let lenis: Lenis | undefined;
    // Stop wheel inertia before native anchor/focus scrolling takes over.
    const settle = () => lenis?.scrollTo(window.scrollY, { immediate: true });
    const onAnchor = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>(
        "a[href]",
      );
      if (!link) return;
      const target = new URL(link.href);
      if (
        target.origin === location.origin &&
        target.pathname === location.pathname &&
        target.hash
      )
        settle();
    };
    const onKey = (event: KeyboardEvent) => {
      if (
        [
          "ArrowUp",
          "ArrowDown",
          "PageUp",
          "PageDown",
          "Home",
          "End",
          " ",
          "Tab",
        ].includes(event.key)
      )
        settle();
    };
    function sync() {
      lenis?.destroy();
      lenis = undefined;
      if (!desktopMotion.matches) return;
      lenis = new Lenis({
        autoRaf: true,
        lerp: 0.16,
        syncTouch: false,
        stopInertiaOnNavigate: true,
        // Preserve native hash history, focus, and CSS scroll-margin for anchors.
        anchors: false,
        prevent: (node) => node.matches("pre, textarea, [data-lenis-prevent]"),
      });
    }
    sync();
    document.addEventListener("click", onAnchor, true);
    document.addEventListener("keydown", onKey, true);
    desktopMotion.addEventListener("change", sync);
    return () => {
      document.removeEventListener("click", onAnchor, true);
      document.removeEventListener("keydown", onKey, true);
      desktopMotion.removeEventListener("change", sync);
      lenis?.destroy();
    };
  }, [pathname]);
  return null;
}
