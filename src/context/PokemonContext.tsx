import  { createContext, useState, useEffect, ReactNode } from 'react';
import { getAllPokemons } from '../api/pokemons';
import { Pokemons } from '../types/pokemon';

interface PokemonContextProps {
  pokemons: Pokemons | [] | unknown;
  currentPage: number;
  maxOffset: number;
  nextPage: () => void;
  prevPage: () => void;
  setPage: (page: number) => void;
}

export const PokemonContext = createContext<PokemonContextProps | undefined>(undefined);

export const PokemonProvider = ({ children }: { children: ReactNode }) => {
  const [pokemons, setPokemons] = useState<Pokemons | [] | unknown>([]);
  const [offset, setOffset] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const data = await getAllPokemons(offset);
        if (data) {
          setPokemons(data.results);
          const maxOffset = Math.ceil(data.count / 25);
          setMaxOffset(maxOffset);
        }
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    };

    fetchPokemons();
  }, [offset]);

  const nextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
    setOffset((currentPage) * 25);
  };

  const prevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
    setOffset((currentPage - 2) * 25);
  };

  const setPage = (page: number) => {
    setCurrentPage(page);
    setOffset((page - 1) * 25);
  };

  return (
    <PokemonContext.Provider value={{ pokemons, currentPage, maxOffset, nextPage, prevPage, setPage }}>
      {children}
    </PokemonContext.Provider>
  );
};
