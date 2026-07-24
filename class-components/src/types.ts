export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonDetails {
  name: string;
  id: number;
  description: string;
  sprites: {
    front_default: string;
  };
}

export interface AppState {
  pokemons: PokemonDetails[];
  searchTerm: string;
  isLoading: boolean;
  error: string | null;
}

export interface PokemonDetailFull {
  name: string;
  id: number;
  height: number;
  weight: number;
  types: string[];
  abilities: string[];
  sprites: {
    front_default: string;
  };
}