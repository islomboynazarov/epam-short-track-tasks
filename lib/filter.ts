import { Predicate } from "./types";

export function filter<T>(array: T[], predicate: Predicate<T>): T[] {
  const result: T[] = [];
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i], i, array)) {
      result.push(array[i]);
    }
  }
  return result;
}