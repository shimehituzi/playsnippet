import React from 'react'
import { useRecoilValue } from 'recoil'
import { commentsSelector } from '../state/apiState'
import * as APIt from '../API'
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
  comments?: APIt.Comment[]
}

export const Comments: React.FC<Props> = (props) => {
  const comments = useRecoilValue(commentsSelector(props.postID))
  return (
    <CommentsRenderer comments={props.comments ? props.comments : comments} />
  )
}

type RendererProps = {
  comments: APIt.Comment[]
}

const CommentsRenderer: React.FC<RendererProps> = ({ comments }) => {
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
