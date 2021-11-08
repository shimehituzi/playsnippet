import React, { useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { postFormState, codesFormState } from '../../state/formState'
import {
  Dialog,
  Paper,
  PaperProps,
  ListItem,
  ListItemIcon,
  ListItemText,
  DialogTitle,
  DialogContent,
  Grid,
  IconButton,
} from '@mui/material'
import Draggable from 'react-draggable'
import {
  DeleteForever as DeleteForeverIcon,
  PostAdd as PostAddIcon,
} from '@mui/icons-material'
import { useIconStyle } from './index'
import { PostForm } from '../PostForm'
import { subscribeFlagState } from '../../state/uiState'

const PaperComponent: React.FC<PaperProps> = (props) => {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  )
}

export const PostAdd: React.FC = () => {
  const classes = useIconStyle()
  const [open, setOpenFlag] = useState<boolean>(false)
  const setSubscribeFlag = useSetRecoilState(subscribeFlagState)

  const postState = useRecoilState(postFormState)
  const setPost = postState[1]
  const codesState = useRecoilState(codesFormState)
  const setCodes = codesState[1]

  const onClick = () => {
    setOpenFlag(true)
    setSubscribeFlag(true)
  }

  const onClose = () => {
    setOpenFlag(false)
    setSubscribeFlag(false)
  }

  const cancel = () => {
    if (window.confirm('Are you sure you want to delete post and codes?')) {
      setPost({
        title: '',
        content: '',
      })
      setCodes([])
      setOpenFlag(false)
    }
  }

  return (
    <>
      <ListItem button onClick={onClick}>
        <ListItemIcon>
          <PostAddIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText>Create a Post</ListItemText>
      </ListItem>
      <Dialog
        open={open}
        onClose={onClose}
        scroll="paper"
        maxWidth="md"
        fullWidth={true}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>Post Form</Grid>
            <Grid item>
              <IconButton onClick={cancel}>
                <DeleteForeverIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent id="scroll-dialog-description">
          <PostForm
            postState={postState}
            codesState={codesState}
            onClose={onClose}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
