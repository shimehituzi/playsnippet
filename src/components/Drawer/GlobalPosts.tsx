import React from 'react'
import Link from 'next/link'
import { ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { Language as GlobalIcon } from '@mui/icons-material'
import { useIconStyle } from './index'

export const GlobalPosts: React.FC = () => {
  const classes = useIconStyle()

  return (
    <Link href="/">
      <ListItem button>
        <ListItemIcon>
          <GlobalIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText>Global Posts</ListItemText>
      </ListItem>
    </Link>
  )
}
