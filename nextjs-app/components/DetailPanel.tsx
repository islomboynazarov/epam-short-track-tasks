"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchPokemonById } from "../lib/api";
import type { PokemonDetailFull } from "../types";
import Spinner from "./Spinner";

interface DetailPanelProps {
  detailsId: string;
  onClose: () => void;
}

export default function DetailPanel({ detailsId, onClose }: DetailPanelProps) {
  const [pokemon, setPokemon] = useState<PokemonDetailFull | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetchPokemonById(Number(detailsId))
      .then((data) => {
        setPokemon(data);
        setIsLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [detailsId]);

  return (
    <div style={{ width: "300px", borderLeft: "2px solid #ccc", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <button onClick={onClose}>Close ✕</button>
      </div>
      {isLoading && <Spinner />}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {pokemon && !isLoading && (
        <div>
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={96}
            height={96}
          />
          <h2>{pokemon.name}</h2>
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <p>Types: {pokemon.types.join(", ")}</p>
          <p>Abilities: {pokemon.abilities.join(", ")}</p>
        </div>
      )}
    </div>
  );
}