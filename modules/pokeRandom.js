import * as pokeFetch from './pokeFetch.js';
import * as rnd from './randomizer.js'

export const getRandomPokemon = async function() {
    try {
        const number = await rnd.randomize(pokeFetch.maxPokemonIndex);
        const pokemon = await pokeFetch.getByNationalIndex(number);
        return pokemon;
    }
    catch(err) {
        console.error(`Cannot get random pokemon => ${err}`);
    }
};