import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { editPostFormState, editCodesFormState } from '../../state/formState'
import { editState, subscribeFlagState } from '../../state/uiState'
import { codesSelector, postSelector } from '../../state/apiState'
import {
  updateCodeMutation,
  updatePostMutation,
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
  const { authenticated } = useAuth()

  const initialPost = useRecoilValue(postSelector(edit.id))
  const initialCodes = useRecoilValue(codesSelector(edit.id))

  const postState = useRecoilState(editPostFormState)
  const [post, setPost] = postState
  const codesState = useRecoilState(editCodesFormState)
  const [codes, setCodes] = codesState

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
  }

  const cancel = () => {
    if (window.confirm('Are you sure you want to cancel edit?')) {
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

  const submit = async () => {
    if (!authenticated) return
    setSubscribeFlag(true)

    await updatePostMutation({ input: { id: edit.id, ...post } })

    codes.forEach(async (code) => {
      updateCodeMutation({ input: { id: edit.id, ...code } })
    })

    setPost({
      title: '',
      content: '',
    })
    setCodes([])
    onClose()
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
          submit={submit}
        />
      </Dialog>
    </>
  )
}
