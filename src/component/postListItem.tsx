import React from 'react'
import { Post } from '../API'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Typography } from '@material-ui/core'

type Props = {
  post: Post
}

export const PostListItem: React.FC<Props> = ({ post }) => {
  return (
    <React.Fragment>
      <ReactMarkdown>{post.content}</ReactMarkdown>
      {post.codes.items &&
        post.codes.items.map((code, key) => (
          <React.Fragment key={key}>
            <Typography variant="body2" color="secondary">
              {code.name}
            </Typography>
            <SyntaxHighlighter language={code.lang} style={dark}>
              {code.code}
            </SyntaxHighlighter>
          </React.Fragment>
        ))}
    </React.Fragment>
  )
}
