import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { editPostFormState, editCodesFormState } from '../../state/formState'
import { editState, subscribeFlagState } from '../../state/uiState'
import { codesSelector, postSelector } from '../../state/apiState'
import {
  updatePostMutation,
  createCodeMutation,
  updateCodeMutation,
  deleteCodeMutation,
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
  Edit as EditIcon,
} from '@mui/icons-material'
import { useIconStyle } from './index'
import { PostForm } from '../PostForm'
import { getPost, listCodesByPost } from '../../utils/api/query'
import { notNull } from '../../utils/nullable'
import { differenceSet, intersectionSet } from '../../utils/set'

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
      initialCodes.map(({ title, content, lang, id }) => ({
        id,
        title,
        content,
        lang,
      }))
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
      reset()
    }
  }

  const submit = async () => {
    if (!authenticated) return
    setSubscribeFlag(true)

    const serverPost = (await getPost({ id: edit.id })).data?.getPost
    if (serverPost != null) {
      await updatePostMutation({ input: { ...post, id: serverPost.id } })

      const res = await listCodesByPost({ postID: serverPost.id })
      const serverCodeIDs = new Set(
        res.data?.listCodesByPost?.items?.filter(notNull).map((v) => v.id) ?? []
      )
      const localCodeIDs = new Set(codes.map((v) => v.id))

      const createIDs = differenceSet(localCodeIDs, serverCodeIDs)
      const updateIDs = intersectionSet(localCodeIDs, serverCodeIDs)
      const deleteIDs = differenceSet(serverCodeIDs, localCodeIDs)

      const createCodes = codes.filter((code) => createIDs.has(code.id))
      const updateCodes = codes.filter((code) => updateIDs.has(code.id))

      createCodes.forEach(async (code) => {
        await createCodeMutation({
          input: {
            title: code.title,
            content: code.content,
            lang: code.lang,
            postID: serverPost.id,
            skipline: '',
            type: 'code',
          },
        })
      })

      updateCodes.forEach(async (code) => {
        await updateCodeMutation({ input: { ...code } })
      })

      Array.from(deleteIDs).forEach(async (id) => {
        await deleteCodeMutation({ input: { id } })
      })
    } else {
      alert('This post has already been deleted.')
    }

    reset()
  }

  const reset = () => {
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
            <Grid item>Edit Form</Grid>
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
