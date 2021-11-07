import React from 'react'
import Link from 'next/link'
import { ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { Person as PersonIcon } from '@mui/icons-material'
import { useIconStyle } from './index'

type Props = {
  username: string
}

export const MyPosts: React.FC<Props> = ({ username }) => {
  const classes = useIconStyle()

  return (
    <Link href={`/posts/${username}`}>
      <ListItem button>
        <ListItemIcon>
          <PersonIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText>My Posts</ListItemText>
      </ListItem>
    </Link>
  )
}
