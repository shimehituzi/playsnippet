import * as APIt from '../../API'
import * as subscription from '../../graphql/subscriptions'
import { generateSubscribeFunc } from '../subscribe'

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
