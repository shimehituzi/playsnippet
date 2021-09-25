import { atom } from 'recoil'
import { Code } from '../API'
import { useArraySettor } from './utils'

export type OmittedCode = Omit<Code, 'post'>

export const codesState = atom<OmittedCode[]>({
  key: 'codesAtom',
  default: [],
})

export const useCodesSettor = (): {
  initCodes: (items: OmittedCode[]) => void
  appendCodes: (items: OmittedCode[]) => void
  createCode: (item: OmittedCode) => void
  updateCode: (prevItem: OmittedCode, newItem: OmittedCode) => void
  deleteCode: (item: OmittedCode) => void
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
