import type { PokemonDetails, PokemonDetailFull } from "./types";

const BASE_URL = "https://pokeapi.co/api/v2";

export const fetchAllPokemons = async (): Promise<PokemonDetails[]> => {
  const response = await fetch(`${BASE_URL}/pokemon?limit=20`);
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  const data = await response.json();
  const details = await Promise.all(
    data.results.map((p: { name: string }) => fetchPokemonByName(p.name))
  );
  return details;
};

export const fetchPokemonByName = async (name: string): Promise<PokemonDetails> => {
  const response = await fetch(`${BASE_URL}/pokemon/${name.toLowerCase()}`);
  if (!response.ok) throw new Error(`Pokemon "${name}" not found`);
  const data = await response.json();
  return {
    name: data.name,
    id: data.id,
    description: `Type: ${data.types.map((t: { type: { name: string } }) => t.type.name).join(", ")}. Base experience: ${data.base_experience}.`,
    sprites: {
      front_default: data.sprites.front_default,
    },
  };
};

export const fetchPokemonById = async (id: number): Promise<PokemonDetailFull> => {
  const response = await fetch(`${BASE_URL}/pokemon/${id}`);
  if (!response.ok) throw new Error(`Pokemon not found`);
  const data = await response.json();
  return {
    name: data.name,
    id: data.id,
    height: data.height,
    weight: data.weight,
    types: data.types.map((t: { type: { name: string } }) => t.type.name),
    abilities: data.abilities.map((a: { ability: { name: string } }) => a.ability.name),
    sprites: {
      front_default: data.sprites.front_default,
    },
  };
};