import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchPokemonById } from "../api";
import type { PokemonDetailFull } from "../types";
import Spinner from "./Spinner";

function DetailPanel() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pokemon, setPokemon] = useState<PokemonDetailFull | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const detailsId = searchParams.get("details");

  useEffect(() => {
    if (!detailsId) return;
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

  const handleClose = () => {
    searchParams.delete("details");
    setSearchParams(searchParams);
  };

  if (!detailsId) return null;

  return (
    <div style={{ width: "300px", borderLeft: "2px solid #ccc", padding: "20px" }}>
      <button onClick={handleClose} style={{ marginBottom: "10px" }}>
        Close ✕
      </button>
      {isLoading && <Spinner />}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {pokemon && !isLoading && (
        <div>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
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

export default DetailPanel;