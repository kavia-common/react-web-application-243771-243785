import { render, screen } from "@testing-library/react";
import React from "react";
import { AppProviders } from "./AppProviders";

function Child() {
  return <div>providers-ok</div>;
}

test("AppProviders renders children", () => {
  render(
    <AppProviders>
      <Child />
    </AppProviders>
  );

  expect(screen.getByText("providers-ok")).toBeInTheDocument();
});
