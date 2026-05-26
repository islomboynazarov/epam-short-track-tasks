export function forEach<T>(array: T[], iteratee: (value: T, index: number, arr: T[]) => void): void {
  for (let i = 0; i < array.length; i++) {
    iteratee(array[i], i, array);
  }
}

export function filterArray<T>(array: T[], predicate: (value: T, index: number) => boolean): T[] {
  const result: T[] = [];
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i], i)) {
      result.push(array[i]);
    }
  }
  return result;
}

export function mapArray<T, U>(array: T[], iteratee: (value: T, index: number) => U): U[] {
  const result: U[] = [];
  for (let i = 0; i < array.length; i++) {
    result.push(iteratee(array[i], i));
  }
  return result;
}