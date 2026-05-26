import { Predicate } from "./types";

export function dropWhile<T>(array: T[], predicate: Predicate<T>): T[] {
  let index = 0;
  for (let i = 0; i < array.length; i++) {
    if (!predicate(array[i], i, array)) {
      index = i;
      break;
    }
    index = i + 1;
  }
  const result: T[] = [];
  for (let i = index; i < array.length; i++) {
    result.push(array[i]);
  }
  return result;
}