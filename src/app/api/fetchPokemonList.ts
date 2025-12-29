import { postRequest } from "./axios";

export interface Pokemon {
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

export type PokemonArray = Pokemon[];

export const getPokemonListQuery = (offset: number) => ({
    operationName: "fetchPokemonData",
    query: `query fetchPokemonData($limit: Int, $offset: Int) {
      pokemons(limit: $limit, offset: $offset) {
        results {
          id
          name
          dreamworld
          }
        }
      }
    `,
    variables: {
        limit: 12,
        offset: offset,
    },
});

export const fetchPokemonList = async (offset = 0) => {
    try {
        const pokemonList = await postRequest(
            "https://graphql-pokeapi.graphcdn.app/",
            getPokemonListQuery(offset),
            {
                "content-type": "application/json",
            }
        );
        const pokemonListArray = pokemonList.data.pokemons.results;

        return pokemonListArray;
    } catch (error) {
        console.error("Error fetching Pokemon list", error);
    }
}