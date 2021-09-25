/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import API, { graphqlOperation, GraphQLResult } from '@aws-amplify/api'
import {
  OnCreatePostSubscription,
  OnUpdatePostSubscription,
  OnDeletePostSubscription,
  OnCreateCodeSubscription,
  OnUpdateCodeSubscription,
  OnDeleteCodeSubscription,
  OnCreateCommentSubscription,
  OnUpdateCommentSubscription,
  OnDeleteCommentSubscription,
} from '../API'
import * as query from '../graphql/subscriptions'
import { Observable, Observer } from '../../node_modules/zen-observable-ts'

type Client<T> = Observable<{ value: GraphQLResult<T> }>
type CallBack<T> =
  | ((value: { value: GraphQLResult<T> }) => void)
  | Observer<{ value: GraphQLResult<T> }>

export const subscribe = <T>(query: any, callback: CallBack<T>) => {
  return (API.graphql(graphqlOperation(query)) as Client<T>).subscribe(callback)
}

export const subscribeCreatePost = (
  callback: CallBack<OnCreatePostSubscription>
) => subscribe<OnCreatePostSubscription>(query.onCreatePost, callback)
export const subscribeUpdatePost = (
  callback: CallBack<OnUpdatePostSubscription>
) => subscribe<OnUpdatePostSubscription>(query.onUpdatePost, callback)
export const subscribeDeletePost = (
  callback: CallBack<OnDeletePostSubscription>
) => subscribe<OnDeletePostSubscription>(query.onDeletePost, callback)

export const subscribeCreateCode = (
  callback: CallBack<OnCreateCodeSubscription>
) => subscribe<OnCreateCodeSubscription>(query.onCreateCode, callback)
export const subscribeUpdateCode = (
  callback: CallBack<OnUpdateCodeSubscription>
) => subscribe<OnUpdateCodeSubscription>(query.onUpdateCode, callback)
export const subscribeDeleteCode = (
  callback: CallBack<OnDeleteCodeSubscription>
) => subscribe<OnDeleteCodeSubscription>(query.onDeleteCode, callback)

export const subscribeCreateComment = (
  callback: CallBack<OnCreateCommentSubscription>
) => subscribe<OnCreateCommentSubscription>(query.onCreateComment, callback)
export const subscribeUpdateComment = (
  callback: CallBack<OnUpdateCommentSubscription>
) => subscribe<OnUpdateCommentSubscription>(query.onUpdateComment, callback)
export const subscribeDeleteComment = (
  callback: CallBack<OnDeleteCommentSubscription>
) => subscribe<OnDeleteCommentSubscription>(query.onDeleteComment, callback)
