
import * as pokeFetch from "./pokeFetch.js";

export const getTypeRefrence = async function(searchTerm) {
    const res = await pokeFetch.getTypeInfo(searchTerm);
    return res.id;
};

export const getTypesAsHtml = async function(searchTerm) {
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