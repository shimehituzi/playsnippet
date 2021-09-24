import React from 'react'
import { LineContent } from './styled'

type CodeToken = {
  types: string[]
  content: string
  empty?: boolean
}

type Props = {
  line: CodeToken[]
}

export const UnFinishedLine: React.FC<Props> = ({ line }) => {
  return (
    <LineContent>
      {line.map((token, t) => (
        <span key={t} style={{ color: 'gray' }}>
          {token.content}
        </span>
      ))}
    </LineContent>
  )
}
