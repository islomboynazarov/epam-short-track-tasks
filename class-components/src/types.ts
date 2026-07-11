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