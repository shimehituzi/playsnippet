import React from 'react'
import { LineContent } from './styled'

type Props = {
  line: App.CodeToken[]
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
