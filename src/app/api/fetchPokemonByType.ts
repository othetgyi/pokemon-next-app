import {postRequest} from "./axios";

export const getPokemonByTypeQuery = (types: string[]) => ({
  operationName: "fetchPokemonByType",
  query: `    query fetchPokemonByType {
      pokemon(
        where: {
          _and: [
            ${types.map(type => `            {
              pokemontypes: {
                type: {
                  name: {
                    _eq: "${type}"
                  }
                }
              }
            }`).join(',\n')}          ]
        }
      ) {
        id
        name
      }
    }
  `,
});

export const fetchPokemonByType = async (types: string[]) => {
  try {
    return await postRequest("https://graphql.pokeapi.co/v1beta2", getPokemonByTypeQuery(types),
        {
          "content-type": "application/json"
        }
    )
  } catch (error) {
    throw new Error(`Failed to fetch Pokemon by type: ${error}`);
  }
}
