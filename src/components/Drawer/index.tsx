import React from 'react'
import { useRecoilState } from 'recoil'
import { drawerOpenState } from '../../state/uiState'
import { makeStyles } from '@mui/styles'
import { Divider, IconButton, List } from '@mui/material'
import { ChevronLeft as ChevronLeftIcon } from '@mui/icons-material'
import { Drawer as StyledDrawer, DrawerHeader } from '../Styled'
import { GitHubLink } from './GitHubLink'
import { Subscription } from './Subscription'
import { PostAdd } from './PostAdd'
import { useAuth } from '../../utils/auth'

export const useIconStyle = makeStyles({
  icon: {
    width: 40,
    height: 40,
  },
})

export const Drawer: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useRecoilState(drawerOpenState)
  const { authenticated } = useAuth()
  const closeDrawer = () => setDrawerOpen(false)

  return (
    <StyledDrawer variant="permanent" open={drawerOpen}>
      <DrawerHeader>
        <IconButton onClick={closeDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <Subscription />
        <Divider />
        {authenticated && (
          <>
            <PostAdd />
            <Divider />
          </>
        )}
        <GitHubLink />
      </List>
    </StyledDrawer>
  )
}