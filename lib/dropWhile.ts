import { Predicate } from "./types";
import { forEach } from "./utils/arrayUtils";

export function dropWhile<T>(array: T[], predicate: Predicate<T>): T[] {
  let index = 0;
  forEach(array, (value, i) => {
    if (predicate(value, i, array)) {
      index = i + 1;
    } else {
      return false; // break simulation
    }
  });

  return array.slice(index); }// Wait — we can't use slice! Let's fix it properly.