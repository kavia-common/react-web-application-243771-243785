import React from "react";
import { BrowserRouter } from "react-router-dom";

/**
 * AppProviders composes cross-cutting providers (routing, theme, query, auth, etc.)
 * in a single place, keeping the entry point and AppShell clean.
 */

// PUBLIC_INTERFACE
export function AppProviders({ children }) {
  /** Wrap the app with shared providers. Extend this file as providers are added. */
  return <BrowserRouter>{children}</BrowserRouter>;
}
