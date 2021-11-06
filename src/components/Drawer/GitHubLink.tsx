import React from 'react'
import Link from 'next/link'
import { ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { GitHub as GitHubIcon } from '@mui/icons-material'
import { useIconStyle } from './index'

export const GitHubLink: React.FC = () => {
  const classes = useIconStyle()

  return (
    <Link href="https://github.com/shimehituzi/playsnippet">
      <ListItem button>
        <ListItemIcon>
          <GitHubIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText>View on GitHub</ListItemText>
      </ListItem>
    </Link>
  )
}
