import { useCallback, useEffect, useRef, useState } from 'react'
import { gqlSubscription } from '../utils/graphql'
import { GraphQLOptions } from '@aws-amplify/api-graphql'
import { ZenObservable } from '../../node_modules/zen-observable-ts'
import { Nullable } from './nullable'
import { useRecoilState } from 'recoil'
import { subscribeFlagState } from '../state/uiState'

type SubscriptionQuery = {
  onCreate: GraphQLOptions['query']
  onUpdate: GraphQLOptions['query']
  onDelete: GraphQLOptions['query']
}

type SubscriptionCallback<C, U, D> = {
  onCreate?: (data: Nullable<C>) => void
  onUpdate?: (data: Nullable<U>) => void
  onDelete?: (data: Nullable<D>) => void
}

type SubscribeFunction = {
  subscribeCreate?: () => ZenObservable.Subscription
  subscribeUpdate?: () => ZenObservable.Subscription
  subscribeDelete?: () => ZenObservable.Subscription
}

type Subscription = {
  createSubscription?: ZenObservable.Subscription
  updateSubscription?: ZenObservable.Subscription
  deleteSubscription?: ZenObservable.Subscription
}

export const generateSubscribeFunc =
  <C, U, D>(query: SubscriptionQuery) =>
  (callback: SubscriptionCallback<C, U, D>): SubscribeFunction => {
    const { onCreate, onUpdate, onDelete } = callback

    const subscribeCreate = onCreate
      ? () =>
          gqlSubscription<C>({
            query: query.onCreate,
            callback: { next: (msg) => onCreate(msg.value.data) },
          })
      : undefined

    const subscribeUpdate = onUpdate
      ? () =>
          gqlSubscription<U>({
            query: query.onUpdate,
            callback: { next: (msg) => onUpdate(msg.value.data) },
          })
      : undefined

    const subscribeDelete = onDelete
      ? () =>
          gqlSubscription<D>({
            query: query.onDelete,
            callback: { next: (msg) => onDelete(msg.value.data) },
          })
      : undefined

    return { subscribeCreate, subscribeUpdate, subscribeDelete }
  }

type SubscriptionsState = Subscription[] | null
type ArgsUseSubscription = {
  subscribeFuncArray: SubscribeFunction[]
  newItemsFuncArray: (() => Promise<void>)[]
  toCSR: VoidFunction
}

export const useSubscription = ({
  subscribeFuncArray,
  newItemsFuncArray,
  toCSR,
}: ArgsUseSubscription): void => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionsState>(null)
  const [subscribeFlag, setSubscribeFlag] = useRecoilState(subscribeFlagState)

  const subscribe = useCallback(() => {
    if (subscriptions !== null) return
    setSubscriptions(
      subscribeFuncArray.map((subscribeFunc) => ({
        createSubscription: subscribeFunc.subscribeCreate?.(),
        updateSubscription: subscribeFunc.subscribeUpdate?.(),
        deleteSubscription: subscribeFunc.subscribeDelete?.(),
      }))
    )
  }, [subscriptions])

  const unsubscribe = useCallback(() => {
    if (subscriptions === null) return
    subscriptions.forEach((subscription) => {
      subscription.createSubscription?.unsubscribe()
      subscription.updateSubscription?.unsubscribe()
      subscription.deleteSubscription?.unsubscribe()
    })
    setSubscriptions(null)
  }, [subscriptions])

  useEffect(() => {
    if (subscribeFlag) {
      newItemsFuncArray.forEach(async (newItemsFunc) => {
        await newItemsFunc()
      })
      subscribe()
    } else {
      unsubscribe()
    }
  }, [subscribeFlag])

  useEffect(() => {
    if (subscriptions !== null) {
      toCSR()
    }
  }, [subscriptions])

  const ref = useRef<SubscriptionsState>(null)
  ref.current = subscriptions

  useEffect(() => {
    return () => {
      ref.current?.forEach((subscription) => {
        subscription.createSubscription?.unsubscribe()
        subscription.updateSubscription?.unsubscribe()
        subscription.deleteSubscription?.unsubscribe()
      })
      setSubscriptions(null)
      setSubscribeFlag(false)
    }
  }, [])
}
