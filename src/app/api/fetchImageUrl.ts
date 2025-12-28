import { getRequest } from "./axios";



export const fetchImageUrl = async (name: string) => {
    try {
        const result = await getRequest(
            `https://pokeapi.co/api/v2/pokemon/${name}/`
        );
        return result.sprites.other.dream_world.front_default;
    } catch (error) {
        console.error("Error fetching Pokemon data", error);
    }
}