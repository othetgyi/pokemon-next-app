"use client";

import { useState, useEffect } from "react";
import {fetchPokemonList, Pokemon} from "@/app/api/fetchPokemonList";
import {fetchPokemonDetails} from "@/app/api/fetchPokemonDetails";
import {fetchImageUrl} from "@/app/api/fetchImageUrl";
import Image from "next/image";
import Grid from "./Grid";
import Button from "./Button";
import SearchBar from "./SearchBar";

const Homepage = () => {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSubmit = async (e) => {
      e.preventDefault();

     const formData = new FormData(e.currentTarget);
     const pokemonName = formData.get("search");
      try {
          const result = await fetchPokemonDetails(pokemonName);
          const pokemonImage = await fetchImageUrl(result.data.pokemon.name);
          result.data.pokemon.dreamworld = pokemonImage;
          setPokemonData([result.data.pokemon]);
          }
      catch (error) {
          console.log(error)
                     }


      setSearchTerm('');
      };

  const onChange = (e) => {
      setSearchTerm(e.target.value)
      }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Image
        alt={"Pokemon logo"}
        src="/pokemon_logo.png"
        width={300}
        height={300}
      />
        <div className="flex justify-end">
            <SearchBar handleSubmit={handleSubmit} onChange={onChange} value={searchTerm} />
        </div>
      <Grid pokemonData={pokemonData} />
      <Button text="Load more Pokemon" onClick={handleClick} />
    </div>
  );
};

export default Homepage;