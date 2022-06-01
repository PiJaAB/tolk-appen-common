import React from 'react';
import Identicon from '../lib/identicon.js/index.js';
export declare function IdenticonProvider({ children, }: {
    children?: React.ReactNode;
}): JSX.Element;
export declare function useGetIdenticon(): (id: string) => Identicon;
export declare function useIdenticon(id: string): Identicon;
