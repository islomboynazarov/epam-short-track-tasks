import React from "react";
import type { PokemonDetails } from "../types";

interface CardProps {
  pokemon: PokemonDetails;
}

class Card extends React.Component<CardProps> {
  render() {
    const { pokemon } = this.props;
    return (
      <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px", borderRadius: "8px" }}>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <h3>{pokemon.name}</h3>
        <p>{pokemon.description}</p>
      </div>
    );
  }
}

export default Card;