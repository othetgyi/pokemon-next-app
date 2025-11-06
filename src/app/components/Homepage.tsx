"use client";

import { useState, useEffect } from "react";
import { postRequest } from "../api/axios";
import Image from "next/image";
import Grid from "./Grid";
import Button from "./Button";

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
  const [offset, setOffset] = useState(0);

  const getPokemonListQuery = {
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

  const fetchPokemonDataAndDetails = async () => {
    try {
      const pokemonList = await postRequest(
        "https://graphql-pokeapi.graphcdn.app/",
        getPokemonListQuery,
        {
          "content-type": "application/json",
        }
      );
      const pokemonListArray = pokemonList.data.pokemons.results;
      console.log("***pokemonDataArray***", pokemonListArray);

      const pokemonDetailsData = await Promise.all(
        pokemonListArray.map((pokemon: Pokemon) =>
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

      const combinedPokemonData = pokemonListArray.map(
        (pokemon: Pokemon, index: number) => ({
          ...pokemon,
          types: pokemonDetailsData[index].data.pokemon ? pokemonDetailsData[index].data.pokemon.types : null,
        })
      );

      setPokemonData((prevData) => [...prevData, ...combinedPokemonData]);
    } catch (error) {
      console.error("Error fetching Pokemon data and details", error);
    }
  };

  useEffect(() => {
    fetchPokemonDataAndDetails();
  }, [offset]);

  const handleClick = () => {
    setOffset((prevOffset) => prevOffset + 12);
  };

  return (
    <div className="p-4">
      <Image
        alt={"Pokemon logo"}
        src="/pokemon_logo.png"
        width={300}
        height={300}
      />
      <Grid pokemonData={pokemonData} />
      <Button text="Load more Pokemon" onClick={handleClick} />
    </div>
  );
};

export default Homepage;
