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
  ct: number
  cc: number
}

type ChildProps = {
  token: CodeToken
  cc: number
}

export const ProgressingLine: React.FC<Props> = ({
  line,
  getTokenProps,
  ct,
  cc,
}) => {
  const renderToken = (token: CodeToken, t: number) => {
    if (t < ct) {
      return <span key={t} {...getTokenProps({ token, key: t })} />
    } else if (t === ct) {
      return <ProgressingToken key={t} token={token} cc={cc} />
    } else {
      return (
        <span key={t} style={{ color: 'gray' }}>
          {token.content}
        </span>
      )
    }
  }

  return (
    <LineContent>{line.map((token, t) => renderToken(token, t))}</LineContent>
  )
}

const ProgressingToken: React.FC<ChildProps> = ({ token, cc }) => {
  const caracters = token?.content.split('').map((v, c) => {
    if (c < cc) {
      return <span key={c}>{v}</span>
    } else if (c === cc) {
      return (
        <span key={c} style={{ backgroundColor: 'yellow', color: 'black' }}>
          {v === '\n' ? '↵' : v}
        </span>
      )
    } else {
      return (
        <span key={c} style={{ color: 'gray' }}>
          {v}
        </span>
      )
    }
  })
  return <>{caracters}</>
}
