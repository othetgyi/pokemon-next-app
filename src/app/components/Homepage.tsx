"use client";

import {useState, useEffect} from "react";
import {fetchPokemonList, Pokemon} from "@/app/api/fetchPokemonList";
import {fetchPokemonDetails} from "@/app/api/fetchPokemonDetails";
import {fetchImageUrl} from "@/app/api/fetchImageUrl";
import {fetchPokemonByType} from "@/app/api/fetchPokemonByType";
import Image from "next/image";
import Grid from "./Grid";
import Button from "./Button";
import SearchBar from "./SearchBar";
import validateInput from "../utils/validateInput";
import PokemonTypeFilter from "@/app/components/PokemonTypeFilter";

const Homepage = () => {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const fetchPokemonDataAndDetails = async () => {
    try {
      const pokemonList = await fetchPokemonList(offset);

      const pokemonDetails = await Promise.all(
          pokemonList.map((pokemon: Pokemon) =>
              fetchPokemonDetails(pokemon.name)
              .catch(error => {
                console.error(`Failed to fetch ${pokemon.name}:`, error);
                return null;
              })
          )
      );
      const combinedPokemonData = pokemonList
      .map((pokemon: Pokemon, index: number) => {
        const details = pokemonDetails[index];
        if (!details || !details.data || !details.data.pokemon) {
          return null;
        }
        return {
          ...pokemon,
          types: details.data.pokemon.types || null,
        }
      })
      .filter((pokemon: Pokemon) => pokemon !== null);
      setPokemonData((prevData) => [...prevData, ...combinedPokemonData]);
    } catch (error) {
      setError("Failed to fetch Pokemon data");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPokemonDataAndDetails();
  }, [offset]);

  const handleClick = () => {
    setOffset((prevOffset) => prevOffset + 12);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const pokemonName = formData.get("search") as string;
    const {isValid, message} = validateInput(pokemonName);
    console.log("***isValid***", {isValid});
    setIsValid(isValid);

    setError(message);

    if (!isValid) return;

    try {
      const result = await fetchPokemonDetails(pokemonName);
      const pokemonImage = await fetchImageUrl(result.data.pokemon.name);
      result.data.pokemon.dreamworld = pokemonImage;
      setPokemonData([result.data.pokemon]);
    } catch (error) {
      console.log(error)
    }

    setSearchTerm('');
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filterOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const type = event.target.value;
    setSelectedTypes(currentPokemonTypesArray => currentPokemonTypesArray.includes(type) ? currentPokemonTypesArray.filter(pokemonType => pokemonType !== type) : [...currentPokemonTypesArray, type]);
  }

  const filterPokemon = async () => {
    if (selectedTypes.length === 0) return;

    try {
      const pokemonListByType = await fetchPokemonByType(selectedTypes);
      return setPokemonData(pokemonListByType.data.pokemon);
    } catch (error) {
      console.error(error);
    }
  }
  return (
      <div className="max-w-4xl mx-auto p-4">
        <Image
            alt={"Pokemon logo"}
            src="/pokemon_logo.png"
            width={300}
            height={300}
        />
        <div className="flex justify-between">
          <div className="flex flex-col items-start">
            <PokemonTypeFilter onChange={filterOnChange} selectedTypes={selectedTypes}
                               onFilter={filterPokemon}/>
          </div>
          <div className="flex flex-col items-end">
            <SearchBar handleSubmit={handleSubmit}
                       onChange={onChange}
                       value={searchTerm}
                       isValid={isValid}/>
            {!isValid ? <div className="w-full pt-1 h-8 text-red-600 text-xs">{error}</div> : null}
          </div>
        </div>
        <Grid pokemonData={pokemonData}/>
        <div className={"flex justify-center mt-4"}>
          <Button text="Load more Pokemon" type="button" ariaLabel="Get more Pokemon button"
                  onClick={handleClick}/>
        </div>
      </div>
  );
};

export default Homepage;
