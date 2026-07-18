import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Card from "../components/Card";

const mockPokemon = {
  name: "bulbasaur",
  id: 1,
  description: "Type: grass, poison. Base experience: 64.",
  sprites: { front_default: "https://example.com/bulbasaur.png" },
};

describe("Card", () => {
  it("renders pokemon name", () => {
    render(<Card pokemon={mockPokemon} />);
    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
  });

  it("renders pokemon description", () => {
    render(<Card pokemon={mockPokemon} />);
    expect(
      screen.getByText("Type: grass, poison. Base experience: 64.")
    ).toBeInTheDocument();
  });

  it("renders pokemon image with correct alt text", () => {
    render(<Card pokemon={mockPokemon} />);
    const img = screen.getByAltText("bulbasaur");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/bulbasaur.png");
  });
});