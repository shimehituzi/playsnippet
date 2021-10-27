import { withSSRContext } from 'aws-amplify'
import API, { GraphQLResult } from '@aws-amplify/api'
import { GraphQLAPIClass, GraphQLOptions } from '@aws-amplify/api-graphql'
import {
  Observable,
  Observer,
  ZenObservable,
} from '../../node_modules/zen-observable-ts'

type GqlOptions<V extends Record<string, unknown>> = {
  query: GraphQLOptions['query']
  variables: V
}

export const serverQuery = async <V extends Record<string, unknown>, Q>({
  query,
  variables,
}: GqlOptions<V>): Promise<GraphQLResult<Q>> => {
  const API: GraphQLAPIClass = withSSRContext().API

  const res = (await API.graphql({
    query: query,
    variables: variables,
    authMode: 'AWS_IAM',
  })) as GraphQLResult<Q>

  return res
}

export const gqlQuery = async <V extends Record<string, unknown>, Q>({
  query,
  variables,
}: GqlOptions<V>): Promise<GraphQLResult<Q>> => {
  const res = (await API.graphql({
    query: query,
    variables: variables,
    authMode: 'AWS_IAM',
  })) as GraphQLResult<Q>

  return res
}

export const gqlMutation = async <V extends Record<string, unknown>, M = void>({
  query,
  variables,
}: GqlOptions<V>): Promise<GraphQLResult<M> | undefined> => {
  const res = (await API.graphql({
    query: query,
    variables: variables,
    authMode: 'AMAZON_COGNITO_USER_POOLS',
  })) as GraphQLResult<M>

  return res
}

type Client<S> = Observable<{ value: GraphQLResult<S> }>
type CallBack<S> =
  | ((value: { value: GraphQLResult<S> }) => void)
  | Observer<{ value: GraphQLResult<S> }>
type SubScriptionOptions<S> = {
  query: GraphQLOptions['query']
  callback: CallBack<S>
}

export const gqlSubscription = <T>({
  query,
  callback,
}: SubScriptionOptions<T>): ZenObservable.Subscription => {
  const client = API.graphql({
    query: query,
    authMode: 'AWS_IAM',
  }) as Client<T>

  const subscription = client.subscribe(callback)

  return subscription
}
