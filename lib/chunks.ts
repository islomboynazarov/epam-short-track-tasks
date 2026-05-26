export function chunk<T>(array: T[], size: number = 1): T[][] {
  if (size < 1 || !array.length) return [];
  const result: T[][] = [];
  let temp: T[] = [];

  for (let i = 0; i < array.length; i++) {
    temp.push(array[i]);
    if (temp.length === size || i === array.length - 1) {
      result.push(temp);
      temp = [];
    }
  }
  return result;
}