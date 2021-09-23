import React, { useEffect, useCallback, useMemo, useState } from 'react'
import { Pre, Line, LineNo } from './styled'
import { FinishedLine } from './FinishedLine'
import { ProgressingLine } from './ProgressingLine'
import { UnFinishedLine } from './UnFinishedLine'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/vsDark'

type Props = {
  code: string
  lang: string
  stop: () => void
}

export const TypingCode: React.FC<Props> = ({ code, lang, stop }) => {
  return (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={code}
      language={lang as Language}
    >
      {(props) => <CodeRenderer {...props} stop={stop} />}
    </Highlight>
  )
}

const isSpace = (str: string) => str.match(/^\s+$/) !== null

type CharMap = {
  l: number
  t: number
  c: number
  character: string
  token: App.CodeToken
}[]

const CodeRenderer: React.FC<App.CodeRendererProps & { stop: () => void }> = ({
  className,
  style,
  tokens,
  getLineProps,
  getTokenProps,
  stop,
}) => {
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [cursor, setCursor] = useState<number>(0)

  const remapedTokens: App.CodeToken[][] = useMemo(
    () =>
      tokens.map((line) => {
        const crtoken: App.CodeToken = { content: '\n', types: ['cr'] }
        return [...line.filter((token) => !token.empty), crtoken]
      }),
    [tokens]
  )

  const charMap: CharMap = useMemo(
    () =>
      remapedTokens
        .map((line, l) =>
          line.map((token, t) =>
            token.content.split('').map((character, c) => ({
              l: l,
              t: t,
              c: c,
              character: character,
              token: token,
            }))
          )
        )
        .flat(2)
        .filter(
          (val) =>
            !(
              val.t === 0 &&
              isSpace(val.token.content) &&
              !(val.character === '\n')
            )
        ),
    [remapedTokens]
  )

  const forward = useCallback(() => {
    setGameOver(cursor === charMap.length - 1)
    setCursor(gameOver ? cursor : cursor + 1)
  }, [cursor, gameOver, charMap])

  const judge = useCallback(
    (e: KeyboardEvent) => {
      if (gameOver) return
      const current = charMap[cursor]?.character
      if (e.key === current || (e.key === 'Enter' && current === '\n')) {
        e.preventDefault()
        forward()
      }
    },
    [gameOver, charMap, cursor, forward]
  )

  useEffect(() => {
    window.addEventListener('keydown', judge)
    return () => {
      window.removeEventListener('keydown', judge)
    }
  }, [judge])

  useEffect(() => {
    if (gameOver) {
      alert('Finish')
      stop()
    }
  }, [gameOver])

  useEffect(() => {
    return () => {
      setGameOver(false)
      setCursor(0)
    }
  }, [])

  const renderLine = (line: App.CodeToken[], l: number): JSX.Element => {
    if (gameOver)
      return <FinishedLine line={line} getTokenProps={getTokenProps} />
    if (l < charMap[cursor]?.l) {
      return <FinishedLine line={line} getTokenProps={getTokenProps} />
    } else if (l === charMap[cursor]?.l) {
      return (
        <ProgressingLine
          line={line}
          getTokenProps={getTokenProps}
          ct={charMap[cursor]?.t}
          cc={charMap[cursor]?.c}
        />
      )
    } else {
      return <UnFinishedLine line={line} />
    }
  }

  return (
    <Pre className={className} style={style}>
      {remapedTokens.map((line, l) => (
        <Line key={l} {...getLineProps({ line, key: l })}>
          <LineNo>{l + 1}</LineNo>
          {renderLine(line, l)}
        </Line>
      ))}
    </Pre>
  )
}
