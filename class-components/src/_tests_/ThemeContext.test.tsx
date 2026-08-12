import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

function TestComponent() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span>Theme: {theme}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
}

describe("ThemeContext", () => {
  it("provides light theme by default", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByText("Theme: light")).toBeInTheDocument();
  });

  it("toggles to dark theme when button clicked", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    await user.click(screen.getByText("Toggle"));
    expect(screen.getByText("Theme: dark")).toBeInTheDocument();
  });

  it("toggles back to light theme", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    await user.click(screen.getByText("Toggle"));
    await user.click(screen.getByText("Toggle"));
    expect(screen.getByText("Theme: light")).toBeInTheDocument();
  });
});