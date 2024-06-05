/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import { PokemonContext } from '../context/PokemonContext';

export const Search = () => {
    const pokemonContext = useContext(PokemonContext);
    const { filterPokemons, search, setSearch } = pokemonContext;
    

    useEffect(() => {
        
        const handler = setTimeout(() => {
            setSearch(search);
            filterPokemons();
        }, 500); // Ajusta el tiempo de debounce según sea necesario

        return () => {
            clearTimeout(handler);
        };
    }, [setSearch,filterPokemons ]);

    if (!pokemonContext) {
      return <div>Loading...</div>;
    }

    return (
        <div className="flex justify-end items-center p-4">
           
            <input
                type="text"
                placeholder="Escribe el nombre del pokemon"
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        
                        filterPokemons();
                    }
                }}
            />  
            <button
                onClick={() => {
                   
                    filterPokemons();
                }}
                className="ml-4 hover:bg-blue-400 bg-blue-600 rounded-md text-white text-xl p-2"
            >
                Buscar
            </button>
        </div>
    );
}

