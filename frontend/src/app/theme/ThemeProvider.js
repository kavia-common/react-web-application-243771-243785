import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "retro-theme";

/**
 * Supported theme IDs. These map to `[data-theme="<id>"]` selectors in globals.css.
 * Keep this list in sync with CSS.
 */
export const THEMES = /** @type {const} */ (["light-retro", "dark-retro", "amber-crt"]);

/**
 * @typedef {typeof THEMES[number]} ThemeId
 */

/**
 * @typedef ThemeContextValue
 * @property {ThemeId} theme
 * @property {(nextTheme: ThemeId) => void} setTheme
 * @property {() => void} cycleTheme
 */

const ThemeContext = createContext(
  /** @type {ThemeContextValue | null} */ (null)
);

function isThemeId(value) {
  return typeof value === "string" && THEMES.includes(value);
}

function getInitialTheme() {
  if (typeof window === "undefined") return "light-retro";

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isThemeId(stored)) return stored;

  // Respect OS preference only when no persisted theme exists.
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  return prefersDark ? "dark-retro" : "light-retro";
}

function applyThemeToDocument(theme) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", theme);
}

/**
 * ThemeProvider keeps theme state in React, applies it to the document element,
 * and persists it to localStorage.
 */

// PUBLIC_INTERFACE
export function ThemeProvider({ children }) {
  /** Provides theme state and actions with persistence via localStorage. */
  const [theme, setThemeState] = useState(getInitialTheme);

  useEffect(() => {
    applyThemeToDocument(theme);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, theme);
    }
  }, [theme]);

  const value = useMemo(() => {
    /** @type {(nextTheme: ThemeId) => void} */
    const setTheme = (nextTheme) => {
      if (!isThemeId(nextTheme)) return;
      setThemeState(nextTheme);
    };

    const cycleTheme = () => {
      const idx = THEMES.indexOf(theme);
      const next = THEMES[(idx + 1) % THEMES.length];
      setThemeState(next);
    };

    return { theme, setTheme, cycleTheme };
  }, [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * useTheme provides access to the current theme and helpers.
 */

// PUBLIC_INTERFACE
export function useTheme() {
  /** Access theme state/actions. Must be used under ThemeProvider. */
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
