import { atom } from 'recoil'
import { Comment } from '../API'

export type OmittedComment = Omit<Comment, 'post'>

export const commentsState = atom<OmittedComment[]>({
  key: 'commentsAtom',
  default: [],
})
