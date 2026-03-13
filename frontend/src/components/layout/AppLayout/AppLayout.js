import React from "react";
import { Link } from "react-router-dom";
import styles from "./AppLayout.module.css";

/**
 * AppLayout provides the persistent frame for the SPA:
 * header + navigation + main content + footer.
 */

// PUBLIC_INTERFACE
export function AppLayout({ children }) {
  /** Wraps route content with a shared header/footer layout. */
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
      </header>

      <main className={styles.main} role="main">
        <div className={styles.container}>{children}</div>
      </main>

      <footer className={styles.footer}>
        <span className={styles.footerText}>
          Built with React • App Shell + Routing Ready
        </span>
      </footer>
    </div>
  );
}
