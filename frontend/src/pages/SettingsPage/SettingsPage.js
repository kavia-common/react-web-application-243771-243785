import React, { useMemo, useState } from "react";
import styles from "./SettingsPage.module.css";

/**
 * Read a few env variables to demonstrate env-driven configuration.
 * CRA injects env vars at build time; these are safe to read in the browser.
 */
function getEnvSnapshot() {
  return {
    REACT_APP_NODE_ENV: process.env.REACT_APP_NODE_ENV,
    REACT_APP_API_BASE: process.env.REACT_APP_API_BASE,
    REACT_APP_BACKEND_URL: process.env.REACT_APP_BACKEND_URL,
    REACT_APP_WS_URL: process.env.REACT_APP_WS_URL
  };
}

// PUBLIC_INTERFACE
export function SettingsPage() {
  /** Settings page (demo) for toggles and env snapshot. */
  const [reduceMotion, setReduceMotion] = useState(false);
  const [denseMode, setDenseMode] = useState(false);

  const env = useMemo(() => getEnvSnapshot(), []);

  return (
    <section className={styles.wrap}>
      <header className={styles.header}>
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.subtitle}>
          These are demo settings to show typical “app page” layout and
          configuration surfacing. They do not persist yet.
        </p>
      </header>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Preferences</h2>

          <label className={styles.toggle}>
            <input
              type="checkbox"
              checked={reduceMotion}
              onChange={(e) => setReduceMotion(e.target.checked)}
            />
            <span className={styles.toggleText}>
              Reduce motion <span className={styles.hint}>(demo)</span>
            </span>
          </label>

          <label className={styles.toggle}>
            <input
              type="checkbox"
              checked={denseMode}
              onChange={(e) => setDenseMode(e.target.checked)}
            />
            <span className={styles.toggleText}>
              Dense mode <span className={styles.hint}>(demo)</span>
            </span>
          </label>

          <div className={styles.preview} aria-label="Preview">
            <div className={styles.previewRow}>
              <span className={styles.previewKey}>reduceMotion</span>
              <span className={styles.previewVal}>
                {reduceMotion ? "true" : "false"}
              </span>
            </div>
            <div className={styles.previewRow}>
              <span className={styles.previewKey}>denseMode</span>
              <span className={styles.previewVal}>{denseMode ? "true" : "false"}</span>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Environment snapshot</h2>
          <p className={styles.body}>
            Build-time values (from <code>.env</code>) used by services/config.
          </p>

          <div className={styles.kv} role="table" aria-label="Env variables">
            {Object.entries(env).map(([k, v]) => (
              <div className={styles.kvRow} role="row" key={k}>
                <div className={styles.kvKey} role="cell">
                  {k}
                </div>
                <div className={styles.kvVal} role="cell">
                  {v ? String(v) : "—"}
                </div>
              </div>
            ))}
          </div>

          <p className={styles.foot}>
            Note: these values are safe to display only if they are intended to
            be public configuration.
          </p>
        </div>
      </div>
    </section>
  );
}
