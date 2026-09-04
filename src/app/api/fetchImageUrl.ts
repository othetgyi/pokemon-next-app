import {getRequest} from "./axios";

export const fetchImageUrl = async (name: string) => {
  try {
    const result = await getRequest(
        `https://pokeapi.co/api/v2/pokemon/${name}/`
    );
    const sprites = result.sprites;
    return (
        sprites.other['official-artwork'].front_default ||
        sprites.other.home.front_default ||
        sprites.other.dream_world.front_default ||
        sprites.front_default);
  } catch (error) {
    console.error("Error fetching Pokemon data", error);
  }
}
