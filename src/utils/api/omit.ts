import * as APIt from '../../API'
import { OmitPost, OmitCode, OmitComment } from '../../state/apiState'

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
