import React, { useEffect, useState } from 'react'
import { colors, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { Sync as SyncIcon } from '@mui/icons-material'
import { useIconStyle } from './index'
import { useRecoilState } from 'recoil'
import { subscribeFlagState } from '../../state/uiState'
import { useRouter } from 'next/router'

const disableSubscribeRoute = ['/404', '/signin', '/signup']

export const Subscription: React.FC = () => {
  const [subscribeFlag, setSubscribeFlag] = useRecoilState(subscribeFlagState)
  const [disabled, setDisabled] = useState<boolean>(false)

  const router = useRouter()

  useEffect(() => {
    setDisabled(disableSubscribeRoute.includes(router.route))
  }, [router.route])

  const classes = useIconStyle()
  const color = subscribeFlag ? colors.green['400'] : colors.grey['600']

  const onClick = () => {
    setSubscribeFlag(!subscribeFlag)
  }

  return (
    <ListItem button onClick={onClick} disabled={disabled}>
      <ListItemIcon sx={{ color: color }}>
        <SyncIcon className={classes.icon} />
      </ListItemIcon>
      <ListItemText sx={{ color: color }}>Live Loading</ListItemText>
    </ListItem>
  )
}
