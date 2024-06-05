import { useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext';

export const Search = () => {
    const pokemonContext = useContext(PokemonContext);
    

    const { filterPokemons, search, setSearch  } = pokemonContext;
    if (!pokemonContext) {
      return <div>Loading...</div>;
    }
  return (
    <div className="flex justify-end items-center p-4">
    <div className="mr-4 text-lg">Search</div>
    <input
      type="text"
      placeholder="Search"
      className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          console.log('search', search);
          filterPokemons();
        }
      }}
    />  
    <button
      onClick={() => {
        console.log('search', search);
        filterPokemons();

      }}
      className="ml-4 p-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Buscar
    </button>
  </div>
  )
}

