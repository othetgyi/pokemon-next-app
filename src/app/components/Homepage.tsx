"use client";

import { useState, useEffect } from "react";
import { postRequest } from "../api/axios";
import Image from "next/image";
import Grid from "./Grid";

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

const Homepage = () => {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);

  const getPokemonDataArrayQuery = {
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
      offset: 0,
    },
  };

  const getPokemonDetailsQuery = (name: string) => ({
    operationName: "fetchPokemonDetails",
    query: `query fetchPokemonDetails($name: String!) {
      pokemon(name: $name) {
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

  useEffect(() => {
    const fetchPokemonDataAndDetails = async () => {
      try {
        const pokemonData = await postRequest(
          "https://graphql-pokeapi.graphcdn.app/",
          getPokemonDataArrayQuery,
          {
            "content-type": "application/json",
          }
        );
        const pokemonDataArray = pokemonData.data.pokemons.results;
        console.log("***pokemonDataArray***", pokemonDataArray);

        const pokemonDetailsData = await Promise.all(
          pokemonDataArray.map((pokemon: Pokemon) =>
            postRequest(
              "https://graphql-pokeapi.graphcdn.app/",
              getPokemonDetailsQuery(pokemon.name),
              {
                "content-type": "application/json",
              }
            )
          )
        );

        console.log("***pokemonDetailsData***", pokemonDetailsData);

        const combinedPokemonData = pokemonDataArray.map(
          (pokemon: Pokemon, index: number) => ({
            ...pokemon,
            types: pokemonDetailsData[index].data.pokemon.types,

            // types: pokemonDetailsData[index].data.pokemon.types.map(
            // (type: { type: { name: string } }) => type.type.name
          })
        );
        console.log("***combinedPokemonData***", combinedPokemonData);
        setPokemonData(combinedPokemonData);
      } catch (error) {
        console.error("Error fetching Pokemon data and details", error);
      }
    };

    fetchPokemonDataAndDetails();
  }, []);

  return (
    <div className="p-4">
      <Image
        alt={"Pokemon logo"}
        src="/pokemon_logo.png"
        width={300}
        height={300}
      />
      <Grid pokemonData={pokemonData} />
    </div>
  );
};

export default Homepage;
