import { AnyObject } from "./types";
import { getKeys } from "./utils/objectUtils";

export function omit<T extends AnyObject>(object: T, ...paths: string[]): Omit<T, string> {
  const result = {} as Omit<T, string>;
  const keys = getKeys(object);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (!paths.includes(key)) {
      (result as any)[key] = object[key];
    }
  }
  return result;
}