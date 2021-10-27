import React from 'react'
import { useRecoilValue } from 'recoil'
import { commentsSelector } from '../state/apiState'
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material'
import { Avatar } from './Avatar'

type Props = {
  postID: string
}

export const Comments: React.FC<Props> = ({ postID }) => {
  const comments = useRecoilValue(commentsSelector(postID))

  return (
    <List>
      {comments.map((comment, key) => (
        <ListItem key={key}>
          <ListItemAvatar>
            <Avatar username={comment.owner ?? ''} size={40} />
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
