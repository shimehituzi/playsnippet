import React from 'react'
import { Post } from '../API'
import ReactMarkdown from 'react-markdown'
import { IconButton, Typography } from '@material-ui/core'
import { Delete as DeleteIcon } from '@material-ui/icons'
import { Code } from './Code'

type Props = {
  post: Post
  isOwner: boolean
  handleDeletePost: (postId: string) => Promise<void>
}

export const PostListItem: React.FC<Props> = ({
  handleDeletePost,
  post,
  isOwner,
}) => {
  const onDelete = () => handleDeletePost(post.id)

  return (
    <React.Fragment>
      {isOwner && (
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      )}
      <ReactMarkdown>{post.content}</ReactMarkdown>
      {post.codes.items &&
        post.codes.items.map((code, key) => (
          <React.Fragment key={key}>
            <Typography variant="body2" color="secondary">
              {code.name}
            </Typography>
            <Code code={code.code} lang={code.lang} />
          </React.Fragment>
        ))}
    </React.Fragment>
  )
}
