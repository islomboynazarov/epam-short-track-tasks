import { AnyObject } from "./types";
import { getKeys } from "./utils/objectUtils";

export function toPairs<T>(object: Record<string, T>): [string, T][] {
  const result: [string, T][] = [];
  const keys = getKeys(object);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    result.push([key, object[key]]);
  }
  return result;
}