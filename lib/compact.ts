export function compact<T>(array: T[]): T[] {
  const result: T[] = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] !== null && array[i] !== undefined && array[i] !== false && array[i] !== 0 && array[i] !== "") {
      result.push(array[i]);
    }
  }
  return result;
}