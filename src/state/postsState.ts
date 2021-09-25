import { atom, selector } from 'recoil'
import { Post } from '../API'
import { codesState, OmittedCode } from './codesState'
import { commentsState, OmittedComment } from './commentsState'

export type OmittedPost = Omit<Post, 'codes' | 'comments'>

export const postsState = atom<OmittedPost[]>({
  key: 'postsAtom',
  default: [],
})

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
