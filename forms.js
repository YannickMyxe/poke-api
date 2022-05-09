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
    if (getPokemonFromName === null) return;
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
            console.error(`Cannot get pokemon: ${err.message}`);

            result.innerHTML = `<p class="error">${err.message}</p>`;
        }
    });
}) ();

(function() {

    const findMatchingPokemon = document.querySelector('#findMatchingPokemon');
    const name = document.querySelector("#find-name");
    const result = document.querySelector("#find-result");
    if (findMatchingPokemon === null) return;
    findMatchingPokemon.addEventListener('click', async () => {
        try {
            const pokeName = name.value.toLowerCase();
            if (pokeName === undefined || pokeName === null || pokeName === "") {
                console.warn(`Field is empty! ['${pokeName}']`);
                throw new Error(`The search-term cannot be empty, expecting a valid number / name`);
            }
            const fullList = await pokeFetch.getFullList();
            const matchingResults = [];
            fullList.results.forEach(element => {
                if (element.name.includes(pokeName)) {
                    matchingResults.push(element);        
                }
            });
            result.innerHTML = ""; // Clear the results
            if (matchingResults.length >= 1) {
                matchingResults.forEach(pokemon => {
                    result.innerHTML += `<p>Name: ${pokemon.name}</p>`
                })
            } else {
                const message = `Did not find any matches~! for ${pokeName}`;
                console.log(`${message}`);
                throw new Error(`${message}`);
            }

            
        }
        catch(err) {
            console.error(`Cannot get pokemon: ${err.message}`);
            result.innerHTML = `<p class="error">${err.message}</p>`;
        }
    });
}) ();