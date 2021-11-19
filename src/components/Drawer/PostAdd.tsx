import React, { useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { postFormState, codesFormState } from '../../state/formState'
import { subscribeFlagState } from '../../state/uiState'
import {
  createCodeMutation,
  createPostMutation,
} from '../../utils/api/mutation'
import { useAuth } from '../../utils/auth'
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
  const { authenticated } = useAuth()

  const postState = useRecoilState(postFormState)
  const [post, setPost] = postState
  const codesState = useRecoilState(codesFormState)
  const [codes, setCodes] = codesState

  const onClick = () => {
    setOpenFlag(true)
    setSubscribeFlag(true)
  }

  const onClose = () => {
    setOpenFlag(false)
  }

  const cancel = () => {
    if (window.confirm('Are you sure you want to delete post and codes?')) {
      reset()
    }
  }

  const submit = async () => {
    if (!authenticated) return
    setSubscribeFlag(true)

    const res = await createPostMutation({ input: { ...post, type: 'post' } })
    const postID = res.data?.createPost?.id

    if (postID) {
      codes.forEach(async (code) => {
        await createCodeMutation({
          input: {
            title: code.title,
            content: code.content,
            lang: code.lang,
            postID: postID,
            skipline: '',
            type: 'code',
          },
        })
      })
    }

    reset()
  }

  const reset = () => {
    setPost({
      title: '',
      content: '',
    })
    setCodes([])
    setOpenFlag(false)
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
            submit={submit}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
