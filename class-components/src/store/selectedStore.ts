import { create } from "zustand";
import type { PokemonDetails } from "../types";

interface SelectedStore {
  selectedItems: PokemonDetails[];
  toggleItem: (pokemon: PokemonDetails) => void;
  unselectAll: () => void;
}

const useSelectedStore = create<SelectedStore>((set) => ({
  selectedItems: [],
  toggleItem: (pokemon) =>
    set((state) => {
      const exists = state.selectedItems.find((p) => p.id === pokemon.id);
      if (exists) {
        return {
          selectedItems: state.selectedItems.filter((p) => p.id !== pokemon.id),
        };
      }
      return { selectedItems: [...state.selectedItems, pokemon] };
    }),
  unselectAll: () => set({ selectedItems: [] }),
}));

export default useSelectedStore;