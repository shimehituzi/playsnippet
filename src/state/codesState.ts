import { atom } from 'recoil'
import { Code } from '../API'
import { useArraySettor } from './utils'

export const codesState = atom<Code[]>({
  key: 'codesAtom',
  default: [],
})

export const useCodesSettor = (): {
  initCodes: (items: Code[]) => void
  appendCodes: (items: Code[]) => void
  createCode: (item: Code) => void
  updateCode: (prevItem: Code, newItem: Code) => void
  deleteCode: (item: Code) => void
} => {
  const settor = useArraySettor(codesState, 'ASC')

  return {
    initCodes: settor.setInitItems,
    appendCodes: settor.setAppendItems,
    createCode: settor.setCreateItem,
    updateCode: settor.setUpdateItem,
    deleteCode: settor.setDeleteItem,
  }
}
