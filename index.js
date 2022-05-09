import * as pokeFetch from './modules/pokeFetch.js'
import * as pokeRandom from './modules/pokeRandom.js'
import * as pokeTypes from './modules/types.js';
import {randomize} from './modules/randomizer.js';
import { getSprites, getSpritesAsImages } from './modules/getSprites.js';

(async function() {
    const list = await pokeFetch.getListWithLimit(100);
    console.log(list);
    const fullList = await pokeFetch.getFullList();
    console.log(fullList);

    const pokemon = `chu`;
    const exp = `/${pokemon}/gi`;
    const reg = new RegExp(`${exp}`);
    console.log(fullList.results);

    const matchingResults = [];
    fullList.results.forEach(element => {
        if (element.name.match(exp)) {
            console.log(`Found ${pokemon} :=> ${element}`);
            matchingResults.push(element);
        }
    });
    if (matchingResults.length >= 1) {
        console.log(matchingResults);
    } else {
        console.log(`Did not find any matches~! for ${exp}`)
    }


})();