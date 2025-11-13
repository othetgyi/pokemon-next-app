"use client";

import { useState, useEffect } from "react";
import {fetchPokemonList, Pokemon} from "@/app/api/fetchPokemonList";
import {fetchPokemonDetails} from "@/app/api/fetchPokemonDetails";
import Image from "next/image";
import Grid from "./Grid";
import Button from "./Button";

const Homepage = () => {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);

  const fetchPokemonDataAndDetails = async () => {
    const pokemonList = await fetchPokemonList(offset);

    const pokemonDetails = await Promise.all(
        pokemonList.map((pokemon: Pokemon) =>
            fetchPokemonDetails(pokemon.name)
        )
      );

      const combinedPokemonData = pokemonList.map(
        (pokemon: Pokemon, index: number) => ({
          ...pokemon,
          types: pokemonDetails[index].data.pokemon ? pokemonDetails[index].data.pokemon.types : null,
        })
      );
      setPokemonData((prevData) => [...prevData, ...combinedPokemonData]);
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
