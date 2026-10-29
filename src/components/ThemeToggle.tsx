"use client";

import { useEffect } from "react";

const storageKey = "portfolio-color-scheme";

function setScheme(value: string | null) {
  const meta = document.querySelector<HTMLMetaElement>(
    'meta[name="color-scheme"]',
  );
  if (meta)
    meta.content = value === "light" || value === "dark" ? value : "light dark";
}

export default function ThemeToggle() {
  useEffect(() => {
    function syncPreference(event: StorageEvent) {
      if (event.key === storageKey || event.key === null)
        setScheme(event.newValue);
    }
    window.addEventListener("storage", syncPreference);
    return () => window.removeEventListener("storage", syncPreference);
  }, []);

  function toggle() {
    const override = document.querySelector<HTMLMetaElement>(
      'meta[name="color-scheme"]',
    )?.content;
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const currentlyDark =
      override === "dark" || (override !== "light" && systemDark);
    const next = currentlyDark ? "light" : "dark";
    // Returning to the system's current scheme restores automatic appearance.
    const preference = (next === "dark") === systemDark ? null : next;
    setScheme(preference);
    try {
      if (preference) localStorage.setItem(storageKey, preference);
      else localStorage.removeItem(storageKey);
    } catch {
      // The current tab still works when browser storage is unavailable.
    }
  }

  return (
    <button className="theme-toggle" onClick={toggle} type="button">
      <span className="show-in-light">
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M20.5 14.1A8.5 8.5 0 0 1 9.9 3.5a8.5 8.5 0 1 0 10.6 10.6Z" />
        </svg>
        <span>
          Dark<span className="visually-hidden"> theme</span>
        </span>
      </span>
      <span className="show-in-dark">
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4 19 5" />
        </svg>
        <span>
          Light<span className="visually-hidden"> theme</span>
        </span>
      </span>
    </button>
  );
}
