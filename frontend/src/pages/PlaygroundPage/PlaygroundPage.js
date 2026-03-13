import React, { useMemo, useState } from "react";
import styles from "./PlaygroundPage.module.css";

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

const PALETTES = [
  { id: "neon", label: "Neon" },
  { id: "violet", label: "Violet" },
  { id: "amber", label: "Amber" }
];

// PUBLIC_INTERFACE
export function PlaygroundPage() {
  /** Interactive page to demonstrate state, forms, and styling. */
  const [alias, setAlias] = useState("KAVIA-OP");
  const [signal, setSignal] = useState(72);
  const [palette, setPalette] = useState("neon");

  const status = useMemo(() => {
    const s = clamp(signal, 0, 100);
    if (s >= 80) return { label: "Excellent", tone: styles.toneGood };
    if (s >= 55) return { label: "Stable", tone: styles.toneOk };
    if (s >= 30) return { label: "Noisy", tone: styles.toneWarn };
    return { label: "Critical", tone: styles.toneBad };
  }, [signal]);

  const swatchStyle = useMemo(() => {
    switch (palette) {
      case "violet":
        return { "--sw1": "var(--accent-3)", "--sw2": "var(--accent-1)" };
      case "amber":
        return { "--sw1": "var(--accent-1)", "--sw2": "var(--accent-2)" };
      case "neon":
      default:
        return { "--sw1": "var(--accent-2)", "--sw2": "var(--accent-1)" };
    }
  }, [palette]);

  return (
    <section className={styles.wrap}>
      <header className={styles.header}>
        <h1 className={styles.title}>Playground</h1>
        <p className={styles.subtitle}>
          A tiny interactive console to prove routing + stateful UI patterns are
          ready for feature work.
        </p>
      </header>

      <div className={styles.grid}>
        <form
          className={styles.panel}
          onSubmit={(e) => e.preventDefault()}
          aria-label="Signal console"
        >
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>Signal Console</h2>
            <span className={`${styles.badge} ${status.tone}`}>
              {status.label}
            </span>
          </div>

          <label className={styles.label} htmlFor="alias">
            Operator alias
          </label>
          <input
            id="alias"
            className={styles.input}
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            placeholder="e.g. RETRO-7"
            maxLength={18}
          />

          <div className={styles.row}>
            <label className={styles.label} htmlFor="signal">
              Signal strength <span className={styles.mono}>{signal}</span>
            </label>
            <input
              id="signal"
              className={styles.range}
              type="range"
              min={0}
              max={100}
              value={signal}
              onChange={(e) => setSignal(Number(e.target.value))}
            />
          </div>

          <label className={styles.label} htmlFor="palette">
            Accent palette
          </label>
          <select
            id="palette"
            className={styles.select}
            value={palette}
            onChange={(e) => setPalette(e.target.value)}
          >
            {PALETTES.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>

          <div className={styles.readout} aria-label="Readout">
            <div className={styles.readoutRow}>
              <span className={styles.readoutKey}>ALIAS</span>
              <span className={styles.readoutVal}>{alias || "—"}</span>
            </div>
            <div className={styles.readoutRow}>
              <span className={styles.readoutKey}>SIGNAL</span>
              <span className={styles.readoutVal}>{signal}%</span>
            </div>
            <div className={styles.readoutRow}>
              <span className={styles.readoutKey}>PALETTE</span>
              <span className={styles.readoutVal}>{palette}</span>
            </div>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.btn}
              onClick={() => {
                setAlias("KAVIA-OP");
                setSignal(72);
                setPalette("neon");
              }}
            >
              Reset
            </button>
            <button
              type="button"
              className={styles.btnGhost}
              onClick={() => setSignal((v) => clamp(v + 5, 0, 100))}
            >
              Boost +5
            </button>
          </div>
        </form>

        <aside className={styles.panel} aria-label="Swatch panel">
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>Swatch</h2>
            <span className={styles.miniHint}>token-driven</span>
          </div>

          <div className={styles.swatch} style={swatchStyle}>
            <div className={styles.swatchBar} />
            <div className={styles.swatchBody}>
              <div className={styles.swatchLine}>
                <span className={styles.mono}>--accent-*</span>
                <span className={styles.dim}>mapped by theme</span>
              </div>
              <div className={styles.swatchLine}>
                <span className={styles.mono}>border</span>
                <span className={styles.dim}>var(--border-color)</span>
              </div>
              <div className={styles.swatchLine}>
                <span className={styles.mono}>surface</span>
                <span className={styles.dim}>var(--bg-secondary)</span>
              </div>
            </div>
          </div>

          <p className={styles.note}>
            This panel intentionally uses the same “card” primitives as other
            pages to keep the UI consistent across routes.
          </p>
        </aside>
      </div>
    </section>
  );
}
