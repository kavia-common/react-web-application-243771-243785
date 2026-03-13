import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "../theme/ThemeProvider";

/**
 * AppProviders composes cross-cutting providers (routing, theme, query, auth, etc.)
 * in a single place, keeping the entry point and AppShell clean.
 */

// PUBLIC_INTERFACE
export function AppProviders({ children }) {
  /** Wrap the app with shared providers. Extend this file as providers are added. */
  return (
    <ThemeProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </ThemeProvider>
  );
}
