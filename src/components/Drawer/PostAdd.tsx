import React, { useState } from 'react'
import {
  Dialog,
  Paper,
  PaperProps,
  ListItem,
  ListItemIcon,
  ListItemText,
  DialogTitle,
  DialogContent,
} from '@mui/material'
import Draggable from 'react-draggable'
import { PostAdd as PostAddIcon } from '@mui/icons-material'
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

  const onClick = () => {
    setOpenFlag(true)
  }

  const onClose = () => {
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
          Post Form
        </DialogTitle>
        <DialogContent id="scroll-dialog-description">
          <PostForm onClose={onClose} />
        </DialogContent>
      </Dialog>
    </>
  )
}
