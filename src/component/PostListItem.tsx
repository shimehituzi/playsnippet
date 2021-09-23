import React from 'react'
import { Post } from '../API'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { IconButton, Typography } from '@material-ui/core'
import { Delete as DeleteIcon } from '@material-ui/icons'

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
            <SyntaxHighlighter language={code.lang} style={vscDarkPlus}>
              {code.code}
            </SyntaxHighlighter>
          </React.Fragment>
        ))}
    </React.Fragment>
  )
}
