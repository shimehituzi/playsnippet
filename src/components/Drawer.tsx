import React from 'react'
import Link from 'next/link'
import { useRecoilState } from 'recoil'
import { drawerOpenState } from '../state/uiState'
import { makeStyles } from '@mui/styles'
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import {
  ChevronLeft as ChevronLeftIcon,
  GitHub as GitHubIcon,
} from '@mui/icons-material'
import { Drawer as StyledDrawer, DrawerHeader } from './Styled'

export const Drawer: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useRecoilState(drawerOpenState)
  const closeDrawer = () => setDrawerOpen(false)

  return (
    <StyledDrawer variant="permanent" open={drawerOpen}>
      <DrawerHeader>
        <IconButton onClick={closeDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <DrawerItems />
    </StyledDrawer>
  )
}

const useStyle = makeStyles({
  icon: {
    width: 40,
    height: 40,
  },
})

const DrawerItems: React.FC = () => {
  const classes = useStyle()
  return (
    <List>
      <Link href="https://github.com/shimehituzi/playsnippet">
        <ListItem button>
          <ListItemIcon>
            <GitHubIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText>View on GitHub</ListItemText>
        </ListItem>
      </Link>
    </List>
  )
}
