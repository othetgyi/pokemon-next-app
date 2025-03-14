import * as React from "react";
import Card from "./Card";

export interface GridProps {
  pokemonDataArray: {
    id: number;
    name: string;
    image: string;
  }[];
}

const Grid: React.FC<GridProps> = ({ pokemonDataArray }) => {
  return (
    <div className="w-3/4 grid grid-cols-4 pr-30 pl-48 gap-1">
      {pokemonDataArray.map((pokemon) => {
        return (
          <Card
            key={pokemon.id}
            pokemonName={pokemon.name}
            image={pokemon.image}
          />
        );
      })}
    </div>
  );
};

export default Grid;
