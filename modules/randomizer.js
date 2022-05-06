

export const randomize = function(max, inclusive=false) {
    return randomizeWithStart(0, max, inclusive);
};

export const randomizeWithStart = function(min, max, inclusive=false) {
    if (inclusive) max++;
    return Math.floor(Math.random() * (max - min)) + min;
};