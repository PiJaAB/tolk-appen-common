/**
 * Identicon.js 2.3.3
 * http://github.com/stewartlord/identicon.js
 *
 * Copyright 2018, Stewart Lord
 * Released under the BSD license
 * http://www.opensource.org/licenses/bsd-license.php
 */
export interface Options {
    background?: [number, number, number, number];
    size?: number;
    margin?: number;
    saturation?: number;
    brightness?: number;
    foreground?: [number, number, number, number] | [number, number, number];
    btoa?: (svg: string) => string;
}
export declare class Svg {
    readonly size: number;
    readonly foreground: string;
    readonly background: string;
    readonly rectangles: {
        readonly x: number;
        readonly y: number;
        readonly w: number;
        readonly h: number;
        readonly color: string;
    }[];
    constructor(size: number, foreground: [number, number, number, number] | [number, number, number], background: [number, number, number, number] | [number, number, number]);
    getDump(): string;
    getBase64(): string;
}
export default class Identicon {
    hash: string;
    background: [number, number, number, number];
    size: number;
    margin: number;
    foreground: [number, number, number, number] | [number, number, number];
    constructor(hash: string, options?: Options);
    render(): Svg;
    private rectangle;
    toString(raw?: boolean): string;
}
export declare function setBufferClass(bufferClass: typeof global.Buffer): void;
