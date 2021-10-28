import React, { useState } from 'react'
import Link from 'next/link'
import {
  CreateAvatarMutationVariables,
  UpdateAvatarMutationVariables,
  DeleteAvatarMutationVariables,
} from '../API'
import { createAvatar, deleteAvatar, updateAvatar } from '../graphql/mutations'
import { useAuth } from '../utils/auth'
import { useAvatar, useAvatarUpdate } from '../utils/avatar'
import { gqlMutation } from '../utils/graphql'
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
import {
  PersonRemoveOutlined as PersonRemoveOutlinedIcon,
  Logout as SignOutIcon,
  ManageAccounts as ManageAccountsIcon,
  GitHub as GitHubIcon,
} from '@mui/icons-material'
import { AmplifySignOut } from '@aws-amplify/ui-react'
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
        <div className={classes.logo}>
          <Link href="/">
            <Button className={classes.button}>
              <Typography variant="h4" color="primary">
                Play Snippet
              </Typography>
            </Button>
          </Link>
          <Link href="https://github.com/shimehituzi/playsnippet">
            <IconButton size="small">
              <GitHubIcon sx={{ width: 45, height: 45 }} />
            </IconButton>
          </Link>
        </div>
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

    await gqlMutation<CreateAvatarMutationVariables>({
      query: createAvatar,
      variables: {
        input: {
          owner: user.username,
          avatar: imageURL,
        },
      },
    })

    forceUpdate()
  }

  const handleUpdateAvatar = async (imageURL: string) => {
    if (!user || !user.username) return

    await gqlMutation<UpdateAvatarMutationVariables>({
      query: updateAvatar,
      variables: {
        input: {
          owner: user.username,
          avatar: imageURL,
        },
      },
    })

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
        await gqlMutation<DeleteAvatarMutationVariables>({
          query: deleteAvatar,
          variables: {
            input: {
              owner: user.username,
            },
          },
        })
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
