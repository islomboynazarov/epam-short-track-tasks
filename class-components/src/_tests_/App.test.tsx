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

beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
  vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("App", () => {
  it("renders search input and button", async () => {
    vi.spyOn(api, "fetchAllPokemons").mockResolvedValue(mockPokemons);
    render(<App />);
    expect(screen.getByPlaceholderText("Search Pokemon...")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  it("shows loading spinner on initial load", async () => {
    vi.spyOn(api, "fetchAllPokemons").mockResolvedValue(mockPokemons);
    render(<App />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("fetches all pokemons on initial load", async () => {
    vi.spyOn(api, "fetchAllPokemons").mockResolvedValue(mockPokemons);
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    });
  });

  it("loads search term from localStorage on mount", async () => {
    localStorage.setItem("pokemonSearchTerm", "pikachu");
    vi.spyOn(api, "fetchPokemonByName").mockResolvedValue(mockPokemons[0]);
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
    vi.spyOn(api, "fetchAllPokemons").mockRejectedValue(new Error("API Error"));
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("API Error")).toBeInTheDocument();
    });
  });

  it("saves search term to localStorage when search is performed", async () => {
    const user = userEvent.setup();
    vi.spyOn(api, "fetchAllPokemons").mockResolvedValue(mockPokemons);
    vi.spyOn(api, "fetchPokemonByName").mockResolvedValue(mockPokemons[0]);
    render(<App />);
    await waitFor(() => screen.getByText("bulbasaur"));
    const input = screen.getByPlaceholderText("Search Pokemon...");
    await user.clear(input);
    await user.type(input, "pikachu");
    await user.click(screen.getByText("Search"));
    expect(localStorage.getItem("pokemonSearchTerm")).toBe("pikachu");
  });

  it("does not fetch again if search term has not changed", async () => {
    const user = userEvent.setup();
    const spy = vi.spyOn(api, "fetchAllPokemons").mockResolvedValue(mockPokemons);
    render(<App />);
    await waitFor(() => screen.getByText("bulbasaur"));
    await user.click(screen.getByText("Search"));
    expect(spy).toHaveBeenCalledTimes(1);
  });
});