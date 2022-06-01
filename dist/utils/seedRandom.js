"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modulus = 2 ** 32;
const a = 1664525;
const c = 1013904223;
function seedRandom(seedInput, primings = 1) {
    let seed = typeof seedInput === 'number'
        ? seedInput % modulus
        : [...seedInput].reduce((acc, char) => {
            return (acc + char.charCodeAt(0)) % modulus;
        }, 0);
    function next() {
        const returnVal = seed / modulus;
        seed = (a * seed + c) % modulus;
        return returnVal;
    }
    for (let i = 0; i < primings; i++) {
        next();
    }
    return next;
}
exports.default = seedRandom;
