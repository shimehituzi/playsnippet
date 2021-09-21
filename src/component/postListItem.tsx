import React from 'react'
import { Post } from '../API'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'

type Props = {
  post: Post
}

export const PostListItem: React.FC<Props> = ({ post }) => {
  return (
    <React.Fragment>
      <ReactMarkdown>{post.content}</ReactMarkdown>
      {post.codes.items &&
        post.codes.items.map((code, key) => (
          <SyntaxHighlighter language={code.lang} key={key} style={dark}>
            {code.code}
          </SyntaxHighlighter>
        ))}
    </React.Fragment>
  )
}
