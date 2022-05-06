import * as pokeFetch from './pokeFetch.js';
import * as rnd from './randomizer.js'

export const getRandomPokemon = async function() {
    const number = await rnd.randomize(pokeFetch.maxPokemonIndex);
    const pokemon = await pokeFetch.getByNationalIndex(number);
    return pokemon;
};