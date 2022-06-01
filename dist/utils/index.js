"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedRandom = exports.isObject = exports.segment = void 0;
__exportStar(require("./types"), exports);
var segment_1 = require("./segment");
Object.defineProperty(exports, "segment", { enumerable: true, get: function () { return __importDefault(segment_1).default; } });
var isObject_1 = require("./isObject");
Object.defineProperty(exports, "isObject", { enumerable: true, get: function () { return __importDefault(isObject_1).default; } });
var seedRandom_1 = require("./seedRandom");
Object.defineProperty(exports, "seedRandom", { enumerable: true, get: function () { return __importDefault(seedRandom_1).default; } });
