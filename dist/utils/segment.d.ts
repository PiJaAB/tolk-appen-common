declare function segment<T>(arr: T[] | readonly T[], length: number): T[][];
declare function segment<T>(arr: IterableIterator<T>, length: number): IterableIterator<T[]>;
export default segment;
