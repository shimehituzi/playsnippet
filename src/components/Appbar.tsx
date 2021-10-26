import React, { useState } from 'react'
import Link from 'next/link'
import {
  AppBar,
  Button,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import { useAuth } from '../utils/auth'
import {
  PersonRemoveOutlined as PersonRemoveOutlinedIcon,
  Logout as SignOutIcon,
  ManageAccounts as ManageAccountsIcon,
} from '@mui/icons-material'
import API, { graphqlOperation } from '@aws-amplify/api'
import {
  CreateAvatarMutationVariables,
  UpdateAvatarMutationVariables,
  DeleteAvatarMutationVariables,
} from '../API'
import { createAvatar, deleteAvatar, updateAvatar } from '../graphql/mutations'
import { AmplifySignOut } from '@aws-amplify/ui-react'
import { useAvatar, useAvatarUpdate } from '../state/avatarsState'
import { Avatar } from './Avatar'

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  '@media all': {
    minHeight: 110,
  },
}))

const useStyle = makeStyles({
  logo: {
    flexGrow: 1,
  },
  button: {
    textTransform: 'none',
    margin: '1%',
  },
})

export const Appbar: React.FC = () => {
  const { authenticated, user } = useAuth()
  const classes = useStyle()

  return (
    <AppBar position="static">
      <StyledToolbar>
        <Link href="/">
          <div className={classes.logo}>
            <Button className={classes.button}>
              <Typography variant="h4" color="primary">
                Play Snippet
              </Typography>
            </Button>
          </div>
        </Link>
        {authenticated && user?.username ? (
          <Account username={user.username} />
        ) : (
          <Sign />
        )}
      </StyledToolbar>
    </AppBar>
  )
}

type AccountProps = {
  username: string
}

const Account: React.FC<AccountProps> = ({ username }) => {
  const { user } = useAuth()
  const avatar = useAvatar(username)
  const forceUpdate = useAvatarUpdate()

  const handleCreateAvatar = async (imageURL: string) => {
    if (!user || !user.username) return
    const createAvatarMutationVariables: CreateAvatarMutationVariables = {
      input: {
        owner: user.username,
        avatar: imageURL,
      },
    }
    await API.graphql(
      graphqlOperation(createAvatar, createAvatarMutationVariables)
    )
    forceUpdate()
  }

  const handleUpdateAvatar = async (imageURL: string) => {
    if (!user || !user.username) return
    const updateAvatarMutationVariables: UpdateAvatarMutationVariables = {
      input: {
        owner: user.username,
        avatar: imageURL,
      },
    }
    await API.graphql(
      graphqlOperation(updateAvatar, updateAvatarMutationVariables)
    )
    forceUpdate()
  }

  const fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !user.username) return
    const file = e.target.files?.[0]
    const reader = new FileReader()

    reader.onload = async () => {
      const imageURL = reader.result?.toString()
      if (!imageURL) return
      const size = Buffer.from(imageURL).length / 1e3
      if (size <= 400) {
        if (avatar) {
          handleUpdateAvatar(imageURL)
        } else {
          handleCreateAvatar(imageURL)
        }
      } else {
        alert('Sorry, the file size is too large.')
      }
    }

    if (file) {
      reader.readAsDataURL(file)
      e.target.value = ''
    }
  }

  const handleDeleteAvatar = async () => {
    if (!user || !user.username) return
    if (avatar) {
      if (!user || !user.username) return
      if (window.confirm('Are you sure you want to REMOVE Account Icon?')) {
        const deleteAvatarMutationVariables: DeleteAvatarMutationVariables = {
          input: {
            owner: user.username,
          },
        }
        await API.graphql(
          graphqlOperation(deleteAvatar, deleteAvatarMutationVariables)
        )
        forceUpdate()
      }
    } else {
      alert("you don't have avatar")
    }
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }
  const closeMenu = () => {
    setAnchorEl(null)
  }

  return (
    <React.Fragment>
      <IconButton onClick={openMenu}>
        <Avatar username={username} size={75} />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={closeMenu} keepMounted>
        <MenuItem disableRipple style={{ backgroundColor: 'transparent' }}>
          <ListItemIcon>
            <SignOutIcon />
          </ListItemIcon>
          <ListItemText>
            <AmplifySignOut />
          </ListItemText>
        </MenuItem>
        <MenuItem disableRipple style={{ backgroundColor: 'transparent' }}>
          <ListItemIcon>
            <ManageAccountsIcon />
          </ListItemIcon>
          <ListItemButton component="label">
            {avatar ? 'Change Account Icon' : 'Upload Account Icon'}
            <input
              type="file"
              accept="image/jpeg,image/png,image/jpg,image/gif,image/svg"
              hidden
              onChange={fileChange}
            />
          </ListItemButton>
        </MenuItem>
        {avatar && (
          <MenuItem disableRipple style={{ backgroundColor: 'transparent' }}>
            <ListItemIcon>
              <PersonRemoveOutlinedIcon />
            </ListItemIcon>
            <ListItemButton onClick={handleDeleteAvatar}>
              Remove Account Icon
            </ListItemButton>
          </MenuItem>
        )}
      </Menu>
    </React.Fragment>
  )
}

const Sign: React.FC = () => {
  const classes = useStyle()

  return (
    <React.Fragment>
      <Link href={'/signin'}>
        <Button
          component="a"
          variant="text"
          color="primary"
          size="large"
          className={classes.button}
        >
          <Typography variant="h5">Sign in</Typography>
        </Button>
      </Link>
      <Link href={'/signup'}>
        <Button
          component="a"
          variant="outlined"
          color="primary"
          size="large"
          className={classes.button}
        >
          <Typography variant="h5">Sign up</Typography>
        </Button>
      </Link>
    </React.Fragment>
  )
}
