export function drop<T>(array: T[], n: number = 1): T[] {
  const result: T[] = [];
  for (let i = n; i < array.length; i++) {
    result.push(array[i]);
  }
  return result;
}