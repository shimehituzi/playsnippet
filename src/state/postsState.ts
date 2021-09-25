import { atom, selector } from 'recoil'
import { Post } from '../API'
import { codesState, OmittedCode } from './codesState'
import { commentsState, OmittedComment } from './commentsState'
import { useArraySettor } from './utils'

export type OmittedPost = Omit<Post, 'codes' | 'comments'>

export const postsState = atom<OmittedPost[]>({
  key: 'postsAtom',
  default: [],
})

export const usePostsSettor = (): {
  initPosts: (items: OmittedPost[]) => void
  appendPosts: (items: OmittedPost[]) => void
  createPost: (item: OmittedPost) => void
  updatePost: (prevItem: OmittedPost, newItem: OmittedPost) => void
  deletePost: (item: OmittedPost) => void
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

export type ConnectedPost = OmittedPost & {
  codes: OmittedCode[]
  comments: OmittedComment[]
}

export const connectedPostsState = selector<ConnectedPost[]>({
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
