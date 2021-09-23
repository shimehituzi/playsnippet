import React from 'react'
import { LineContent } from './styled'

type GetTokenProps = App.CodeRendererProps['getTokenProps']

type Props = {
  line: App.CodeToken[]
  getTokenProps: GetTokenProps
}

export const FinishedLine: React.FC<Props> = ({ line, getTokenProps }) => {
  return (
    <LineContent>
      {line.map((token, t) => (
        <span key={t} {...getTokenProps({ token, key: t })} />
      ))}
    </LineContent>
  )
}
