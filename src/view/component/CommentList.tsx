import React from 'react'
import {
  Avatar,
  colors,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material'
import { OmittedComment } from '../../state/commentsState'

type Props = {
  comments: OmittedComment[]
}

export const CommentList: React.FC<Props> = ({ comments }) => {
  return (
    <List>
      {comments.map((comment, key) => (
        <ListItem key={key}>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: colors.grey[300] }}>
              {comment.owner.charAt(0).toUpperCase()}
            </Avatar>
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
