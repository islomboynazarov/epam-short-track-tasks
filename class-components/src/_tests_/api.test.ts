import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchAllPokemons, fetchPokemonByName } from "../api";

const mockPokemonResponse = {
  name: "bulbasaur",
  id: 1,
  types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
  base_experience: 64,
  sprites: { front_default: "https://example.com/bulbasaur.png" },
};

const mockListResponse = {
  results: [{ name: "bulbasaur" }],
};

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("fetchPokemonByName", () => {
  it("returns pokemon details on success", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => mockPokemonResponse,
    } as Response);

    const result = await fetchPokemonByName("bulbasaur");
    expect(result.name).toBe("bulbasaur");
    expect(result.id).toBe(1);
    expect(result.description).toContain("grass");
  });

  it("throws error when response is not ok", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as Response);

    await expect(fetchPokemonByName("unknown")).rejects.toThrow(
      'Pokemon "unknown" not found'
    );
  });
});

describe("fetchAllPokemons", () => {
  it("returns list of pokemons on success", async () => {
    vi.spyOn(global, "fetch")
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockListResponse,
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockPokemonResponse,
      } as Response);

    const result = await fetchAllPokemons();
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("bulbasaur");
  });

  it("throws error when list fetch fails", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as Response);

    await expect(fetchAllPokemons()).rejects.toThrow("Error: 500");
  });
});