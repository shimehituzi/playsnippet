export type Nullable<T> = T | null | undefined

export const notNull = <T>(v: Nullable<T>): v is T => {
  return v !== null && v !== undefined
}
