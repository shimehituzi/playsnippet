import { RecoilState, useSetRecoilState } from 'recoil'
import { useCallback } from 'react'
import { Nullable } from './nullable'

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

export const appendArrayItems = <T>(
  arr: T[],
  items: T[],
  sd: SortDirection
): T[] => {
  switch (sd) {
    case 'DESC':
      return [...arr, ...items]
    case 'ASC':
      return [...items, ...arr]
  }
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

export const updateArrayItem = <T extends StringID>(arr: T[], item: T): T[] => {
  return replaceArrayItem(arr, getArrayIndex<T>(arr, item), item)
}

export const deleteArrayItem = <T extends StringID>(arr: T[], item: T): T[] => {
  return removeArrayItem(arr, getArrayIndex<T>(arr, item))
}

export const useArraySettor = <T extends StringID>(
  atom: RecoilState<T[]>,
  sd: SortDirection,
  omitOptionField?: (item: T) => T
): {
  initItems: (items: Nullable<T[]>) => void
  appendItems: (items: Nullable<T[]>) => void
  createItem: (item: Nullable<T>) => void
  updateItem: (item: Nullable<T>) => void
  deleteItem: (item: Nullable<T>) => void
} => {
  const setArr = useSetRecoilState(atom)

  const omit = useCallback(
    (item: T) => (omitOptionField !== undefined ? omitOptionField(item) : item),
    []
  )

  const initItems = useCallback((items: Nullable<T[]>) => {
    if (items == null) return
    setArr(() => initArrayItems(items.filter(omit)))
  }, [])

  const appendItems = useCallback((items: Nullable<T[]>) => {
    if (items == null) return
    setArr((arr) => appendArrayItems(arr, items.filter(omit), sd))
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

  return {
    initItems,
    appendItems,
    createItem,
    updateItem,
    deleteItem,
  }
}
