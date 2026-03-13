import React from "react";
import { AppProviders } from "./app/providers/AppProviders";
import { AppShell } from "./app/AppShell";
import "./styles/globals.css";

// PUBLIC_INTERFACE
function App() {
  /** Root component that composes global providers and the app shell. */
  return (
    <AppProviders>
      <AppShell />
    </AppProviders>
  );
}

export default App;
