// import { describe, it, expect } from "vitest";
// import { render, screen } from "@testing-library/react";
// import Card from "../components/Card";

// const mockPokemon = {
//   name: "bulbasaur",
//   id: 1,
//   description: "Type: grass, poison. Base experience: 64.",
//   sprites: { front_default: "https://example.com/bulbasaur.png" },
// };

// describe("Card", () => {
//   it("renders pokemon name", () => {
//     render(<Card pokemon={mockPokemon} />);
//     expect(screen.getByText("bulbasaur")).toBeInTheDocument();
//   });

//   it("renders pokemon description", () => {
//     render(<Card pokemon={mockPokemon} />);
//     expect(
//       screen.getByText("Type: grass, poison. Base experience: 64.")
//     ).toBeInTheDocument();
//   });

//   it("renders pokemon image with correct alt text", () => {
//     render(<Card pokemon={mockPokemon} />);
//     const img = screen.getByAltText("bulbasaur");
//     expect(img).toBeInTheDocument();
//     expect(img).toHaveAttribute("src", "https://example.com/bulbasaur.png");
//   });
// });

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Card from "../components/Card";
import useSelectedStore from "../store/selectedStore";

const mockPokemon = {
  name: "bulbasaur",
  id: 1,
  description: "Type: grass, poison. Base experience: 64.",
  sprites: { front_default: "https://example.com/bulbasaur.png" },
};

beforeEach(() => {
  useSelectedStore.setState({ selectedItems: [] });
});

describe("Card", () => {
  it("renders pokemon name", () => {
    render(<Card pokemon={mockPokemon} onClick={vi.fn()} />);
    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
  });

  it("renders pokemon description", () => {
    render(<Card pokemon={mockPokemon} onClick={vi.fn()} />);
    expect(screen.getByText("Type: grass, poison. Base experience: 64.")).toBeInTheDocument();
  });

  it("renders pokemon image with correct alt text", () => {
    render(<Card pokemon={mockPokemon} onClick={vi.fn()} />);
    const img = screen.getByAltText("bulbasaur");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/bulbasaur.png");
  });

  it("renders checkbox", () => {
    render(<Card pokemon={mockPokemon} onClick={vi.fn()} />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("calls onClick when card is clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Card pokemon={mockPokemon} onClick={onClick} />);
    await user.click(screen.getByText("bulbasaur"));
    expect(onClick).toHaveBeenCalledWith(1);
  });

  it("toggles selection when checkbox is clicked", async () => {
    const user = userEvent.setup();
    render(<Card pokemon={mockPokemon} onClick={vi.fn()} />);
    await user.click(screen.getByRole("checkbox"));
    expect(useSelectedStore.getState().selectedItems).toHaveLength(1);
  });

  it("shows checked checkbox when item is selected", () => {
    useSelectedStore.setState({ selectedItems: [mockPokemon] });
    render(<Card pokemon={mockPokemon} onClick={vi.fn()} />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });
});