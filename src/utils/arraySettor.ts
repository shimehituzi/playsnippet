import { RecoilState, useSetRecoilState } from 'recoil'
import { useCallback, useEffect } from 'react'
import { notNull, Nullable, NullableArray } from './nullable'

type SortDirection = 'ASC' | 'DESC'
type StringID = { id: string }

export const getArrayIndex = <T extends StringID>(
  arr: T[],
  item: T
): number => {
  return arr.findIndex((elem) => elem.id === item.id)
}

export const replaceArrayItem = <T>(
  arr: T[],
  index: number,
  newItem: T
): T[] => {
  return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)]
}

export const removeArrayItem = <T>(arr: T[], index: number): T[] => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)]
}

export const initArrayItems = <T>(items: T[]): T[] => {
  return items
}

export const createArrayItem = <T>(
  arr: T[],
  item: T,
  sd: SortDirection
): T[] => {
  switch (sd) {
    case 'DESC':
      return [item, ...arr]
    case 'ASC':
      return [...arr, item]
  }
}

export const newArrayItems = <T>(
  arr: T[],
  items: T[],
  sd: SortDirection
): T[] => {
  switch (sd) {
    case 'DESC':
      return [...items, ...arr]
    case 'ASC':
      return [...arr, ...items]
  }
}

export const appendArrayItems = <T extends StringID>(
  arr: T[],
  items: T[],
  sd: SortDirection
): T[] => {
  const itemIDs = items.map((v) => v.id)
  const filterd = arr.filter((v) => !itemIDs.includes(v.id))
  switch (sd) {
    case 'DESC':
      return [...filterd, ...items]
    case 'ASC':
      return [...items, ...filterd]
  }
}

export const updateArrayItem = <T extends StringID>(arr: T[], item: T): T[] => {
  const index = getArrayIndex<T>(arr, item)
  if (index === -1) return arr
  return replaceArrayItem(arr, index, item)
}

export const deleteArrayItem = <T extends StringID>(arr: T[], item: T): T[] => {
  const index = getArrayIndex<T>(arr, item)
  if (index === -1) return arr
  return removeArrayItem(arr, index)
}

export const useArraySettor = <O extends StringID, T extends O>(
  atom: RecoilState<O[]>,
  sd: SortDirection,
  omitOptionalField?: (item: T) => O
): {
  initItems: (items: NullableArray<T>) => void
  appendItems: (items: NullableArray<T>) => void
  newItems: (items: NullableArray<T>) => void
  createItem: (item: Nullable<T>) => void
  updateItem: (item: Nullable<T>) => void
  deleteItem: (item: Nullable<T>) => void
} => {
  const setArr = useSetRecoilState(atom)

  const omit = useCallback((item: T) => {
    if (omitOptionalField !== undefined) {
      return omitOptionalField(item)
    } else {
      return item as O
    }
  }, [])

  const initItems = useCallback((items: NullableArray<T>) => {
    if (items == null) return
    setArr(() => initArrayItems(items.filter(notNull).map(omit)))
  }, [])

  const appendItems = useCallback((items: NullableArray<T>) => {
    if (items == null) return
    setArr((arr) => appendArrayItems(arr, items.filter(notNull).map(omit), sd))
  }, [])

  const newItems = useCallback((items: NullableArray<T>) => {
    if (items == null) return
    setArr((arr) => newArrayItems(arr, items.filter(notNull).map(omit), sd))
  }, [])

  const createItem = useCallback((item: Nullable<T>) => {
    if (item == null) return
    setArr((arr) => createArrayItem(arr, omit(item), sd))
  }, [])

  const updateItem = useCallback((item: Nullable<T>) => {
    if (item == null) return
    setArr((arr) => updateArrayItem(arr, omit(item)))
  }, [])

  const deleteItem = useCallback((item: Nullable<T>) => {
    if (item == null) return
    setArr((arr) => deleteArrayItem(arr, omit(item)))
  }, [])

  const reset = useCallback(() => {
    setArr([])
  }, [])

  useEffect(() => {
    return reset
  }, [])

  return {
    initItems,
    appendItems,
    newItems,
    createItem,
    updateItem,
    deleteItem,
  }
}
