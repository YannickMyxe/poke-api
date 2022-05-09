
import * as pokeFetch from "./pokeFetch.js";

export const getTypeRefrence = async function(searchTerm) {
    try {
        const res = await pokeFetch.getTypeInfo(searchTerm);
        return res.id;
    }
    catch(err) {
        console.error(`Cannot get refrence for [${searchTerm}] => ${err}`);
    }
};

export const getType = async function(typename) {
    const res = await pokeFetch.pokeFetch(`type/${typename}`)
    if (res === undefined) throw new Error(`Cannot get type of [${typename}]`);
    return res;
};

export const getTypeHtml = async function(type) {
    try {
        const gType = await getType(type);
        let typeHtml = `<p class="type ${gType.name}">${gType.name}</p>`;
        console.info(typeHtml)
        return typeHtml;
    }
    catch(err) {
        console.error(`Cannot convert to type ${type} => ${err}`);
    }
};

export const getTypesFromPokemonAsHtml = async function(searchTerm) {
    try {
        const simplifiedTypes = await pokeFetch.getSimplifiedTypes(searchTerm);
        let types = `<div class="type-box">`;
        simplifiedTypes.list.forEach(t => {
            types += `<p class="type ${t}">${t}</p>`;
        })
        types += `</div>`;
        return types;
    }
    catch(err) {
        console.error(`Cannot convert to types => ${err}`);
    }

};