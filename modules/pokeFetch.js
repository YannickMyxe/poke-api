
export const maxPokemonIndex = 898; 

const pokeFetch = async function(url) {
    try {
        const fullURL = `https://pokeapi.co/api/v2/${url}`
        const res = await fetch(`${fullURL}`)
        const data = await res.json();
        return data;
    }
    catch(err) {
        console.error(`Pokefetch failure: ${err}`);
    }
};

export const getByName = async function(name) {
    try {
        const pokemon = await pokeFetch(`pokemon/${name}`);
        return pokemon;
    }
    catch(err) {
        console.error(`Cannot get pokemon by name: [${name}] => ${err}`)
    }
};

export const getByNationalIndex = async function(index) {
    return await getByName(`${index}`);
};

export const getTypesOfIdOrName = async function(searchTerm) {
    const fetchResult = await getByName(searchTerm);
    return fetchResult.types;
};

export const getSimplifiedTypes = async function(searchTerm) {
    try {
        const fetchResult = await getByName(searchTerm);
        let types = [];
        types.push(fetchResult.types[0].type.name);
        if (fetchResult.types[1] !== undefined) {
            types.push(fetchResult.types[1].type.name);
        }
        return {list: types}
    }
    catch(err) {
        console.error(`Cannot get type of [${searchTerm}] => ${err}`)
    }
};

export const getTypeInfo = async function(searchTerm) {
    return await pokeFetch(`type/${searchTerm}`);
};


export const getListWithLimit = async function(limit, offset = 0) {
    try {
        const list = await pokeFetch(`pokemon?limit=${limit}&offset=${offset}`);
        return list;
    }
    catch(err) {
        console.error(`Cannot get list[ ${limit}, ${offset} ]`);
    }
}

export const getFullList = async function() {
    try {
        // Using this instead of 10000 doesn't give us the special forms we dont want
        const list = await getListWithLimit(maxPokemonIndex);
        return list;
    }
    catch(err) {
        console.error(`Cannot build full list`);
    }
};