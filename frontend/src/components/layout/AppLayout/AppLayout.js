import React from "react";
import { Link } from "react-router-dom";
import styles from "./AppLayout.module.css";
import { THEMES, useTheme } from "../../../app/theme/ThemeProvider";

/**
 * AppLayout provides the persistent frame for the SPA:
 * header + navigation + main content + footer.
 */

// PUBLIC_INTERFACE
export function AppLayout({ children }) {
  /** Wraps route content with a shared header/footer layout. */
  const { theme, setTheme, cycleTheme } = useTheme();

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.logoMark} aria-hidden="true">
            ▣
          </span>
          <span className={styles.brandText}>Retro SPA</span>
        </div>

        <nav className={styles.nav} aria-label="Primary navigation">
          <Link className={styles.navLink} to="/">
            Home
          </Link>
        </nav>

        <div className={styles.headerTools} aria-label="Theme controls">
          <label className={styles.themeLabel} htmlFor="theme-select">
            Theme
          </label>
          <select
            id="theme-select"
            className={styles.themeSelect}
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            {THEMES.map((t) => (
              <option value={t} key={t}>
                {t}
              </option>
            ))}
          </select>
          <button type="button" className={styles.themeCycle} onClick={cycleTheme}>
            Cycle
          </button>
        </div>
      </header>

      <main className={styles.main} role="main">
        <div className={styles.container}>{children}</div>
      </main>

      <footer className={styles.footer}>
        <span className={styles.footerText}>
          Built with React • App Shell + Routing Ready • Theme:{" "}
          <span className={styles.themePill}>{theme}</span>
        </span>
      </footer>
    </div>
  );
}
