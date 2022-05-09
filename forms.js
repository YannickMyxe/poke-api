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
            if (name.value === undefined || name.value === null || name.value === "") {
                console.warn(`Field is empty! ['${name.value}']`);
                throw new Error(`The search-term cannot be empty, expecting a valid number / name`);
            }
            const pokemon   = await pokeFetch.getByName(name.value);
            const types     = await pokeTypes.getTypesAsHtml(name.value);
            const sprites   = await getSprites.getSpriteAsHtml(name.value);
            const art       = await getSprites.getOfficialArtAsImages(name.value);
            const stats     = await pokeStats.getStatsOfPokemonAsHtml(name.value);

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