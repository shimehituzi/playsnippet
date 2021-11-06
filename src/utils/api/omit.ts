import * as APIt from '../../API'
import { OmitPost, OmitCode, OmitComment } from '../../state/apiState'
import { notNull } from '../nullable'

export const omitPost = (post: APIt.Post): OmitPost => {
  const { codes: _, comments: __, ...omitPost } = post
  return omitPost
}

export const omitCode = (code: APIt.Code): OmitCode => {
  const { post: _, ...omitCode } = code
  return omitCode
}

export const omitComment = (comment: APIt.Comment): OmitComment => {
  const { post: _, ...omitComment } = comment
  return omitComment
}

export const postsToOmitPosts = (posts: APIt.Post[]): OmitPost[] => {
  return posts.map((post) => omitPost(post))
}

export const postsToOmitCodes = (posts: APIt.Post[]): OmitCode[] => {
  return posts
    .map((post) => post.codes?.items)
    .flat()
    .filter(notNull)
    .map((code) => omitCode(code))
}

export const postsToOmitComments = (posts: APIt.Post[]): OmitComment[] => {
  return posts
    .map((post) => post.comments?.items)
    .flat()
    .filter(notNull)
    .map((comment) => omitComment(comment))
}

export type SeparatePosts = {
  posts: OmitPost[]
  codes: OmitCode[]
  comments: OmitComment[]
}

export const separatePosts = (posts: APIt.Post[]): SeparatePosts => {
  return {
    posts: postsToOmitPosts(posts),
    codes: postsToOmitCodes(posts),
    comments: postsToOmitComments(posts),
  }
}
