import * as APIt from '../API'
import * as subscription from '../graphql/subscriptions'
import { gqlSubscription } from '../utils/graphql'
import { GraphQLOptions } from '@aws-amplify/api-graphql'
import { ZenObservable } from '../../node_modules/zen-observable-ts'
import { useCallback, useState } from 'react'

type SubscriptionCallback<C, U, D> = {
  onCreate: (data: C) => void
  onUpdate: (data: U) => void
  onDelete: (data: D) => void
}

type SubscriptionQuery = {
  onCreate: GraphQLOptions['query']
  onUpdate: GraphQLOptions['query']
  onDelete: GraphQLOptions['query']
}

export type SubscribeFunc = {
  subscribeCreate: () => ZenObservable.Subscription
  subscribeUpdate: () => ZenObservable.Subscription
  subscribeDelete: () => ZenObservable.Subscription
}

export type Subscription = {
  createSubscription: ZenObservable.Subscription
  updateSubscription: ZenObservable.Subscription
  deleteSubscription: ZenObservable.Subscription
}

const generateSubscribeFunc =
  <C, U, D>(query: SubscriptionQuery) =>
  (callback: SubscriptionCallback<C, U, D>): SubscribeFunc => {
    const subscribeCreate = () =>
      gqlSubscription<C>({
        query: query.onCreate,
        callback: {
          next: (msg) => {
            const data = msg.value.data
            if (data != null) callback.onCreate(data)
          },
        },
      })
    const subscribeUpdate = () =>
      gqlSubscription<U>({
        query: query.onUpdate,
        callback: {
          next: (msg) => {
            const data = msg.value.data
            if (data != null) callback.onUpdate(data)
          },
        },
      })
    const subscribeDelete = () =>
      gqlSubscription<D>({
        query: query.onDelete,
        callback: {
          next: (msg) => {
            const data = msg.value.data
            if (data != null) callback.onDelete(data)
          },
        },
      })
    return { subscribeCreate, subscribeUpdate, subscribeDelete }
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

export const useSubscribe = (
  subscribeFuncArray: SubscribeFunc[]
): {
  subscribe: () => void
  unsubscribe: () => void
  toggle: () => void
} => {
  const [subscription, setSubscription] = useState<Subscription[] | null>(null)

  const subscribe = useCallback(() => {
    if (subscription !== null) return
    setSubscription(
      subscribeFuncArray.map((subscribeFunc) => ({
        createSubscription: subscribeFunc.subscribeCreate(),
        updateSubscription: subscribeFunc.subscribeUpdate(),
        deleteSubscription: subscribeFunc.subscribeDelete(),
      }))
    )
  }, [subscription])

  const unsubscribe = useCallback(() => {
    if (subscription === null) return
    subscription.forEach((subscription) => {
      subscription.createSubscription.unsubscribe()
      subscription.updateSubscription.unsubscribe()
      subscription.deleteSubscription.unsubscribe()
    })
    setSubscription(null)
  }, [subscription])

  const toggle = useCallback(() => {
    if (subscription === null) {
      subscribe()
    } else {
      unsubscribe()
    }
  }, [subscription])

  return { subscribe, unsubscribe, toggle }
}
