export function map<T, U>(array: T[], iteratee: (value: T, index: number) => U): U[] {
  const result: U[] = [];
  for (let i = 0; i < array.length; i++) {
    result.push(iteratee(array[i], i));
  }
  return result;
}