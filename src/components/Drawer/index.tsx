import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { drawerOpenState, editState } from '../../state/uiState'
import { makeStyles } from '@mui/styles'
import { Divider, IconButton, List } from '@mui/material'
import { ChevronLeft as ChevronLeftIcon } from '@mui/icons-material'
import { Drawer as StyledDrawer, DrawerHeader } from '../Styled'
import { useAuth } from '../../utils/auth'
import { GitHubLink } from './GitHubLink'
import { Subscription } from './Subscription'
import { PostAdd } from './PostAdd'
import { PostEdit } from './PostEdit'
import { MyPosts } from './MyPosts'
import { GlobalPosts } from './GlobalPosts'

export const useIconStyle = makeStyles({
  icon: {
    width: 40,
    height: 40,
  },
})

export const Drawer: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useRecoilState(drawerOpenState)
  const { isEdit } = useRecoilValue(editState)
  const closeDrawer = () => setDrawerOpen(false)

  const { user } = useAuth()

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
        {user?.username != null && (
          <>
            <PostAdd />
            {isEdit && <PostEdit />}
            <Divider />
            <MyPosts username={user.username} />
          </>
        )}
        <GlobalPosts />
        <Divider />
        <GitHubLink />
      </List>
    </StyledDrawer>
  )
}
