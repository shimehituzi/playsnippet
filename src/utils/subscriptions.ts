import * as APIt from '../API'
import * as subscription from '../graphql/subscriptions'
import { gqlSubscription } from '../utils/graphql'
import { GraphQLOptions } from '@aws-amplify/api-graphql'
import { ZenObservable } from '../../node_modules/zen-observable-ts'

type Callbacks<C, U, D> = {
  createfn: (data: C) => void
  updatefn: (data: U) => void
  deletefn: (data: D) => void
}

type Querys = {
  onCreate: GraphQLOptions['query']
  onUpdate: GraphQLOptions['query']
  onDelete: GraphQLOptions['query']
}

type Subscription = {
  createSubscription: ZenObservable.Subscription
  updateSubscription: ZenObservable.Subscription
  deleteSubscription: ZenObservable.Subscription
}

export const generateSubscribeFunc =
  <C, U, D>(querys: Querys) =>
  (callbacks: Callbacks<C, U, D>): Subscription => {
    const createSubscription = gqlSubscription<C>({
      query: querys.onCreate,
      callback: {
        next: (msg) => {
          const data = msg.value.data
          if (data != null) callbacks.createfn(data)
        },
      },
    })
    const updateSubscription = gqlSubscription<U>({
      query: querys.onUpdate,
      callback: {
        next: (msg) => {
          const data = msg.value.data
          if (data != null) callbacks.updatefn(data)
        },
      },
    })
    const deleteSubscription = gqlSubscription<D>({
      query: querys.onDelete,
      callback: {
        next: (msg) => {
          const data = msg.value.data
          if (data != null) callbacks.deletefn(data)
        },
      },
    })
    return { createSubscription, updateSubscription, deleteSubscription }
  }

export const subscribePost = generateSubscribeFunc<
  APIt.OnCreatePostSubscription,
  APIt.OnUpdatePostSubscription,
  APIt.OnDeletePostSubscription
>({
  onCreate: subscription.onCreatePost,
  onUpdate: subscription.onUpdatePost,
  onDelete: subscription.onDeletePost,
})

export const subscribeCode = generateSubscribeFunc<
  APIt.OnCreateCodeSubscription,
  APIt.OnUpdateCodeSubscription,
  APIt.OnDeleteCodeSubscription
>({
  onCreate: subscription.onCreateCode,
  onUpdate: subscription.onUpdateCode,
  onDelete: subscription.onDeleteCode,
})

export const subscribeComment = generateSubscribeFunc<
  APIt.OnCreateCommentSubscription,
  APIt.OnUpdateCommentSubscription,
  APIt.OnDeleteCommentSubscription
>({
  onCreate: subscription.onCreateComment,
  onUpdate: subscription.onUpdateComment,
  onDelete: subscription.onDeleteComment,
})
