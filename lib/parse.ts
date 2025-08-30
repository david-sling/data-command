export const removeFalsy = <T extends object>(obj: T): NullsRemoved<T> =>
  obj &&
  Object.entries(obj).reduce(
    (acc, [key, value]) =>
      !value
        ? acc
        : {
            ...acc,
            [key]: value,
          },
    {} as NullsRemoved<T>
  );

export type NullsRemoved<T extends object> = {
  [K in keyof T]: T[K] extends null
    ? NonNullable<T[K]> | undefined
    : NonNullable<T[K]>;
};
