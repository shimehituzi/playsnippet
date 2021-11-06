import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { isSubscribeState } from '../../state/uiState'
import {
  subscribeCode,
  subscribeComment,
  subscribePost,
} from '../../utils/api/subscription'
import { useSubscribe } from '../../utils/subscribe'
import {
  codesState,
  commentsState,
  postsState,
  latestTimeStampSelector,
} from '../../state/apiState'
import { usePageRender } from '../../utils/render'
import { useArraySettor } from '../../utils/arraySettor'
import { omitPost, omitCode, omitComment } from '../../utils/api/omit'
import { getNewItems } from '../../utils/api/query'
import { colors, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { Sync as SyncIcon } from '@mui/icons-material'
import { useIconStyle } from './index'

export const Subscription: React.FC = () => {
  const { pageState, toCSR } = usePageRender()
  const [isSubscribe, setIsSubscribe] = useRecoilState(isSubscribeState)

  const setPosts = useArraySettor(postsState, 'DESC', omitPost)
  const setCodes = useArraySettor(codesState, 'ASC', omitCode)
  const setComments = useArraySettor(commentsState, 'ASC', omitComment)

  const latestTimeStamp = useRecoilValue(latestTimeStampSelector)
  const newItems = async () => {
    const { newPosts, newCodes, newComments } = await getNewItems(
      latestTimeStamp
    )
    setPosts.newItems(newPosts)
    setCodes.newItems(newCodes)
    setComments.newItems(newComments)
  }

  const { subscribe, unsubscribe } = useSubscribe([
    subscribePost({
      onCreate: (data) => setPosts.createItem(data.onCreatePost),
      onUpdate: (data) => setPosts.updateItem(data.onUpdatePost),
      onDelete: (data) => setPosts.deleteItem(data.onDeletePost),
    }),
    subscribeCode({
      onCreate: (data) => setCodes.createItem(data.onCreateCode),
      onUpdate: (data) => setCodes.updateItem(data.onUpdateCode),
      onDelete: (data) => setCodes.deleteItem(data.onDeleteCode),
    }),
    subscribeComment({
      onCreate: (data) => setComments.createItem(data.onCreateComment),
      onUpdate: (data) => setComments.updateItem(data.onUpdateComment),
      onDelete: (data) => setComments.deleteItem(data.onDeleteComment),
    }),
  ])

  const changeSubscribe = () => {
    if (!isSubscribe) {
      newItems()
      subscribe()
    } else {
      unsubscribe()
    }
    setIsSubscribe(!isSubscribe)
    toCSR()
  }

  useEffect(() => {
    if (!pageState.mount) {
      if (isSubscribe) unsubscribe()
      setIsSubscribe(false)
    }
  }, [pageState.mount])

  const classes = useIconStyle()
  const color = isSubscribe ? colors.green['400'] : colors.grey['600']

  return (
    <ListItem button onClick={changeSubscribe}>
      <ListItemIcon sx={{ color: color }}>
        <SyncIcon className={classes.icon} />
      </ListItemIcon>
      <ListItemText sx={{ color: color }}>Live Loading</ListItemText>
    </ListItem>
  )
}
