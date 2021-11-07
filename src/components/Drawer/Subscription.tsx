import React from 'react'
import { colors, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { Sync as SyncIcon } from '@mui/icons-material'
import { useIconStyle } from './index'
import { useRecoilState, useRecoilValue } from 'recoil'
import { enableSabscribeState, subscribeFlagState } from '../../state/uiState'

export const Subscription: React.FC = () => {
  const [subscribeFlag, setSubscribeFlag] = useRecoilState(subscribeFlagState)
  const enableSubscribe = useRecoilValue(enableSabscribeState)

  const classes = useIconStyle()
  const color = subscribeFlag ? colors.green['400'] : colors.grey['600']

  const onClick = () => {
    setSubscribeFlag(!subscribeFlag)
  }

  return (
    <ListItem button onClick={onClick} disabled={!enableSubscribe}>
      <ListItemIcon sx={{ color: color }}>
        <SyncIcon className={classes.icon} />
      </ListItemIcon>
      <ListItemText sx={{ color: color }}>Live Loading</ListItemText>
    </ListItem>
  )
}
