import * as APIt from '../API'
import * as subscription from '../graphql/subscriptions'
import { gqlSubscription } from '../utils/graphql'
import { GraphQLOptions } from '@aws-amplify/api-graphql'
import { ZenObservable } from '../../node_modules/zen-observable-ts'
import { useCallback, useState } from 'react'

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

type Subscriptions = {
  createSubscription: ZenObservable.Subscription
  updateSubscription: ZenObservable.Subscription
  deleteSubscription: ZenObservable.Subscription
}

const generateSubscribeFunc =
  <C, U, D>(querys: Querys) =>
  (callbacks: Callbacks<C, U, D>): Subscriptions => {
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

export const useSubscription = (
  subscribeFuncArray: (() => Subscriptions)[]
): {
  subscribe: () => void
  unsubscribe: () => void
  toggle: () => void
} => {
  const [state, setState] = useState<Subscriptions[] | null>(null)

  const subscribe = useCallback(() => {
    if (state !== null) return
    setState(subscribeFuncArray.map((subscribeFunc) => subscribeFunc()))
  }, [state])

  const unsubscribe = useCallback(() => {
    if (state === null) return
    state.forEach((subscription) => {
      subscription.createSubscription.unsubscribe()
      subscription.updateSubscription.unsubscribe()
      subscription.deleteSubscription.unsubscribe()
    })
    setState(null)
  }, [state])

  const toggle = useCallback(() => {
    if (state === null) {
      subscribe()
    } else {
      unsubscribe()
    }
  }, [state])

  return { subscribe, unsubscribe, toggle }
}
