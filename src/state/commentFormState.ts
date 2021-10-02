import { atom } from 'recoil'
import { CreateCommentInput } from '../API'

export type CommentForm = Pick<CreateCommentInput, 'content'>

export const commentFormState = atom<CommentForm>({
  key: 'CommentFormState',
  default: {
    content: '',
  },
})
