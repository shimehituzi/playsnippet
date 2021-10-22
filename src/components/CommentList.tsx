import React from 'react'
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material'
import { OmittedComment } from '../state/commentsState'
import { Avatar } from './Avatar'

type Props = {
  comments: OmittedComment[]
}

export const CommentList: React.FC<Props> = ({ comments }) => {
  return (
    <List>
      {comments.map((comment, key) => (
        <ListItem key={key}>
          <ListItemAvatar>
            <Avatar username={comment.owner} size={40} />
          </ListItemAvatar>
          <ListItemText
            primary={comment.owner}
            secondary={
              <Typography variant="body2">{comment.content}</Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  )
}
