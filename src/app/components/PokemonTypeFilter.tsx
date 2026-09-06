import * as React from "react";
import Button from "@/app/components/Button";

const PokemonTypeFilter: React.FC<{
  onChange: (_event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedTypes: string[];
  onFilter: () => void;
  filterError: string;
}> = ({onChange, selectedTypes, onFilter, filterError}) => {
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
      <fieldset className={"bg-white rounded-lg shadow p-4 border border-gray-200"}>
        <legend className={"font-bold text-lg px-2"}>Select up to 3 types</legend>
        <div className={"grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mt-2"}>
          {types.map((type) => {
            return (
                <div key={type}>
                  <input
                      type={"checkbox"}
                      id={type}
                      name={"type"}
                      value={type}
                      checked={selectedTypes.includes(type)}
                      onChange={onChange}
                      className={"peer hidden"}
                  />
                  <label htmlFor={type}
                         className={"block cursor-pointer select-none text-center py-1.5 px-3 rounded-full border border-gray-300 text-sm capitalize peer-checked:bg-yellow-300 peer-checked:border-yellow-400 peer-checked:font-semibold hover:bg-gray-50 transition-colors"}>
                    {type}
                  </label>
                </div>
            )
          })}
        </div>
        <div className={"mt-4"}>
          <Button type="button" text="Filter Pokemon by type" ariaLabel="Filter"
                  onClick={onFilter}/>
          {filterError && (
              <div
                  className={"mt-3 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md px-3 py-2"}
                  role="alert">
                <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                <span>{filterError}</span>
              </div>
          )}
        </div>
      </fieldset>
  )
}

export default PokemonTypeFilter;
