import * as pokeFetch from './pokeFetch.js';

export const getSprites = async function(searchTerm) {
    try {
        const pokemon = await pokeFetch.getByName(searchTerm);
        const sprites = await pokemon.sprites;
        return sprites;
    }
    catch(err) {
        console.error(`Cannot get sprites of[${searchTerm}] => ${err}`)
    }
};

export const getSpritesAsImages = async function(searchTerm) {
    try {
        const sprites = await getSprites(searchTerm);
        const list = [];
        Object.keys(sprites).forEach(key => {
            if (sprites[key] !== null) {
                if(key !== 'other' && key !== 'versions') {
                    list.push(`<img src='${sprites[key]}'>`);
                }else {
                    //console.warn(`ignoring key[${key}]`)
                }
            }
            else {
                //console.warn(`Key[${key}] is empty`)
            }
        });
        return list;
    }
    catch(err) {
        console.error(`Cannot transform to images => ${err}`)
    }
};

export const getSpriteAsHtml = async function(searchTerm) {
    try {
        const sprites = await getSpritesAsImages(searchTerm);
        let result = `<div class="art-box">`;
        sprites.forEach(e => {
            result += (e);
        });
        result += "</div>"
        return result;
    }
    catch(err) {
        console.error(`Cannot make html from sprite for[${searchTerm}] ${err}`);
    }
};

export const getOfficialArt = async function(searchTerm) {
    try {
        const sprites = await getSprites(searchTerm);
        const art = sprites['other']['official-artwork'];
        return art;
    }
    catch(err) {
        console.error(`Cannot get official-art for [${searchTerm}] => ${err}`);
    }
};

export const getOfficialArtAsImages = async function(searchTerm) {
    try {
        const art = await getOfficialArt(searchTerm);        
        const list = [];
        Object.keys(art).forEach(key => {
            if (art[key] !== null) {
                list.push(`<img src='${art[key]}'>`);
            }
            else {
                //console.warn(`Key[${key}] is empty`)
            }
        });
        return list;
    }
    catch(err) {
        console.error(`Cannot transform art to images => ${err}`)
    }
};