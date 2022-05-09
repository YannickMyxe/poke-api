import * as pokeFetch from './modules/pokeFetch.js';
import * as getSprites from './modules/getSprites.js';
import * as pokeTypes from './modules/types.js';
import * as pokeStats from './modules/stats.js';

(async function(){

    const forms = document.querySelectorAll('.prevent-default');
    forms.forEach((f) => {
        f.addEventListener('submit', (e) => {
            e.preventDefault();
        });
    });

}) ();

(function() {

    const getPokemonFromName = document.querySelector('#getPokemonFromName');
    const name = document.querySelector("#name");
    const result = document.querySelector("#result");

    getPokemonFromName.addEventListener('click', async () => {
        try { 
            const pokeName = name.value.toLowerCase();
            if (pokeName === undefined || pokeName === null || pokeName === "") {
                console.warn(`Field is empty! ['${pokeName}']`);
                throw new Error(`The search-term cannot be empty, expecting a valid number / name`);
            }
            const pokemon   = await pokeFetch.getByName(pokeName);
            // To stop the rest from running if the user tries to find a non-existing pokemon
            if (pokemon === undefined) throw new Error(`Cannot find pokemon [${pokeName}]`);
            const types     = await pokeTypes.getTypesAsHtml(pokeName);
            const sprites   = await getSprites.getSpriteAsHtml(pokeName);
            const art       = await getSprites.getOfficialArtAsImages(pokeName);
            const stats     = await pokeStats.getStatsOfPokemonAsHtml(pokeName);

            result.innerHTML = `<p>Name: ${pokemon.name}</p><p>Dex-number: ${pokemon.id}</p>${types}${sprites}`;
            result.innerHTML += `<p>${art}</p>`;
            result.innerHTML += `${stats}`
        }
        catch(err) {
            console.error(`Cannot get pokemon: ${err}`);

            result.innerHTML = `<p class="error">Cannot get pokemon: '${name.value}'</p><p class="error">${err}</p>`;
        }
    });
}) ();

(function() {

    const findMatchingPokemon = document.querySelector('#findMatchingPokemon');
    const name = document.querySelector("#find-name");
    const result = document.querySelector("#find-result");

    findMatchingPokemon.addEventListener('click', async () => {
        try {
            const pokeName = name.value.toLowerCase();
            if (pokeName === undefined || pokeName === null || pokeName === "") {
                console.warn(`Field is empty! ['${pokeName}']`);
                throw new Error(`The search-term cannot be empty, expecting a valid number / name`);
            }
            const pokemon   = await pokeFetch.getByName(pokeName);
            // To stop the rest from running if the user tries to find a non-existing pokemon
            if (pokemon === undefined) throw new Error(`Cannot find pokemon [${pokeName}]`);
            /*
            const types     = await pokeTypes.getTypesAsHtml(pokeName);
            const sprites   = await getSprites.getSpriteAsHtml(pokeName);
            const art       = await getSprites.getOfficialArtAsImages(pokeName);
            const stats     = await pokeStats.getStatsOfPokemonAsHtml(pokeName);
            */

            result.innerHTML = `<p>Name: ${pokemon.name}</p><p>Dex-number: ${pokemon.id}</p>`;
        }
        catch(err) {
            console.error(`Cannot get pokemon: ${err}`);
            result.innerHTML = `<p class="error">Cannot get pokemon: '${name.value}'</p><p class="error">${err}</p>`;
        }
    });
}) ();