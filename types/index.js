import * as pokeFetch from '../modules/pokeFetch.js';
import * as getSprites from '../modules/getSprites.js';
import * as pokeTypes from '../modules/types.js';
import * as pokeStats from '../modules/stats.js';

(async function() {

    const getTypesFromPokemon = document.querySelector('#getTypesFromPokemon');
    const name = document.querySelector("#name");
    const result = document.querySelector("#result");
    if (getTypesFromPokemon === null) return;

    getTypesFromPokemon.addEventListener('click', async () => {
        try {
        const pokeName = name.value.toLowerCase();
        if (pokeName === undefined || pokeName === null || pokeName === "") {
            console.warn(`Field is empty! ['${pokeName}']`);
            throw new Error(`The search-term cannot be empty, expecting a valid number / name`);
        }
        const type = await pokeTypes.getTypesFromPokemonAsHtml(pokeName);
        result.innerHTML = type;
        }
        catch (err) {
            result.innerHTML = `<p class="error">${err.message}</p>`
        }
    });

}) ();

(async function() {

    const getTypeInfo = document.querySelector('#getTypeInfo');
    const name = document.querySelector("#type-name");
    const result = document.querySelector("#type-result");
    if (getTypeInfo === null) return;

    getTypeInfo.addEventListener('click', async () => {
        try {
            const typename = name.value.toLowerCase();
            if (typename === undefined || typename === null || typename === "") {
                console.warn(`Field is empty! ['${typename}']`);
                throw new Error(`The search-term cannot be empty, expecting a valid number / name`);
            }
            const typeInfo = await pokeTypes.getType(typename);
            const damageRelations = typeInfo["damage_relations"];
            console.log(damageRelations);

            result.innerHTML = ``;
            const attacksSuper = damageRelations["double_damage_to"].map(e => {
                return e.name;
            });
            const attacksNotVerry = damageRelations["half_damage_to"].map(e => {
                return e.name;
            });
            const defenseSuper = damageRelations["double_damage_from"].map(e => {
                return e.name;
            });
            const defenseNotVerry = damageRelations["half_damage_from"].map(e => {
                return e.name;
            });
            const attacksNoEffect = damageRelations["no_damage_to"].map(e => {
                return e.name;
            });
            const defenseNoEffect = damageRelations["no_damage_from"].map(e => {
                return e.name;
            });

            result.innerHTML += `<div class="type-effects">Attacks are Suppereffective against: `
            attacksSuper.forEach(e => {
                result.innerHTML += `<p class="type ${e}">${e}</p>`;
            });
            result.innerHTML += `</div>`;

            result.innerHTML += `<div class="type-effects">Attacks are Not verry Effective against: `
            attacksNotVerry.forEach(e => {
                result.innerHTML += `<p class="type ${e}">${e}</p>`;
            });
            result.innerHTML += `</div>`;

            result.innerHTML += `<div class="type-effects">Attacks have no effect against: `
            attacksNoEffect.forEach(e => {
                result.innerHTML += `<p class="type ${e}">${e}</p>`;
            });
            result.innerHTML += `</div>`;

            result.innerHTML += `<div class="type-effects">Defense against are supperefective:  `
            defenseSuper.forEach(e => {
                result.innerHTML += `<p class="type ${e}">${e}</p>`;
            });
            result.innerHTML += `</div>`;
            
            result.innerHTML += `<div class="type-effects">Moves against you are not verry effective:  `
            defenseNotVerry.forEach(e => {
                result.innerHTML += `<p class="type ${e}">${e}</p>`;
            });
            result.innerHTML += `</div>`;
            
            result.innerHTML += `<div class="type-effects">Moves against you have no effect:  `
            defenseNoEffect.forEach(e => {
                result.innerHTML += `<p class="type ${e}">${e}</p>`;
            });
            result.innerHTML += `</div>`;
            


        }
        catch (err) {
            result.innerHTML = `<p class="error">${err.message}</p>`
        }
    });

}) ();