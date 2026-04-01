import {postRequest} from "./axios";

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
        const response = await postRequest(
            "https://graphql-pokeapi.graphcdn.app/",
            getPokemonDetailsQuery(name),
            {
                "content-type": "application/json",
            }
        );

        if (!response?.data?.pokemon) {
            throw new Error(`No data returned for Pokemon: ${name}`)
        }

        return response;
    } catch (error) {
        throw new Error(
            `Failed to fetch details for ${name}: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
    }
}