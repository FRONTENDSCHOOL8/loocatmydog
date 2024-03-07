export type CreateStore<T> = (
  set: (
    partial: T | Partial<T> | ((state: T) => T | Partial<T>),
    replace?: boolean | undefined,
    label?: string
  ) => void
) => T;
