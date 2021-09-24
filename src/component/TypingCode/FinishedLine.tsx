import React from 'react'
import { LineContent } from './styled'

type CodeToken = {
  types: string[]
  content: string
  empty?: boolean
}

type StyleObj = {
  [key: string]: string | number | null
}

type TokenInputProps = {
  key?: React.Key
  style?: StyleObj
  className?: string
  token: CodeToken
  [otherProp: string]: any
}

type TokenOutputProps = {
  key?: React.Key
  style?: StyleObj
  className: string
  children: string
  [otherProp: string]: any
}

type GetTokenProps = (input: TokenInputProps) => TokenOutputProps

type Props = {
  line: CodeToken[]
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
