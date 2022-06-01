"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isObject(o) {
    return typeof o === 'object' && o != null && !Array.isArray(o);
}
exports.default = isObject;
