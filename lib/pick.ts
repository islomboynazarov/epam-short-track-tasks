import { AnyObject } from "./types";
import { getKeys } from "./utils/objectUtils";

export function pick<T extends AnyObject, K extends keyof T>(object: T, ...paths: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (let i = 0; i < paths.length; i++) {
    const key = paths[i];
    if (key in object) {
      (result as any)[key] = object[key];
    }
  }
  return result;
}