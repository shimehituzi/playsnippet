import * as APIt from '../../API'
import * as query from '../../graphql/queries'
import { ModelSortDirection as sd } from '../../API'
import { gqlQuery, serverQuery } from '../graphql'
import { GraphQLOptions, GraphQLResult } from '@aws-amplify/api-graphql'

type defaultOptions<V extends Record<string, unknown>> = {
  query: GraphQLOptions['query']
  defaultVariables?: V
  server?: boolean
}

const generateQueryFunc =
  <V extends Record<string, unknown>, Q>({
    query,
    defaultVariables,
    server,
  }: defaultOptions<V>) =>
  (variables: V): Promise<GraphQLResult<Q>> => {
    const graphqlOptions = {
      query,
      variables: {
        ...defaultVariables,
        ...variables,
      },
    }
    if (server) {
      return serverQuery<V, Q>(graphqlOptions)
    }
    return gqlQuery<V, Q>(graphqlOptions)
  }

export const serverListPostsByDate = generateQueryFunc<
  APIt.ListPostsByDateQueryVariables,
  APIt.ListPostsByDateQuery
>({
  query: query.listPostsByDate,
  defaultVariables: {
    type: 'post',
    sortDirection: sd.DESC,
  },
  server: true,
})

export const serverListPostsByOwner = generateQueryFunc<
  APIt.ListPostsByOwnerQueryVariables,
  APIt.ListPostsByOwnerQuery
>({
  query: query.listPostsByOwner,
  defaultVariables: {
    sortDirection: sd.DESC,
  },
  server: true,
})

export const serverGetPost = generateQueryFunc<
  APIt.GetPostQueryVariables,
  APIt.GetPostQuery
>({ query: query.getPost, server: true })

export const listPostsByDate = generateQueryFunc<
  APIt.ListPostsByDateQueryVariables,
  APIt.ListPostsByDateQuery
>({
  query: query.listPostsByDate,
  defaultVariables: {
    type: 'post',
    sortDirection: sd.DESC,
  },
})

export const listPostsByOwner = generateQueryFunc<
  APIt.ListPostsByOwnerQueryVariables,
  APIt.ListPostsByOwnerQuery
>({
  query: query.listPostsByOwner,
  defaultVariables: {
    sortDirection: sd.DESC,
  },
})

export const listCodesByDate = generateQueryFunc<
  APIt.ListCodesByDateQueryVariables,
  APIt.ListCodesByDateQuery
>({
  query: query.listCodesByDate,
  defaultVariables: {
    type: 'code',
    sortDirection: sd.ASC,
  },
})

export const listCommentsByDate = generateQueryFunc<
  APIt.ListCommentsByDateQueryVariables,
  APIt.ListCommentsByDateQuery
>({
  query: query.listCommentsByDate,
  defaultVariables: {
    type: 'comment',
    sortDirection: sd.ASC,
  },
})

export const listCommentsByPost = generateQueryFunc<
  APIt.ListCommentsByPostQueryVariables,
  APIt.ListCommentsByPostQuery
>({
  query: query.listCommentsByPost,
  defaultVariables: {
    sortDirection: sd.ASC,
  },
})
