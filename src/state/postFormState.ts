import { atom } from 'recoil'
import { CreatePostInput } from '../API'

type PostForm = Pick<CreatePostInput, 'title' | 'content'>

export const PostFormState = atom<PostForm>({
  key: 'PostFormFormState',
  default: {
    title: '',
    content: '',
  },
})
