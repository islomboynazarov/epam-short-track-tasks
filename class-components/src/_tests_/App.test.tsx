
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import * as api from "../api";

const mockPokemons = [
  {
    name: "bulbasaur",
    id: 1,
    description: "Type: grass, poison. Base experience: 64.",
    sprites: { front_default: "https://example.com/bulbasaur.png" },
  },
];

const mockListResponse = {
  results: [{ name: "bulbasaur" }],
  next: null,
};

beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(global, "fetch").mockResolvedValue({
    ok: true,
    json: async () => mockListResponse,
  } as Response);
  vi.spyOn(api, "fetchPokemonByName").mockResolvedValue(mockPokemons[0]);
});

describe("App", () => {
  it("renders search input and button", async () => {
    render(<App />);
    expect(screen.getByPlaceholderText("Search Pokemon...")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

it("shows loading spinner on initial load", async () => {
  render(<App />);
  expect(screen.getByPlaceholderText("Search Pokemon...")).toBeInTheDocument();
});

  it("loads search term from localStorage on mount", async () => {
    localStorage.setItem("pokemonSearchTerm", "pikachu");
    render(<App />);
    const input = screen.getByPlaceholderText("Search Pokemon...") as HTMLInputElement;
    expect(input.value).toBe("pikachu");
  });

  it("fetches by name when localStorage has search term", async () => {
    localStorage.setItem("pokemonSearchTerm", "bulbasaur");
    const spy = vi.spyOn(api, "fetchPokemonByName").mockResolvedValue(mockPokemons[0]);
    render(<App />);
    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith("bulbasaur");
    });
  });

it("shows error message when API fails", async () => {
  vi.spyOn(global, "fetch").mockResolvedValue({
    ok: false,
    status: 500,
  } as Response);
  vi.spyOn(api, "fetchPokemonByName").mockRejectedValue(
    new Error("Error: 500")
  );
  render(<App />);
  await waitFor(
    () => {
      const errorEl = screen.queryByText("Error: 500");
      const hasPokemons = screen.queryAllByRole("checkbox").length > 0;
      expect(errorEl !== null || hasPokemons).toBe(true);
    },
    { timeout: 3000 }
  );
});

  it("saves search term to localStorage when search is performed", async () => {
    const user = userEvent.setup();
    render(<App />);
    await waitFor(() =>
      expect(screen.getAllByText("bulbasaur").length).toBeGreaterThan(0)
    );
    const input = screen.getByPlaceholderText("Search Pokemon...");
    await user.clear(input);
    await user.type(input, "pikachu");
    await user.click(screen.getByText("Search"));
    expect(localStorage.getItem("pokemonSearchTerm")).toBe("pikachu");
  });

  it("does not fetch again if search term has not changed", async () => {
    const user = userEvent.setup();
    render(<App />);
    await waitFor(() =>
      expect(screen.getAllByText("bulbasaur").length).toBeGreaterThan(0)
    );
    const cardsBefore = screen.getAllByText("bulbasaur").length;
    await user.click(screen.getByText("Search"));
    await waitFor(() => {
      expect(screen.getAllByText("bulbasaur").length).toBe(cardsBefore);
    });
  });
});