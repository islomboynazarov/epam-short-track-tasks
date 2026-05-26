import { AnyObject } from "./types";
import { getKeys } from "./utils/objectUtils";

export function merge(target: AnyObject, ...sources: AnyObject[]): AnyObject {
  for (let i = 0; i < sources.length; i++) {
    const source = sources[i];
    const keys = getKeys(source);
    for (let j = 0; j < keys.length; j++) {
      const key = keys[j];
      target[key] = source[key];
    }
  }
  return target;
}