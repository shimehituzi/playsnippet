import { atom, selector } from 'recoil'
import { Post } from '../API'
import { codesState } from './codesState'
import { commentsState } from './commentsState'
import { useArraySettor } from './utils'

export const postsState = atom<Post[]>({
  key: 'postsAtom',
  default: [],
})

export const usePostsSettor = (): {
  initPosts: (items: Post[]) => void
  appendPosts: (items: Post[]) => void
  createPost: (item: Post) => void
  updatePost: (prevItem: Post, newItem: Post) => void
  deletePost: (item: Post) => void
} => {
  const settor = useArraySettor(postsState, 'DESC')

  return {
    initPosts: settor.setInitItems,
    appendPosts: settor.setAppendItems,
    createPost: settor.setCreateItem,
    updatePost: settor.setUpdateItem,
    deletePost: settor.setDeleteItem,
  }
}

export const connectedPostsState = selector({
  key: 'connectedPostsState',
  get: ({ get }) => {
    const posts = get(postsState)
    const codes = get(codesState)
    const comments = get(commentsState)

    return posts.map((post) => ({
      ...post,
      codes: codes.filter((code) => code.postID === post.id),
      comments: comments.filter((comment) => comment.postID === post.id),
    }))
  },
})
