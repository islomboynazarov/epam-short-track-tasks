import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutPage from "../pages/AboutPage";

describe("AboutPage", () => {
  it("renders about heading", () => {
    render(<AboutPage />);
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  it("renders RS School link", () => {
    render(<AboutPage />);
    expect(screen.getByText("RS School React Course")).toBeInTheDocument();
  });

  it("renders author name", () => {
    render(<AboutPage />);
    expect(screen.getByText(/Islom Boynazarov/)).toBeInTheDocument();
  });
});