export type Nullable<T> = T | null | undefined

export type NullableArray<T> = Nullable<Nullable<T>[]>

export const notNull = <T>(v: Nullable<T>): v is T => {
  return v !== null && v !== undefined
}
