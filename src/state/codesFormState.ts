import { atom } from 'recoil'
import { CreateCodeInput } from '../API'

type CodeForm = Pick<CreateCodeInput, 'title' | 'content' | 'lang'>

export const codesFormState = atom<CodeForm[]>({
  key: 'codesFormState',
  default: [],
})
