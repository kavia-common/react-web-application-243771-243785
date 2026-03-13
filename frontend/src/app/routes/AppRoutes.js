import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { HomePage } from "../../pages/HomePage/HomePage";
import { AboutPage } from "../../pages/AboutPage/AboutPage";
import { PlaygroundPage } from "../../pages/PlaygroundPage/PlaygroundPage";
import { SettingsPage } from "../../pages/SettingsPage/SettingsPage";
import { NotFoundPage } from "../../pages/NotFoundPage/NotFoundPage";

/**
 * Central route table for the SPA.
 * Keep routing logic out of the layout/shell where possible.
 */

// PUBLIC_INTERFACE
export function AppRoutes() {
  /** Defines the application's route tree. */
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/playground" element={<PlaygroundPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
