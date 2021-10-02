import {
  Avatar,
  colors,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material'
import React from 'react'
import { OmittedComment } from '../../state/commentsState'

type Props = {
  comments: OmittedComment[]
}

export const CommentList: React.FC<Props> = ({ comments }) => {
  return (
    <List>
      {comments.map((comment) => {
        ;<ListItem>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: colors.grey[300] }}>
              {comment.owner.charAt(0).toUpperCase()}
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={comment.owner} secondary={comment.content} />
        </ListItem>
      })}
    </List>
  )
}
