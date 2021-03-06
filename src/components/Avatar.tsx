import React from 'react'
import { useRecoilValueLoadable } from 'recoil'
import { avatarQuery } from '../state/avatarsState'
import { Avatar as MuiAvatar, colors } from '@mui/material'

type Props = {
  username: string
  size: number
}

export const Avatar: React.FC<Props> = ({ size, username }) => {
  const loadable = useRecoilValueLoadable(avatarQuery(username))
  const avatar =
    loadable.state === 'hasValue' ? loadable.contents?.avatar : null

  return avatar != null ? (
    <MuiAvatar sx={{ width: size, height: size }} src={avatar} />
  ) : (
    <MuiAvatar sx={{ width: size, height: size, bgcolor: colors.grey[300] }}>
      {username.charAt(0).toUpperCase()}
    </MuiAvatar>
  )
}
