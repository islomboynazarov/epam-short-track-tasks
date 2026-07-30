import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";

describe("NotFoundPage", () => {
  it("renders 404 message", () => {
    render(<MemoryRouter><NotFoundPage /></MemoryRouter>);
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("renders page not found text", () => {
    render(<MemoryRouter><NotFoundPage /></MemoryRouter>);
    expect(screen.getByText("Page not found.")).toBeInTheDocument();
  });

  it("renders link to home", () => {
    render(<MemoryRouter><NotFoundPage /></MemoryRouter>);
    expect(screen.getByText("Go back to home")).toBeInTheDocument();
  });
});