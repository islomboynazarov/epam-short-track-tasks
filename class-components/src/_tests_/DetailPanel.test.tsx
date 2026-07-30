import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import DetailPanel from "../components/DetailPanel";
import * as api from "../api";

const mockPokemon = {
  name: "bulbasaur",
  id: 1,
  height: 7,
  weight: 69,
  types: ["grass", "poison"],
  abilities: ["overgrow"],
  sprites: { front_default: "https://example.com/bulbasaur.png" },
};

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("DetailPanel", () => {
  it("renders nothing when no details param", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/?page=1"]}>
        <Routes>
          <Route path="/" element={<DetailPanel />} />
        </Routes>
      </MemoryRouter>
    );
    expect(container.firstChild).toBeNull();
  });

  it("shows loading spinner while fetching", async () => {
    vi.spyOn(api, "fetchPokemonById").mockResolvedValue(mockPokemon);
    render(
      <MemoryRouter initialEntries={["/?page=1&details=1"]}>
        <Routes>
          <Route path="/" element={<DetailPanel />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders pokemon details after fetch", async () => {
    vi.spyOn(api, "fetchPokemonById").mockResolvedValue(mockPokemon);
    render(
      <MemoryRouter initialEntries={["/?page=1&details=1"]}>
        <Routes>
          <Route path="/" element={<DetailPanel />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    });
  });

  it("shows error when fetch fails", async () => {
    vi.spyOn(api, "fetchPokemonById").mockRejectedValue(new Error("Not found"));
    render(
      <MemoryRouter initialEntries={["/?page=1&details=999"]}>
        <Routes>
          <Route path="/" element={<DetailPanel />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText("Not found")).toBeInTheDocument();
    });
  });

  it("renders close button", async () => {
    vi.spyOn(api, "fetchPokemonById").mockResolvedValue(mockPokemon);
    render(
      <MemoryRouter initialEntries={["/?page=1&details=1"]}>
        <Routes>
          <Route path="/" element={<DetailPanel />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Close ✕")).toBeInTheDocument();
  });

  it("closes panel when close button clicked", async () => {
    const user = userEvent.setup();
    vi.spyOn(api, "fetchPokemonById").mockResolvedValue(mockPokemon);
    const { container } = render(
      <MemoryRouter initialEntries={["/?page=1&details=1"]}>
        <Routes>
          <Route path="/" element={<DetailPanel />} />
        </Routes>
      </MemoryRouter>
    );
    await user.click(screen.getByText("Close ✕"));
    expect(container.firstChild).toBeNull();
  });
});