import * as pokeFetch from "./pokeFetch.js";

export const getStatsOfPokemon = async function(searchTerm) {
    const pokemon = await pokeFetch.getByName(searchTerm);
    const stats = pokemon.stats;
    console.info(stats);
    return stats;
};

export const getStatsOfPokemonAsHtml = async function(searchTerm) {
    const stats = await getStatsOfPokemon(searchTerm);
    let result = `<div class="stats-box">`;

    stats.forEach(element => {
        const number = element["base_stat"];
        const name = element["stat"]["name"];
        const width = (number / 255) * 100 + "%";

        const bar = `
        <div class="bar">
            <div class="inner-bar ${name}" style="width: ${width};"></div>
        </div>
        `;

        result += `<p>${name}: ${number}</p> ${bar}`
    });
    result += `</div>`;
    return result
};