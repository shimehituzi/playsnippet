import { atom } from 'recoil'
import { CreatePostInput, CreateCodeInput } from '../API'

export type PostFormState = Pick<CreatePostInput, 'title' | 'content'>

export const postFormState = atom<PostFormState>({
  key: 'PostFormFormState',
  default: {
    title: '',
    content: '',
  },
})

export const editPostFormState = atom<PostFormState>({
  key: 'editPostFormFormState',
  default: {
    title: '',
    content: '',
  },
})

export type CodeFormState = Pick<
  CreateCodeInput,
  'title' | 'content' | 'lang'
> & { id: string }

export const codesFormState = atom<CodeFormState[]>({
  key: 'codesFormState',
  default: [],
})

export const editCodesFormState = atom<CodeFormState[]>({
  key: 'editCodesFormState',
  default: [],
})
