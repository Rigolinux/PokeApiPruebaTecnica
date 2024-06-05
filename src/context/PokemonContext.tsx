import { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { getAllPokemons, getAllPokemonsLight, getPokemon,getPokemonById } from '../api/pokemons';
import { Pokemons } from '../types/pokemon';

interface PokemonContextProps {
  pokemons: Pokemons | [] | unknown;
  currentPage: number;
  maxOffset: number;
  nextPage: () => void;
  prevPage: () => void;
  setPage: (page: number) => void;
  filterPokemons: (search: string) => void;
  search: string;
  setSearch: (search: string) => void;
  selectOnePokemon: (id: number) => void;
  selectedPokemon: Pokemons | [] | unknown;
}

export const PokemonContext = createContext<PokemonContextProps | undefined>(undefined);

export const PokemonProvider = ({ children }: { children: ReactNode }) => {
  const [pokemons, setPokemons] = useState<Pokemons | [] | unknown>([]);
  const [pokemonsComplete, setPokemonsComplete] = useState<Pokemons | [] | unknown>([]);
  const [offset, setOffset] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemons | [] | unknown>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemons | null>(null);

  const customOffset = useCallback(async () => {
    try {
      console.log("customOffset", filteredPokemons);
      const start = (currentPage - 1) * 25;
      const end = currentPage * 25;
      const promises: Promise<Pokemons>[] = (filteredPokemons as Pokemons[]).slice(start, end).map((pokemon: Pokemons) => {
        return getPokemon(pokemon.name);
      });
      console.log("promises", promises);
      const data = await Promise.all(promises);
      setPokemons(data);
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
    }
  }, [currentPage, filteredPokemons]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const data = await getAllPokemons(offset);
        if (data) {
          setPokemons(data.results);
          const maxOffset = Math.ceil(data.count / 25);
          setMaxOffset(maxOffset);
        }
        const dataComplete = await getAllPokemonsLight();
        if (dataComplete) {
          setPokemonsComplete(dataComplete);
        }
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    };

    if (!isFiltered) {
      fetchPokemons();
    } else {
      customOffset();
    }
  }, [offset, isFiltered, customOffset]);

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

  const filterPokemons = async () => {
    setIsFiltered(true);
    setCurrentPage(1);
    setOffset((currentPage - 1) * 25);

    const filtered = (pokemonsComplete as Pokemons[]).filter((pokemon: Pokemons) => {
      return pokemon.name.includes(search.toLowerCase());
    });
    setFilteredPokemons(filtered);
    const promises: Promise<Pokemons>[] = filtered.slice(0, 25).map((pokemon: Pokemons) => {
      return getPokemon(pokemon.name);
    });
    console.log("promises", promises);
    setMaxOffset(Math.ceil(filtered.length / 25));

    const data = await Promise.all(promises);
    setPokemons(data);
  };

  const selectOnePokemon = async (id: number) => {
    try{
        const pokemon = await getPokemonById(id);
        setSelectedPokemon(pokemon);

    }
    catch (error) {
        //if the pokemon is not found, send to the 404 page


        console.error('Error fetching Pokémon:', error);
    }
  };

  useEffect(() => {
    if (!search) {
      setIsFiltered(false);
      setOffset(1);
      setCurrentPage(1);
    }
  }, [search]);

  return (
    <PokemonContext.Provider value={{ pokemons, currentPage, maxOffset, nextPage, prevPage, setPage, filterPokemons, search, setSearch, selectOnePokemon, selectedPokemon }}>
      {children}
    </PokemonContext.Provider>
  );
};
