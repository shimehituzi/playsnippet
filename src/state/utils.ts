import { RecoilState, useRecoilState } from 'recoil'

type SortDirection = 'ASC' | 'DESC'

export const getIndex = <T>(arr: T[], item: T): number => {
  return arr.findIndex((elem) => elem === item)
}

export const replaceItem = <T>(arr: T[], index: number, newItem: T): T[] => {
  return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)]
}

export const removeItem = <T>(arr: T[], index: number): T[] => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)]
}

export const initItems = <T>(items: T[]): T[] => {
  return items
}

export const appendItems = <T>(
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

export const createItem = <T>(arr: T[], item: T, sd: SortDirection): T[] => {
  switch (sd) {
    case 'DESC':
      return [item, ...arr]
    case 'ASC':
      return [...arr, item]
  }
}

export const updateItem = <T>(arr: T[], prevItem: T, newItem: T): T[] => {
  return replaceItem(arr, getIndex<T>(arr, prevItem), newItem)
}

export const deleteItem = <T>(arr: T[], item: T): T[] => {
  return removeItem(arr, getIndex<T>(arr, item))
}

export const useArraySettor = <T>(
  atom: RecoilState<T[]>,
  sd: SortDirection
): {
  setInitItems: (items: T[]) => void
  setAppendItems: (items: T[]) => void
  setCreateItem: (item: T) => void
  setUpdateItem: (prevItem: T, newItem: T) => void
  setDeleteItem: (item: T) => void
} => {
  const [arr, setArr] = useRecoilState(atom)

  const setInitItems = (items: T[]) => {
    setArr(initItems(items))
  }

  const setAppendItems = (items: T[]) => {
    setArr(appendItems(arr, items, sd))
  }

  const setCreateItem = (item: T) => {
    setArr(createItem(arr, item, sd))
  }

  const setUpdateItem = (prevItem: T, newItem: T) => {
    setArr(updateItem(arr, prevItem, newItem))
  }

  const setDeleteItem = (item: T) => {
    setArr(deleteItem(arr, item))
  }

  return {
    setInitItems,
    setAppendItems,
    setCreateItem,
    setDeleteItem,
    setUpdateItem,
  }
}
