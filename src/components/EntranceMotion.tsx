"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

const ease = "cubic-bezier(.23,1,.32,1)";

// React Bits-inspired entrances, scoped to existing semantic server markup.
// Content is visible before JS and never depends on an observer to become readable.
export default function EntranceMotion() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;
    const animations: Animation[] = [];
    const animate = (
      element: Element | null,
      frames: Keyframe[],
      duration: number,
      delay = 0,
    ) => {
      if (!element) return;
      const animation = element.animate(frames, {
        duration,
        delay,
        easing: ease,
        fill: "backwards",
      });
      animations.push(animation);
      return animation;
    };
    let revealHero = true;
    try {
      revealHero = !sessionStorage.getItem("portfolio-hero-entered");
    } catch {
      /* Session storage is optional. */
    }
    if (revealHero) {
      animate(
        document.querySelector(".hero-name"),
        [
          {
            transform: "translateY(6px)",
            opacity: 0.65,
            clipPath: "inset(0 0 18% 0)",
          },
          { transform: "translateY(0)", opacity: 1, clipPath: "inset(0)" },
        ],
        360,
      );
      animate(
        document.querySelector(".hero-role"),
        [
          {
            transform: "translateY(8px)",
            opacity: 0.65,
            clipPath: "inset(0 0 22% 0)",
          },
          { transform: "translateY(0)", opacity: 1, clipPath: "inset(0)" },
        ],
        420,
        50,
      );
      const heroEnd = animate(
        document.querySelector(".hero-separator"),
        [
          {
            transform: "translateY(4px) rotate(-8deg)",
            opacity: 0.4,
            clipPath: "inset(85% 0 0 0)",
          },
          {
            transform: "translateY(0) rotate(0deg)",
            opacity: 1,
            clipPath: "inset(0)",
          },
        ],
        440,
        60,
      );
      // Mark completion rather than mount, so Strict Mode's setup/cleanup can replay safely.
      void heroEnd?.finished
        .then(() => {
          try {
            sessionStorage.setItem("portfolio-hero-entered", "true");
          } catch {
            /* Storage is optional. */
          }
        })
        .catch(() => {});
    }
    animate(
      document.querySelector(".page-intro .heading-slash"),
      [
        {
          transform: "translateY(3px) rotate(-7deg)",
          opacity: 0.45,
          clipPath: "inset(65% 0 0 0)",
        },
        {
          transform: "translateY(0) rotate(0deg)",
          opacity: 1,
          clipPath: "inset(0)",
        },
      ],
      380,
      40,
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          const distance = innerWidth <= 650 ? 8 : 14;
          animate(
            entry.target,
            [
              { transform: `translateY(${distance}px)`, opacity: 0.72 },
              { transform: "translateY(0)", opacity: 1 },
            ],
            360,
          );
        }
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((section) => observer.observe(section));
    const stop = () => {
      if (!preference.matches) return;
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
    };
    preference.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", stop);
      animations.forEach((animation) => animation.cancel());
    };
  }, [pathname]);

  useLayoutEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;
    const paths = document.querySelectorAll(".brand-logo path");
    const animations = Array.from(paths, (path, index) =>
      path.animate(
        [
          { opacity: 0.5, transform: `translateX(${index ? 18 : -18}px)` },
          { opacity: 1, transform: "translateX(0)" },
        ],
        { duration: 380, delay: index * 45, easing: ease, fill: "backwards" },
      ),
    );
    const stop = () => {
      if (preference.matches)
        animations.forEach((animation) => animation.cancel());
    };
    preference.addEventListener("change", stop);
    return () => {
      preference.removeEventListener("change", stop);
      animations.forEach((animation) => animation.cancel());
    };
  }, []);
  return null;
}
