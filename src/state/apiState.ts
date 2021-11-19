import { atom, selector, selectorFamily } from 'recoil'
import { Post, Code, Comment } from '../API'

export type OmitPost = Omit<Post, 'codes' | 'comments'>
export type OmitCode = Omit<Code, 'post'>
export type OmitComment = Omit<Comment, 'post'>

export const postsState = atom<OmitPost[]>({
  key: 'postsState',
  default: [],
})

export const codesState = atom<OmitCode[]>({
  key: 'codesState',
  default: [],
})

export const commentsState = atom<OmitComment[]>({
  key: 'commentsState',
  default: [],
})

export const postNextTokenState = atom<string | null>({
  key: 'postNextTokenState',
  default: null,
})

export const postsSelector = selector<OmitPost[]>({
  key: 'postsSelector',
  get: ({ get }) => {
    return get(postsState)
  },
})

export const postSelector = selectorFamily<OmitPost | undefined, string>({
  key: 'postSelector',
  get:
    (postID) =>
    ({ get }) => {
      return get(postsSelector).find((post) => post.id === postID)
    },
})

export const codesSelector = selectorFamily<OmitCode[], string>({
  key: 'codesSelector',
  get:
    (postID) =>
    ({ get }) => {
      return get(codesState).filter((code) => code.postID === postID)
    },
})

export const codeSelector = selectorFamily<OmitCode | undefined, string>({
  key: 'codeSelector',
  get:
    (codeID) =>
    ({ get }) => {
      return get(codesState).find((code) => code.id === codeID)
    },
})

export const commentsSelector = selectorFamily<OmitComment[], string>({
  key: 'commentsSelector',
  get:
    (postID) =>
    ({ get }) => {
      return get(commentsState).filter((code) => code.postID === postID)
    },
})

export const oldestPostTimeStampSelector = selector<string>({
  key: 'latestTimeStampSelector',
  get: ({ get }) => {
    const timeStamps = get(postsState).map((v) => v.createdAt)
    if (timeStamps.length > 0) {
      return timeStamps.reduce((a, b) => (a < b ? a : b))
    } else {
      return ''
    }
  },
})
