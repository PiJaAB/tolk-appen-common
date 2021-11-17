/* eslint-disable max-classes-per-file */
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

declare const btoa: ((value: string) => string) | undefined;

/* eslint-disable no-param-reassign, no-multi-assign, no-bitwise */
function hsl2rgb(h: number, s: number, b: number): [number, number, number] {
  h *= 6;
  const nums = [
    (b += s *= b < 0.5 ? b : 1 - b),
    b - (h % 1) * s * 2,
    (b -= s *= 2),
    b,
    b + (h % 1) * s,
    b + s,
  ];

  return [
    nums[~~h % 6] * 255, // red
    nums[(h | 16) % 6] * 255, // green
    nums[(h | 8) % 6] * 255, // blue
  ];
}
/* eslint-enable no-param-reassign, no-multi-assign, no-bitwise */
function rgbaToString(r: number, g: number, b: number): string;
function rgbaToString(r: number, g: number, b: number, a: number): string;
function rgbaToString(
  ...args:
    | [r: number, g: number, b: number]
    | [r: number, g: number, b: number, a: number]
): string;
function rgbaToString(
  ...[r, g, b, a = 255]:
    | [r: number, g: number, b: number]
    | [r: number, g: number, b: number, a: number]
): string {
  const values = [r, g, b].map(Math.round);
  values.push(a >= 0 && a <= 255 ? a / 255 : 1);
  return `rgba(${values.join(',')})`;
}

export class Svg {
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

  constructor(
    size: number,
    foreground: [number, number, number, number] | [number, number, number],
    background: [number, number, number, number] | [number, number, number],
  ) {
    this.size = size;
    this.foreground = rgbaToString(...foreground);
    this.background = rgbaToString(...background);
    this.rectangles = [];
  }

  getDump(): string {
    let i;
    let xml;
    let rect;
    const fg = this.foreground;
    const bg = this.background;
    const stroke = this.size * 0.005;

    xml =
      `${"<svg xmlns='http://www.w3.org/2000/svg' width='"}${
        this.size
      }' height='${this.size}'` +
      ` style='background-color:${bg};'>` +
      `<g style='fill:${fg}; stroke:${fg}; stroke-width:${stroke};'>`;

    for (i = 0; i < this.rectangles.length; i++) {
      rect = this.rectangles[i];
      if (rect.color !== bg) {
        xml +=
          `${"<rect x='"}${rect.x}'` +
          ` y='${rect.y}'` +
          ` width='${rect.w}'` +
          ` height='${rect.h}'` +
          `/>`;
      }
    }
    xml += '</g></svg>';

    return xml;
  }

  getBase64(): string {
    if (typeof btoa === 'function') {
      return btoa(this.getDump());
    }
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(this.getDump(), 'binary').toString('base64');
    }
    throw new Error('Cannot generate base64 output');
  }
}

export default class Identicon {
  hash: string;

  background: [number, number, number, number];

  size: number;

  margin: number;

  foreground: [number, number, number, number] | [number, number, number];

  constructor(hash: string, options?: Options);
  constructor(
    hash: string,
    {
      background = [240, 240, 240, 255],
      margin = 0.08,
      size = 64,
      saturation = 0.7,
      brightness = 0.5,
      foreground,
    }: Options = {},
  ) {
    this.hash = hash;
    this.background = background;
    this.size = size;
    this.margin = margin;
    this.foreground =
      foreground == null
        ? hsl2rgb(
            parseInt(hash.substr(-7), 16) / 0xfffffff,
            saturation,
            brightness,
          )
        : foreground;
  }

  render(): Svg {
    const image = new Svg(this.size, this.foreground, this.background);
    const { size } = this;
    const baseMargin = Math.floor(size * this.margin);
    const cell = Math.floor((size - baseMargin * 2) / 5);
    const margin = Math.floor((size - cell * 5) / 2);
    const bg = rgbaToString(...this.background);
    const fg = rgbaToString(...this.foreground);

    // the first 15 characters of the hash control the pixels (even/odd)
    // they are drawn down the middle first, then mirrored outwards
    let i;
    let color;
    for (i = 0; i < 15; i++) {
      color = parseInt(this.hash.charAt(i), 16) % 2 ? bg : fg;
      if (i < 5) {
        this.rectangle(
          2 * cell + margin,
          i * cell + margin,
          cell,
          cell,
          color,
          image,
        );
      } else if (i < 10) {
        this.rectangle(
          1 * cell + margin,
          (i - 5) * cell + margin,
          cell,
          cell,
          color,
          image,
        );
        this.rectangle(
          3 * cell + margin,
          (i - 5) * cell + margin,
          cell,
          cell,
          color,
          image,
        );
      } else if (i < 15) {
        this.rectangle(
          0 * cell + margin,
          (i - 10) * cell + margin,
          cell,
          cell,
          color,
          image,
        );
        this.rectangle(
          4 * cell + margin,
          (i - 10) * cell + margin,
          cell,
          cell,
          color,
          image,
        );
      }
    }

    return image;
  }

  private rectangle(
    x: number,
    y: number,
    w: number,
    h: number,
    color: string,
    image: Svg,
  ) {
    image.rectangles.push({ x, y, w, h, color });
  }

  toString(raw?: boolean): string {
    // backward compatibility with old toString, default to base64
    if (raw) {
      return this.render().getDump();
    }
    return this.render().getBase64();
  }
}
