import { atom } from 'recoil'
import { CreatePostInput, CreateCodeInput, CreateCommentInput } from '../API'

export type PostForm = Pick<CreatePostInput, 'title' | 'content'>

export const postFormState = atom<PostForm>({
  key: 'PostFormFormState',
  default: {
    title: '',
    content: '',
  },
})

export type CommentForm = Pick<CreateCommentInput, 'content'>

export const commentFormState = atom<CommentForm>({
  key: 'CommentFormState',
  default: {
    content: '',
  },
})

export type CodeForm = Pick<CreateCodeInput, 'title' | 'content' | 'lang'>

export const codesFormState = atom<CodeForm[]>({
  key: 'codesFormState',
  default: [],
})
