// import React from "react";
// import type { PokemonDetails } from "../types";
// import Card from "./Card";

// interface CardListProps {
//   pokemons: PokemonDetails[];
// }

// class CardList extends React.Component<CardListProps> {
//   render() {
//     const { pokemons } = this.props;

//     if (pokemons.length === 0) {
//       return <p style={{ textAlign: "center" }}>No results found.</p>;
//     }

//     return (
//       <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
//         {pokemons.map((pokemon) => (
//           <Card key={pokemon.id} pokemon={pokemon} />
//         ))}
//       </div>
//     );
//   }
// }

// export default CardList;

import type { PokemonDetails } from "../types";
import Card from "./Card";

interface CardListProps {
  pokemons: PokemonDetails[];
  onCardClick: (id: number) => void;
}

function CardList({ pokemons, onCardClick }: CardListProps) {
  if (pokemons.length === 0) {
    return <p style={{ textAlign: "center" }}>No results found.</p>;
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {pokemons.map((pokemon) => (
        <Card key={pokemon.id} pokemon={pokemon} onClick={onCardClick} />
      ))}
    </div>
  );
}

export default CardList;