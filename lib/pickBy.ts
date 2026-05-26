import { AnyObject, ObjectPredicate } from "./types";
import { getKeys } from "./utils/objectUtils";

export function pickBy<T extends AnyObject>(object: T, predicate: ObjectPredicate<T>): Partial<T> {
  const result = {} as Partial<T>;
  const keys = getKeys(object);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (predicate(object[key], key)) {
      (result as any)[key] = object[key];
    }
  }
  return result;
}