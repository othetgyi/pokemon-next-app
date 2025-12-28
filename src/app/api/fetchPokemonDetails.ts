import { postRequest } from "./axios";

export const getPokemonDetailsQuery = (name: string) => ({
    operationName: "fetchPokemonDetails",
    query: `query fetchPokemonDetails($name: String!) {
      pokemon(name: $name) {
          id
          name
        types {
          type {
          name
           }
          slot
          }
        }
      }
    `,
    variables: {
        name,
    },
});

export const fetchPokemonDetails = async (name: string) => {
    try {
        const pokemonDetails = await postRequest(
            "https://graphql-pokeapi.graphcdn.app/",
            getPokemonDetailsQuery(name),
            {
                "content-type": "application/json",
            }
        );
        return pokemonDetails;
    } catch (error) {
        console.error("Error fetching Pokemon data", error);
    }
}