function segmentArr<T>(arr: T[], length: number) {
  const segments = new Array<T[]>(Math.ceil(arr.length / length));
  for (let i = 0; i < segments.length; i++) {
    segments[i] = arr.slice(i * length, (i + 1) * length);
  }
  return segments;
}

function segmentIterator<T>(
  arr: { [Symbol.iterator]: () => IterableIterator<T> },
  length: number,
): IterableIterator<T[]> {
  const iterator = (arr as readonly T[])[Symbol.iterator]();
  let isDone = false;
  const segmentedIterator: Iterator<T[], undefined> = {
    next() {
      if (isDone || length === 0) return { value: undefined, done: true };
      let itRes: IteratorResult<T, unknown> | undefined;
      const seg: T[] = [];
      // eslint-disable-next-line no-cond-assign
      for (let i = 0; i < length && !(itRes = iterator.next()).done; i++) {
        seg.push(itRes.value);
      }
      if (itRes?.done) isDone = true;
      return { value: seg, done: false };
    },
  };
  return Object.assign(segmentedIterator, {
    [Symbol.iterator]() {
      return segmentIterator(arr, length);
    },
  });
}

function segment<T>(arr: T[] | readonly T[], length: number): T[][];
function segment<T>(
  arr: IterableIterator<T>,
  length: number,
): IterableIterator<T[]>;
function segment<T>(
  arr: IterableIterator<T> | T[] | readonly T[],
  length: number,
): T[][] | IterableIterator<T[]> {
  if (length <= 0) throw new RangeError('length must be a positive integer');
  if (Array.isArray(arr)) {
    return segmentArr(arr, length);
  }
  return segmentIterator(arr, length);
}

export default segment;
