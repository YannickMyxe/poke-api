import * as pokeFetch from './modules/pokeFetch.js'
import * as pokeRandom from './modules/pokeRandom.js'
import * as pokeTypes from './modules/types.js';
import {randomize} from './modules/randomizer.js';
import { getSprites, getSpritesAsImages } from './modules/getSprites.js';

(async function() {

    const inner = document.querySelector("#test-bar>div");
    const val = 140;
    inner.style.width = (val / 255) * 100 + "%";
})();