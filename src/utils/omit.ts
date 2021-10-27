import { Post, Code, Comment } from '../API'
import { OmitPost, OmitCode, OmitComment } from '../state/apiState'
import { notNull } from './nullable'

export const omitPost = (post: Post): OmitPost => {
  const { codes: _, comments: __, ...omitPost } = post
  return omitPost
}

export const omitCode = (code: Code): OmitCode => {
  const { post: _, ...omitCode } = code
  return omitCode
}

export const omitComment = (comment: Comment): OmitComment => {
  const { post: _, ...omitComment } = comment
  return omitComment
}

export const postsToOmitPosts = (posts: Post[]): OmitPost[] => {
  return posts.map((post) => omitPost(post))
}

export const postsToOmitCodes = (posts: Post[]): OmitCode[] => {
  return posts
    .map((post) => post.codes?.items)
    .flat()
    .filter(notNull)
    .map((code) => omitCode(code))
}

export const postsToOmitComments = (posts: Post[]): OmitComment[] => {
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

export const separatePosts = (posts: Post[]): SeparatePosts => {
  return {
    posts: postsToOmitPosts(posts),
    codes: postsToOmitCodes(posts),
    comments: postsToOmitComments(posts),
  }
}
