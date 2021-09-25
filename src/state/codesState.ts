import { atom } from 'recoil'
import { Code } from '../API'

export type OmittedCode = Omit<Code, 'post'>

export const codesState = atom<OmittedCode[]>({
  key: 'codesAtom',
  default: [],
})
