import React from 'react'
import { Avatar as MuiAvatar, colors } from '@mui/material'
import { useAvatar } from '../../state/avatarsState'

type Props = {
  username: string
  size: number
}

export const Avatar: React.FC<Props> = ({ size, username }) => {
  const avatar = useAvatar(username)

  return avatar ? (
    <MuiAvatar sx={{ width: size, height: size }} src={avatar.avatar} />
  ) : (
    <MuiAvatar sx={{ width: size, height: size, bgcolor: colors.grey[300] }}>
      {username.charAt(0).toUpperCase()}
    </MuiAvatar>
  )
}
