export type Predicate<T> = (value: T, index?: number, array?: T[]) => boolean;
export type ObjectPredicate<T> = (value: T[keyof T], key: string) => boolean;
export type AnyObject = Record<string, any>;
export interface ZipResult<T> {
    [index: number]: T[];
}
//# sourceMappingURL=types.d.ts.map