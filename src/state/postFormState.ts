import { atom } from 'recoil'
import { CreatePostInput } from '../API'

export type PostForm = Pick<CreatePostInput, 'title' | 'content'>

export const postFormState = atom<PostForm>({
  key: 'PostFormFormState',
  default: {
    title: '',
    content: '',
  },
})
