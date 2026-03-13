import React from "react";
import { AppLayout } from "../components/layout/AppLayout/AppLayout";
import { AppRoutes } from "./routes/AppRoutes";

/**
 * AppShell is the top-level UI frame (layout chrome) of the application.
 * It should remain stable while pages/routes change within it.
 */

// PUBLIC_INTERFACE
export function AppShell() {
  /** Renders the app's persistent layout and the route content inside it. */
  return (
    <AppLayout>
      <AppRoutes />
    </AppLayout>
  );
}
