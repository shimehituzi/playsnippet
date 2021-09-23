import React, { useEffect, useCallback, useMemo, useState } from 'react'
import { Wrapper, Pre, Line, LineNo } from './styled'
import { FinishedLine } from './FinishedLine'
import { ProgressingLine } from './ProgressingLine'
import { UnFinishedLine } from './UnFinishedLine'

type Props = App.CodeRendererProps

export type CharMap = {
  l: number
  t: number
  c: number
  character: string
  token: App.CodeToken
}[]

const isSpace = (str: string) => str.match(/^\s+$/) !== null

export const CodeRenderer: React.FC<Props> = ({
  className,
  style,
  tokens,
  getLineProps,
  getTokenProps,
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
            token.content
              .split('')
              .map((character, c) => ({
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
    if (gameOver) alert('Finish')
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
    <Wrapper>
      <Pre className={className} style={style}>
        {remapedTokens.map((line, l) => (
          <Line key={l} {...getLineProps({ line, key: l })}>
            <LineNo>{l + 1}</LineNo>
            {renderLine(line, l)}
          </Line>
        ))}
      </Pre>
    </Wrapper>
  )
}
