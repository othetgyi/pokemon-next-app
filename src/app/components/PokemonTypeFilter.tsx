import * as React from "react";

const PokemonTypeFilter: React.FC<{
  onChange: (_event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedTypes: string[];
}> = ({onChange, selectedTypes}) => {
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
        <legend className={"font-bold"}>Pick a Pokemon type</legend>
        <div className={"grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-2"}>
          {types.map((type) => {
            return (
                <div key={type}>
                  <input
                      type={"checkbox"}
                      id={"type"}
                      name={"type"}
                      value={type}
                      checked={selectedTypes.includes(type)}
                      onChange={onChange}
                  />
                  <label key={type}/>{`${type} `}

                </div>
            )
          })}

        </div>
      </fieldset>
  )
}

export default PokemonTypeFilter;
