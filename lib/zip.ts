export function zip<T>(...arrays: T[][]): T[][] {
  if (arrays.length === 0) return [];
  let maxLength = 0;
  for (let i = 0; i < arrays.length; i++) {
    if (arrays[i].length > maxLength) maxLength = arrays[i].length;
  }

  const result: T[][] = [];
  for (let i = 0; i < maxLength; i++) {
    const group: T[] = [];
    for (let j = 0; j < arrays.length; j++) {
      group.push(arrays[j][i] as T);
    }
    result.push(group);
  }
  return result;
}