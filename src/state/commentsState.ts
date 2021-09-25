import { atom } from 'recoil'
import { Comment } from '../API'
import { useArraySettor } from './utils'

export type OmittedComment = Omit<Comment, 'post'>

export const commentsState = atom<OmittedComment[]>({
  key: 'commentsAtom',
  default: [],
})

export const useCommentsSettor = (): {
  initComments: (items: OmittedComment[]) => void
  appendComments: (items: OmittedComment[]) => void
  createComment: (item: OmittedComment) => void
  updateComment: (prevItem: OmittedComment, newItem: OmittedComment) => void
  deleteComment: (item: OmittedComment) => void
} => {
  const settor = useArraySettor(commentsState, 'ASC')

  return {
    initComments: settor.setInitItems,
    appendComments: settor.setAppendItems,
    createComment: settor.setCreateItem,
    updateComment: settor.setUpdateItem,
    deleteComment: settor.setDeleteItem,
  }
}
