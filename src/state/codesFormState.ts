import { atom } from 'recoil'
import { CreateCodeInput } from '../API'

export type CodeForm = Pick<CreateCodeInput, 'title' | 'content' | 'lang'>

export const codesFormState = atom<CodeForm[]>({
  key: 'codesFormState',
  default: [],
})
