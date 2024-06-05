import { Link, useParams } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import {  Type } from '../types/pokemon';

export const Pokemon = () => {
  const { selectedPokemon, selectOnePokemon } = useContext(PokemonContext);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      selectOnePokemon(id);
    }
  }, [id, selectOnePokemon]);

  return (
    <>
    {selectedPokemon ? (
    <div className='flex justify-center items-center content-center h-screen'>
      <div className=' border border-gray-200 rounded-lg shadow-lg p-5'>
      <div className='card-img'>
                {selectedPokemon.sprites.other && (
                    <img
                        src={selectedPokemon.sprites.other.dream_world.front_default}
                        alt={`Pokemon ${selectedPokemon.name}`}
                    />
                )}
            </div>
            <div className='flex justify-between'>
				<span className='pokemon-id text-3xl '>N° {selectedPokemon.id}</span>
				<h1 className='text-3xl'>{selectedPokemon.name}</h1>
                </div>
                        <div className='card-types'>
                      {selectedPokemon.types.map((type: Type) => (
                        <span key={type.type.name} className={type.type.name}>
                          {type.type.name}
                        </span>
                      ))}
                    </div>
        <div className='stat-group flex mt-2 justify-between'>
          <span className='counter-stat columns-2'>
            Hp: {selectedPokemon.stats[0].base_stat}
          </span>
          <div className='progress-bar'>
            <div className='progress-bar-fill' style={{ width: `${Number(selectedPokemon.stats[0].base_stat/2.5)}%` }}></div>
          </div>
        </div>
        <div className='stat-group flex justify-between'>
          <span className='counter-stat columns-2'>
            Attack: {selectedPokemon.stats[1].base_stat}
          </span>
          <div className='progress-bar'>
            <div className='progress-bar-fill' style={{ width: `${Number(selectedPokemon.stats[1].base_stat/2.5)}%` }}></div>
          </div>
        </div>
        <div className='stat-group flex justify-between'>
          <span className='counter-stat columns-2'>
            Defense: {selectedPokemon.stats[2].base_stat}
          </span>
          <div className='progress-bar'>
            <div className='progress-bar-fill' style={{ width: `${Number(selectedPokemon.stats[2].base_stat/2.5)}%` }}></div>
          </div>
        </div>
        <div className='stat-group flex justify-between'>
          <span className='counter-stat columns-2'>
            Special Attack: {selectedPokemon.stats[3].base_stat}
          </span>
          <div className='progress-bar'>
            <div className='progress-bar-fill' style={{ width: `${Number(selectedPokemon.stats[3].base_stat/2.5)}%` }}></div>
          </div>
        </div>
        <div className='stat-group flex justify-between'>
          <span className='counter-stat columns-2'>
            Special Defense: {selectedPokemon.stats[4].base_stat}
          </span>
          <div className='progress-bar'>
            <div className='progress-bar-fill' style={{ width: `${Number(selectedPokemon.stats[4].base_stat/2.5)}%` }}></div>
          </div>
        </div>
        <div className='stat-group flex justify-between'>
          <span className='counter-stat columns-2'>
            Speed: {selectedPokemon.stats[5].base_stat}
          </span>
          <div className='progress-bar'>
            <div className='progress-bar-fill' style={{ width: `${Number(selectedPokemon.stats[5].base_stat/2.5)}%` }}></div>
          </div>
        </div>
      <Link to='/' className='btn hover:bg-blue-400 bg-blue-600 rounded-md text-white  text-xl p-2 mt-8'>Volver</Link>
      </div>
    </div>
        ) : (
          <div>Loading...</div>
        )}
        </>
  );
}
