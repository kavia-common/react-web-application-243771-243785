import React from "react";
import { Link } from "react-router-dom";
import styles from "./AboutPage.module.css";

// PUBLIC_INTERFACE
export function AboutPage() {
  /** About page describing the retro SPA scaffold and design system. */
  return (
    <section className={styles.wrap}>
      <header className={styles.header}>
        <h1 className={styles.title}>About</h1>
        <p className={styles.subtitle}>
          This is a small retro-themed SPA scaffold: persistent layout chrome,
          client-side routing, and a theme system powered by CSS variables.
        </p>
      </header>

      <div className={styles.grid}>
        <article className={styles.card}>
          <h2 className={styles.cardTitle}>Structure</h2>
          <ul className={styles.list}>
            <li>
              <span className={styles.k}>AppShell</span> renders stable layout +
              routes
            </li>
            <li>
              <span className={styles.k}>AppRoutes</span> is the central route
              table
            </li>
            <li>
              <span className={styles.k}>ThemeProvider</span> persists theme to{" "}
              <code>localStorage</code>
            </li>
          </ul>
        </article>

        <article className={styles.card}>
          <h2 className={styles.cardTitle}>Retro Styling</h2>
          <p className={styles.body}>
            The UI uses a “CRT-ish” grid/scanline overlay, token-driven color
            palettes, and chunky borders—no UI framework required.
          </p>
          <p className={styles.body}>
            Try switching themes in the header to see the tokens update across
            the whole app.
          </p>
        </article>

        <article className={styles.card}>
          <h2 className={styles.cardTitle}>Next</h2>
          <p className={styles.body}>
            The new pages are here to demonstrate navigation and layout
            consistency.
          </p>
          <div className={styles.actions}>
            <Link className={styles.cta} to="/playground">
              Open Playground
            </Link>
            <Link className={styles.secondary} to="/settings">
              Go to Settings
            </Link>
          </div>
        </article>
      </div>

      <footer className={styles.footerNote}>
        Tip: Use the keyboard—focus rings are styled for accessibility.
      </footer>
    </section>
  );
}
