import { atom } from 'recoil'
import { Comment } from '../API'
import { useArraySettor } from './utils'

export const commentsState = atom<Comment[]>({
  key: 'commentsAtom',
  default: [],
})

export const useCommentsSettor = (): {
  initComments: (items: Comment[]) => void
  appendComments: (items: Comment[]) => void
  createComment: (item: Comment) => void
  updateComment: (prevItem: Comment, newItem: Comment) => void
  deleteComment: (item: Comment) => void
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
