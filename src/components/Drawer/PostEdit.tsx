import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { editPostFormState, editCodesFormState } from '../../state/formState'
import {
  Dialog,
  Paper,
  PaperProps,
  ListItem,
  ListItemIcon,
  ListItemText,
  DialogTitle,
  Grid,
  IconButton,
} from '@mui/material'
import Draggable from 'react-draggable'
import {
  DeleteForever as DeleteForeverIcon,
  Edit as EditIcon,
} from '@mui/icons-material'
import { useIconStyle } from './index'
import { PostForm } from '../PostForm'
import { editState, subscribeFlagState } from '../../state/uiState'
import { codesSelector, postSelector } from '../../state/apiState'

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

export const PostEdit: React.FC = () => {
  const classes = useIconStyle()
  const [edit, setEdit] = useRecoilState(editState)
  const setSubscribeFlag = useSetRecoilState(subscribeFlagState)

  const initialPost = useRecoilValue(postSelector(edit.id))
  const initialCodes = useRecoilValue(codesSelector(edit.id))

  const postState = useRecoilState(editPostFormState)
  const setPost = postState[1]
  const codesState = useRecoilState(editCodesFormState)
  const setCodes = codesState[1]

  useEffect(() => {
    setPost({
      title: initialPost?.title ?? '',
      content: initialPost?.content ?? '',
    })
    setCodes(
      initialCodes.map(({ title, content, lang }) => ({ title, content, lang }))
    )
  }, [initialPost, initialCodes])

  const onClick = () => {
    setEdit((prev) => ({
      ...prev,
      open: true,
    }))
    setSubscribeFlag(true)
  }

  const onClose = () => {
    setEdit((prev) => ({
      ...prev,
      open: false,
    }))
    setSubscribeFlag(false)
  }

  const cancel = () => {
    if (window.confirm('Are you sure you want to delete post and codes?')) {
      setPost({
        title: '',
        content: '',
      })
      setCodes([])
      setEdit({
        isEdit: false,
        open: false,
        id: '',
      })
    }
  }

  return (
    <>
      <ListItem button onClick={onClick}>
        <ListItemIcon>
          <EditIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText>Edit a Post</ListItemText>
      </ListItem>
      <Dialog
        open={edit.open}
        onClose={onClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>Edit Form</Grid>
            <Grid item>
              <IconButton onClick={cancel}>
                <DeleteForeverIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <PostForm
          postState={postState}
          codesState={codesState}
          onClose={onClose}
        />
      </Dialog>
    </>
  )
}
