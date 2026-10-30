"use client";

import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";

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
        <Moon aria-hidden="true" focusable="false" strokeWidth={1.5} />
        <span>
          Dark<span className="visually-hidden"> theme</span>
        </span>
      </span>
      <span className="show-in-dark">
        <Sun aria-hidden="true" focusable="false" strokeWidth={1.5} />
        <span>
          Light<span className="visually-hidden"> theme</span>
        </span>
      </span>
    </button>
  );
}
