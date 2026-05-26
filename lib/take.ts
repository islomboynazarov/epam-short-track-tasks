export function take<T>(array: T[], n: number = 1): T[] {
  const result: T[] = [];
  const limit = Math.min(n, array.length);
  for (let i = 0; i < limit; i++) {
    result.push(array[i]);
  }
  return result;
}