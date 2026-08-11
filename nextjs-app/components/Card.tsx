"use client";
import Image from "next/image";
import type { PokemonDetails } from "../types";
import useSelectedStore from "../store/selectedStore";

interface CardProps {
  pokemon: PokemonDetails;
  onClick: (id: number) => void;
}

export default function Card({ pokemon, onClick }: CardProps) {
  const { selectedItems, toggleItem } = useSelectedStore();
  const isSelected = selectedItems.some((p) => p.id === pokemon.id);

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    toggleItem(pokemon);
  };

  return (
    <div
      onClick={() => onClick(pokemon.id)}
      style={{
        border: `2px solid ${isSelected ? "#4caf50" : "#ccc"}`,
        padding: "10px",
        margin: "10px",
        borderRadius: "8px",
        cursor: "pointer",
        position: "relative",
      }}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckbox}
        onClick={(e) => e.stopPropagation()}
        style={{ position: "absolute", top: "10px", right: "10px" }}
      />
      <Image
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        width={96}
        height={96}
      />
      <h3>{pokemon.name}</h3>
      <p>{pokemon.description}</p>
    </div>
  );
}