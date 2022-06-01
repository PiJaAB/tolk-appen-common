"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function segmentArr(arr, length) {
    const segments = new Array(Math.ceil(arr.length / length));
    for (let i = 0; i < segments.length; i++) {
        segments[i] = arr.slice(i * length, (i + 1) * length);
    }
    return segments;
}
function segmentIterator(arr, length) {
    const iterator = arr[Symbol.iterator]();
    let isDone = false;
    const segmentedIterator = {
        next() {
            if (isDone || length === 0)
                return { value: undefined, done: true };
            let itRes;
            const seg = [];
            // eslint-disable-next-line no-cond-assign
            for (let i = 0; i < length && !(itRes = iterator.next()).done; i++) {
                seg.push(itRes.value);
            }
            if (itRes === null || itRes === void 0 ? void 0 : itRes.done)
                isDone = true;
            return { value: seg, done: false };
        },
    };
    return Object.assign(segmentedIterator, {
        [Symbol.iterator]() {
            return segmentIterator(arr, length);
        },
    });
}
function segment(arr, length) {
    if (length <= 0)
        throw new RangeError('length must be a positive integer');
    if (Array.isArray(arr)) {
        return segmentArr(arr, length);
    }
    return segmentIterator(arr, length);
}
exports.default = segment;
