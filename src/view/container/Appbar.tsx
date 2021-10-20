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
import { useAuth } from '../../utils/auth'
import {
  Logout as SignOutIcon,
  ManageAccounts as ManageAccountsIcon,
} from '@mui/icons-material'
import { AmplifySignOut } from '@aws-amplify/ui-react'
import { useAvatar } from '../../state/avatarsState'
import { Avatar } from '../component/Avatar'

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  '@media all': {
    minHeight: 110,
  },
}))

export const Appbar: React.FC = () => {
  const { authenticated, user } = useAuth()

  return (
    <AppBar position="static">
      <StyledToolbar>
        <Typography
          variant="h4"
          color="primary"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          Play Snippet
        </Typography>
        {authenticated ? (
          <Account username={user ? user.username : ''} />
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
        {/*
        <MenuItem disableRipple style={{ backgroundColor: 'transparent' }}>
          <ListItemIcon>
            <ManageAccountsIcon />
          </ListItemIcon>
          <ListItemButton>Change Account Icon</ListItemButton>
        </MenuItem>
        */}
      </Menu>
    </React.Fragment>
  )
}

const useStyle = makeStyles({
  button: {
    textTransform: 'none',
    margin: '1%',
  },
})

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
