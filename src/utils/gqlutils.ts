import { withSSRContext } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api'
import { GraphQLAPIClass, GraphQLOptions } from '@aws-amplify/api-graphql'

type ServerSideGraphQLOptions<V extends Record<string, unknown>> = {
  query: GraphQLOptions['query']
  variables: V
}

export const servergql = async <Q, V extends Record<string, unknown>>({
  query,
  variables,
}: ServerSideGraphQLOptions<V>): Promise<GraphQLResult<Q>> => {
  const API: GraphQLAPIClass = withSSRContext().API

  const res = (await API.graphql({
    query: query,
    variables: variables,
    authMode: 'AWS_IAM',
  })) as GraphQLResult<Q>

  return res
}
