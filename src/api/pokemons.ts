/* eslint-disable @typescript-eslint/no-explicit-any */
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

export const getAllPokemonsLight = async (): Promise<PokemonSimpleL[]> => {
    try {
        const response = await client.get(`/pokemon?limit=10000`);
        return response.data.results;
    } catch (error) {
        console.error(error);
        return []; 
    }
};


// Get a single pokemon information
export const getPokemon = async (name: string) => {
  try {
    const response = await client.get(`/pokemon/${name}`);
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//get pokemon by id
export const getPokemonById = async (id: number) => {
    try {
        const response = await client.get(`/pokemon/${id}`);
        return response.data;
    } catch (error) {
        //if the pokemon is not found, redirect to to not found page
        console.error("Error fetching Pokémon:", error);
        if ((error as any).response.status === 404) {
            window.location.href = "/not-found";
        }
    }    
};