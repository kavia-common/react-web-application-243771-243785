import React, { useEffect, useId, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./AppLayout.module.css";
import { THEMES, useTheme } from "../../../app/theme/ThemeProvider";

/**
 * AppLayout provides the persistent frame for the SPA:
 * header + navigation + main content + footer.
 */

// PUBLIC_INTERFACE
export function AppLayout({ children }) {
  /** Wraps route content with a shared header/nav/main/footer layout. */
  const { theme, setTheme, cycleTheme } = useTheme();

  // Stable IDs for aria-controls/aria-labelledby
  const navId = useId();
  const mainId = useId();

  const [isNavOpen, setIsNavOpen] = useState(false);

  // Keep nav state sensible when resizing (if a user opens it on mobile, then goes desktop).
  useEffect(() => {
    const onResize = () => {
      // At >= 720px, the CSS shows the nav in-row; treat it as open to avoid a hidden-but-open aria state.
      if (window.innerWidth >= 720) setIsNavOpen(false);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const navItems = useMemo(
    () => [
      { to: "/", label: "Home" },
      { to: "/about", label: "About" },
      { to: "/playground", label: "Playground" },
      { to: "/settings", label: "Settings" }
    ],
    []
  );

  const closeNav = () => setIsNavOpen(false);

  return (
    <div className={styles.app}>
      {/* Skip link for keyboard users */}
      <a className={styles.skipLink} href={`#${mainId}`}>
        Skip to content
      </a>

      <header className={styles.header} role="banner">
        <div className={styles.headerInner}>
          <div className={styles.brand}>
            <span className={styles.logoMark} aria-hidden="true">
              ▣
            </span>
            <div className={styles.brandTextWrap}>
              <span className={styles.brandText}>Retro SPA</span>
              <span className={styles.brandTagline}>Token-themed • Router-ready</span>
            </div>
          </div>

          <div className={styles.headerRight}>
            <button
              type="button"
              className={styles.navToggle}
              aria-controls={navId}
              aria-expanded={isNavOpen}
              onClick={() => setIsNavOpen((v) => !v)}
            >
              <span className={styles.navToggleIcon} aria-hidden="true">
                ☰
              </span>
              <span className={styles.navToggleText}>
                {isNavOpen ? "Close" : "Menu"}
              </span>
            </button>

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
              <button
                type="button"
                className={styles.themeCycle}
                onClick={cycleTheme}
              >
                Cycle
              </button>
            </div>
          </div>
        </div>

        <nav
          id={navId}
          className={`${styles.nav} ${isNavOpen ? styles.navOpen : ""}`}
          aria-label="Primary"
        >
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.to} className={styles.navItem}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
                  }
                  onClick={closeNav}
                  end={item.to === "/"}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id={mainId} className={styles.main} role="main" tabIndex={-1}>
        <div className={styles.container}>{children}</div>
      </main>

      <footer className={styles.footer} role="contentinfo">
        <div className={styles.footerInner}>
          <div className={styles.footerLeft}>
            <div className={styles.footerTitle}>Retro React SPA</div>
            <div className={styles.footerMeta}>
              <span>Theme:</span> <span className={styles.themePill}>{theme}</span>
            </div>
          </div>

          <div className={styles.footerRight}>
            <a className={styles.footerLink} href={`#${mainId}`}>
              Back to top
            </a>
          </div>
        </div>

        <div className={styles.footerFinePrint}>
          Built with React • App Shell + Routing • Accessible scaffold
        </div>
      </footer>
    </div>
  );
}
