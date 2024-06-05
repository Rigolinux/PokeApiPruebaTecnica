import { client } from "./axios";
import { PokemonSimpleL } from "../types/pokemon";
// Get all pokemons

export const getAllPokemons = async (Offset: number = 0) => {
  try {
    console.log("Offset", Offset);
    const response = await client.get(`/pokemon?limit=25&offset=${Offset}`);
    
    const promises = response.data.results.map( (pokemon: PokemonSimpleL) => {
        return getPokemon(pokemon.name);
    });
    const data = await Promise.all(promises);
    console.log("data", data);
    return { count: response.data.count, results: data };
  } catch (error) {
    console.error(error);
  }
};


// Get a single pokemon information
export const getPokemon = async (name: string) => {
  try {
    const response = await client.get(`/pokemon/${name}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};