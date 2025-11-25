import * as React from "react";
import Card from "./Card";

export interface PokemonData {
  id: number;
  name: string;
  dreamworld: string;
  types: {
    type: {
      name: string;
    };
    slot: number;
  }[];
}

interface GridProps {
  pokemonData: PokemonData[];
}

const Grid: React.FC<GridProps> = ({ pokemonData }) => {
  return (
    <div className="p-4 flex flex-wrap pr-30 pl-30 gap-1">
      {pokemonData.map((pokemon) => {
        return (
          <Card
            key={pokemon.id}
            pokemonName={pokemon.name}
            image={pokemon.dreamworld}
            types={pokemon.types}
          />
        );
      })}
    </div>
  );
};

export default Grid;
