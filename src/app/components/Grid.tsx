import * as React from "react";
import Card from "./Card";

export interface GridProps {
  pokemonDataArray: {
    id: number;
    name: string;
    dreamworld: string;
  }[];
}

const Grid: React.FC<GridProps> = ({ pokemonDataArray }) => {
  return (
    <div className="w-5/6 p-4 flex flex-wrap pr-30 pl-30 gap-1">
      {pokemonDataArray.map((pokemon) => {
        return (
          <Card
            key={pokemon.id}
            pokemonName={pokemon.name}
            image={pokemon.dreamworld}
          />
        );
      })}
    </div>
  );
};

export default Grid;
