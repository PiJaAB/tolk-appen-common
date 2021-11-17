import React, { createContext, useCallback, useContext, useRef } from 'react';
import Identicon from '../lib/identicon.js/index.js';
import seedRandom from '../utils/seedRandom';

const context = createContext<(id: string) => Identicon>(() => {
  throw new Error('Not initialized');
});

const COLORS: [number, number, number][] = [
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

export function IdenticonProvider({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element {
  const identiconMap = useRef(new Map<string, Identicon>());
  const value = useCallback((id: string) => {
    const cur = identiconMap.current.get(id);
    if (cur != null) {
      // reset the insert time
      identiconMap.current.delete(id);
      identiconMap.current.set(id, cur);
      return cur;
    }
    const color = COLORS[Math.floor(seedRandom(id, 2)() * COLORS.length)];
    const identicon = new Identicon(id, {
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
  return React.createElement(context.Provider, { value }, children);
}

export function useGetIdenticon(): (id: string) => Identicon {
  return useContext(context);
}

export function useIdenticon(id: string): Identicon {
  return useContext(context)(id);
}
