import { AnyObject } from "../types";

export function getKeys(obj: AnyObject): string[] {
  const keys: string[] = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      keys.push(key);
    }
  }
  return keys;
}

export function getValues<T>(obj: Record<string, T>): T[] {
  const values: T[] = [];
  const keys = getKeys(obj);
  for (let i = 0; i < keys.length; i++) {
    values.push(obj[keys[i]]);
  }
  return values;
}