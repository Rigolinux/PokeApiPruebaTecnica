import { useContext, useEffect, useState } from 'react';
import { PokemonContext } from '../context/PokemonContext';

export const Search = () => {
    const pokemonContext = useContext(PokemonContext);
    const { filterPokemons, search, setSearch } = pokemonContext;
    
    const [localSearch, setLocalSearch] = useState(search);

    useEffect(() => {
        const handler = setTimeout(() => {
            setSearch(localSearch);
            filterPokemons();
        }, 500); // Ajusta el tiempo de debounce según sea necesario

        return () => {
            clearTimeout(handler);
        };
    }, [localSearch, setSearch, filterPokemons]);

    if (!pokemonContext) {
      return <div>Loading...</div>;
    }

    return (
        <div className="flex justify-end items-center p-4">
           
            <input
                type="text"
                placeholder="Escribe el nombre del pokemon"
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        console.log('search', localSearch);
                        filterPokemons();
                    }
                }}
            />  
            <button
                onClick={() => {
                    console.log('search', localSearch);
                    filterPokemons();
                }}
                className="ml-4 hover:bg-blue-400 bg-blue-600 rounded-md text-white text-xl p-2"
            >
                Buscar
            </button>
        </div>
    );
}

