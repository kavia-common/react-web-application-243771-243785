import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

// PUBLIC_INTERFACE
export function NotFoundPage() {
  /** Catch-all page for unknown routes. */
  return (
    <section className={styles.wrap}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.subtitle}>That page drifted into the void.</p>
      <Link className={styles.link} to="/">
        Go back home
      </Link>
    </section>
  );
}
