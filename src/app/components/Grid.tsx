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

const Grid: React.FC<GridProps> = ({pokemonData}) => {
  return (
      <div className="py-4 flex flex-wrap justify-between gap-6 max-w-7xl mx-auto">
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
