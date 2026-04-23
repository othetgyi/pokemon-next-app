import * as React from "react";
import Button from "@/app/components/Button";

const PokemonTypeFilter: React.FC<{
  onChange: (_event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedTypes: string[];
  onFilter: () => void;
}> = ({onChange, selectedTypes, onFilter}) => {
  const types = [
    'bug',
    'dark',
    'dragon',
    'electric',
    'fairy',
    'fighting',
    'fire',
    'flying',
    'ghost',
    'grass',
    'ground',
    'ice',
    'normal',
    'poison',
    'psychic',
    'rock',
    'steel',
    'water',
  ]
  return (
      <fieldset>
        <legend className={"font-bold"}>Select up to 3 types</legend>
        <div className={"grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-2"}>
          {types.map((type) => {
            return (
                <div key={type} className={"flex items-center gap-1"}>
                  <input
                      type={"checkbox"}
                      id={type}
                      name={"type"}
                      value={type}
                      checked={selectedTypes.includes(type)}
                      onChange={onChange}
                  />
                  <label htmlFor={type}>{type}</label>

                </div>
            )
          })}
          <Button type="button" text="Filter Pokemon by type" ariaLabel="Filter"
                  onClick={onFilter}/>
        </div>
      </fieldset>
  )
}

export default PokemonTypeFilter;
