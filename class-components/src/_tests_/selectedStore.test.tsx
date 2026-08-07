import { describe, it, expect, beforeEach } from "vitest";
import useSelectedStore from "../store/selectedStore";

const mockPokemon = {
  name: "bulbasaur",
  id: 1,
  description: "Type: grass",
  sprites: { front_default: "https://example.com/bulbasaur.png" },
};

const mockPokemon2 = {
  name: "charmander",
  id: 4,
  description: "Type: fire",
  sprites: { front_default: "https://example.com/charmander.png" },
};

beforeEach(() => {
  useSelectedStore.setState({ selectedItems: [] });
});

describe("selectedStore", () => {
  it("starts with empty selected items", () => {
    expect(useSelectedStore.getState().selectedItems).toHaveLength(0);
  });

  it("adds item when toggleItem is called", () => {
    useSelectedStore.getState().toggleItem(mockPokemon);
    expect(useSelectedStore.getState().selectedItems).toHaveLength(1);
    expect(useSelectedStore.getState().selectedItems[0].name).toBe("bulbasaur");
  });

  it("removes item when toggleItem is called again", () => {
    useSelectedStore.getState().toggleItem(mockPokemon);
    useSelectedStore.getState().toggleItem(mockPokemon);
    expect(useSelectedStore.getState().selectedItems).toHaveLength(0);
  });

  it("can select multiple items", () => {
    useSelectedStore.getState().toggleItem(mockPokemon);
    useSelectedStore.getState().toggleItem(mockPokemon2);
    expect(useSelectedStore.getState().selectedItems).toHaveLength(2);
  });

  it("unselectAll clears all items", () => {
    useSelectedStore.getState().toggleItem(mockPokemon);
    useSelectedStore.getState().toggleItem(mockPokemon2);
    useSelectedStore.getState().unselectAll();
    expect(useSelectedStore.getState().selectedItems).toHaveLength(0);
  });
});