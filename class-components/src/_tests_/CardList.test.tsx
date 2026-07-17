import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CardList from "../components/CardList";

const mockPokemons = [
  {
    name: "bulbasaur",
    id: 1,
    description: "Type: grass, poison. Base experience: 64.",
    sprites: { front_default: "https://example.com/bulbasaur.png" },
  },
  {
    name: "charmander",
    id: 4,
    description: "Type: fire. Base experience: 62.",
    sprites: { front_default: "https://example.com/charmander.png" },
  },
];

describe("CardList", () => {
  it("renders correct number of cards", () => {
    render(<CardList pokemons={mockPokemons} />);
    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("charmander")).toBeInTheDocument();
  });

  it("renders no results message when array is empty", () => {
    render(<CardList pokemons={[]} />);
    expect(screen.getByText("No results found.")).toBeInTheDocument();
  });

  it("renders all pokemon names", () => {
    render(<CardList pokemons={mockPokemons} />);
    const names = screen.getAllByRole("heading");
    expect(names).toHaveLength(2);
  });
});