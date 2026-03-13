import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders home page title", () => {
  render(<App />);
  const title = screen.getByRole("heading", { name: /retro react spa/i });
  expect(title).toBeInTheDocument();
});
