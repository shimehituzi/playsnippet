import { atom } from 'recoil'
import { CreatePostInput } from '../API'

type PostForm = Pick<CreatePostInput, 'content'>

export const PostFormState = atom<PostForm>({
  key: 'PostFormFormState',
  default: {
    content: '',
  },
})
