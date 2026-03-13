import React from "react";
import styles from "./HomePage.module.css";

// PUBLIC_INTERFACE
export function HomePage() {
  /** Landing page for the application. */
  return (
    <section className={styles.wrap}>
      <h1 className={styles.title}>Retro React SPA</h1>
      <p className={styles.subtitle}>
        App shell + routing are now in place. Next steps can add theme providers,
        feature pages, services, and reusable UI components.
      </p>

      <div className={styles.panel} role="note" aria-label="Status panel">
        <div className={styles.row}>
          <span className={styles.label}>Status</span>
          <span className={styles.value}>Scaffolded</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Routing</span>
          <span className={styles.value}>Enabled</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Providers</span>
          <span className={styles.value}>Ready</span>
        </div>
      </div>
    </section>
  );
}
