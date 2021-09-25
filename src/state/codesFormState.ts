import { atom } from 'recoil'
import { CreateCodeInput } from '../API'

type CodeForm = Pick<CreateCodeInput, 'name' | 'lang' | 'code'>

export const codesFormState = atom<CodeForm[]>({
  key: 'codesFormState',
  default: [],
})
