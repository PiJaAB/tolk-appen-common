"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIdenticon = exports.useGetIdenticon = exports.IdenticonProvider = void 0;
const react_1 = __importStar(require("react"));
const index_js_1 = __importDefault(require("../lib/identicon.js/index.js"));
const seedRandom_1 = __importDefault(require("../utils/seedRandom"));
const context = (0, react_1.createContext)(() => {
    throw new Error('Not initialized');
});
const COLORS = [
    [255, 181, 232],
    [255, 154, 238],
    [255, 204, 249],
    [253, 192, 255],
    [247, 165, 255],
    [177, 141, 255],
    [199, 164, 255],
    [215, 171, 255],
    [237, 212, 254],
    [250, 227, 255],
    [220, 211, 254],
    [166, 154, 255],
    [182, 185, 255],
    [150, 160, 254],
    [175, 202, 255],
    [173, 249, 215],
    [196, 250, 248],
    [134, 226, 255],
    [174, 231, 255],
    [110, 182, 255],
    [190, 253, 195],
    [217, 255, 212],
    [242, 255, 226],
    [231, 255, 168],
    [255, 255, 207],
    [254, 201, 220],
    [255, 171, 171],
    [255, 189, 188],
    [255, 203, 192],
    [254, 244, 186],
];
const MAX_IDENTICONS = 200;
function IdenticonProvider({ children, }) {
    const identiconMap = (0, react_1.useRef)(new Map());
    const value = (0, react_1.useCallback)((id) => {
        const cur = identiconMap.current.get(id);
        if (cur != null) {
            // reset the insert time
            identiconMap.current.delete(id);
            identiconMap.current.set(id, cur);
            return cur;
        }
        const color = COLORS[Math.floor((0, seedRandom_1.default)(id, 2)() * COLORS.length)];
        const identicon = new index_js_1.default(id, {
            background: [128, 128, 128, 128],
            foreground: color,
            margin: 0.2,
        });
        identiconMap.current.set(id, identicon);
        if (identiconMap.current.size > MAX_IDENTICONS) {
            const [first] = identiconMap.current.keys();
            identiconMap.current.delete(first);
        }
        return identicon;
    }, []);
    return react_1.default.createElement(context.Provider, { value }, children);
}
exports.IdenticonProvider = IdenticonProvider;
function useGetIdenticon() {
    return (0, react_1.useContext)(context);
}
exports.useGetIdenticon = useGetIdenticon;
function useIdenticon(id) {
    return (0, react_1.useContext)(context)(id);
}
exports.useIdenticon = useIdenticon;
