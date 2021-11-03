import { RecoilState, useSetRecoilState } from 'recoil'

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
  sd: SortDirection
): {
  initItems: (items: T[]) => void
  appendItems: (items: T[]) => void
  createItem: (item: T) => void
  updateItem: (item: T) => void
  deleteItem: (item: T) => void
} => {
  const setArr = useSetRecoilState(atom)

  const initItems = (items: T[]) => {
    setArr(() => initArrayItems(items))
  }

  const appendItems = (items: T[]) => {
    setArr((arr) => appendArrayItems(arr, items, sd))
  }

  const createItem = (item: T) => {
    setArr((arr) => createArrayItem(arr, item, sd))
  }

  const updateItem = (item: T) => {
    setArr((arr) => updateArrayItem(arr, item))
  }

  const deleteItem = (item: T) => {
    setArr((arr) => deleteArrayItem(arr, item))
  }

  return {
    initItems,
    appendItems,
    createItem,
    updateItem,
    deleteItem,
  }
}
