"use client";

import { useState, useEffect } from "react";
import { postRequest } from "../api/axios";
import Image from "next/image";
import Grid from "./Grid";

const Homepage = () => {
  const [pokemonDataArray, setPokemonDataArray] = useState([]);

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

  useEffect(() => {
    const fetchPokemonData = async () => {
      const pokemonData = await postRequest(
        "https://graphql-pokeapi.graphcdn.app/",
        getPokemonDataArrayQuery,
        {
          "content-type": "application/json",
        }
      );
      console.log(
        "***pokemonData.data.pokemons.results***",
        pokemonData.data.pokemons.results
      );
      setPokemonDataArray(pokemonData.data.pokemons.results);
    };
    fetchPokemonData();
  }, []);

  return (
    <div className="p-4">
      <Image
        alt={"Pokemon logo"}
        src="/pokemon_logo.png"
        width={300}
        height={300}
      />
      <Grid pokemonDataArray={pokemonDataArray} />
    </div>
  );
};

export default Homepage;
