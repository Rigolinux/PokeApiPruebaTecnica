
import { Link } from 'react-router-dom';
import { Pokemons } from '../types/pokemon';

const PokemonCard = ({ pokemon }: { pokemon: Pokemons }) => {
	return (
		<Link to={`/pokemon/${pokemon.id}`} className='card-pokemon '>
            <div className='card-img'>
                {pokemon.sprites.other && (
                    <img
                        src={pokemon.sprites.other.dream_world.front_default}
                        alt={`Pokemon ${pokemon.name}`}
                    />
                )}
            </div>
			<div className='card-info '>
                <div className='flex justify-between'>
				<span className='pokemon-id'>N° {pokemon.id}</span>
				<h3>{pokemon.name}</h3>
                </div>
				<div className='card-types'>
					{pokemon.types.map(type => (
						<span key={type.type.name} className={type.type.name}>
							{type.type.name}
						</span>
					))}
				</div>
			</div>
		</Link>
	);
};

export default PokemonCard;