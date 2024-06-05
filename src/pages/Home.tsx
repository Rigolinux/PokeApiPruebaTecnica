import  { useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import PokemonCard from '../components/PokemonCard';
import Pagination from '../components/Pagination';
import { Search } from '../components';
export const Home = () => {
  const pokemonContext = useContext(PokemonContext);

  if (!pokemonContext) {
    return <div>Loading...</div>;
  }

  const { pokemons } = pokemonContext;

  return (
    <>
      <h1 className="text-4xl text-center font-bold">Poke-Api</h1>
        <Pagination />
        <Search />
      <div className="flex  justify-center mt-5">
        <div className="container card-list-pokemon">
          {Array.isArray(pokemons) && pokemons.map((pokemon, index) => (
            <div key={index} className='parent-shadow border border-gray-200 rounded-lg shadow'>
              <PokemonCard pokemon={pokemon} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
