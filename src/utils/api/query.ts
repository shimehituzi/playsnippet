import * as APIt from '../../API'
import * as query from '../../graphql/queries'
import { gqlQuery } from '../graphql'
import { Nullable, NullableArray } from '../nullable'

export const getNewItems = async (
  time: string
): Promise<{
  newPosts: NullableArray<APIt.Post>
  newCodes: NullableArray<APIt.Code>
  newComments: NullableArray<APIt.Comment>
}> => {
  const posts = await gqlQuery<
    APIt.ListPostsByDateQueryVariables,
    APIt.ListPostsByDateQuery
  >({
    query: query.listPostsByDate,
    variables: {
      type: 'post',
      sortDirection: APIt.ModelSortDirection.DESC,
      createdAt: {
        gt: time,
      },
    },
  })

  const codes = await gqlQuery<
    APIt.ListCodesByDateQueryVariables,
    APIt.ListCodesByDateQuery
  >({
    query: query.listCodesByDate,
    variables: {
      type: 'code',
      sortDirection: APIt.ModelSortDirection.ASC,
      createdAt: {
        gt: time,
      },
    },
  })

  const comments = await gqlQuery<
    APIt.ListCommentsByDateQueryVariables,
    APIt.ListCommentsByDateQuery
  >({
    query: query.listCommentsByDate,
    variables: {
      type: 'comment',
      sortDirection: APIt.ModelSortDirection.ASC,
      createdAt: {
        gt: time,
      },
    },
  })

  const newPosts = posts.data?.listPostsByDate?.items
  const newCodes = codes.data?.listCodesByDate?.items
  const newComments = comments.data?.listCommentsByDate?.items

  return { newPosts, newCodes, newComments }
}

export const getAdditionalPosts = async (
  nextToken: string
): Promise<{
  posts: NullableArray<APIt.Post>
  newNextToken: Nullable<string>
}> => {
  const res = await gqlQuery<
    APIt.ListPostsByDateQueryVariables,
    APIt.ListPostsByDateQuery
  >({
    query: query.listPostsByDate,
    variables: {
      type: 'post',
      sortDirection: APIt.ModelSortDirection.DESC,
      limit: 20,
      nextToken: nextToken,
    },
  })

  return {
    posts: res?.data?.listPostsByDate?.items,
    newNextToken: res?.data?.listPostsByDate?.nextToken,
  }
}
