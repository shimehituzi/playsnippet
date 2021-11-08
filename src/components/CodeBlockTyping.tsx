import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/vsDark'
import { makeStyles } from '@mui/styles'

const useStyle = makeStyles({
  pre: {
    fontFamily:
      'Ricty, Ricty Diminished, Ricty Diminished Discord, Courier New, Consolas, monospace',
    textAlign: 'left',
    margin: '1em 0',
    padding: '0.5em',
    overflowX: 'scroll',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    '& .token-line': {
      lineHeight: '1.6em',
      height: '1.6em',
    },
  },
  line: {
    display: 'table-row',
  },
  lineNo: {
    display: 'table-cell',
    textAlign: 'right',
    paddingRight: '1em',
    userSelect: 'none',
    opacity: '0.5',
  },
  lineContonet: {
    display: 'table-cell',
  },
})

type Props = {
  code: string
  lang: string
  stop: () => void
}

export const CodeBlockTyping: React.FC<Props> = ({ code, lang, stop }) => {
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

type Token = Parameters<Highlight['getTokenProps']>[0]['token']
type RenderProps = Parameters<Highlight['props']['children']>[0]
type CharMap = {
  l: number
  t: number
  c: number
  character: string
  token: Token
}[]

const CodeRenderer: React.FC<RenderProps & { stop: () => void }> = ({
  className,
  style,
  tokens,
  getLineProps,
  getTokenProps,
  stop,
}) => {
  const classes = useStyle()

  const [gameOver, setGameOver] = useState<boolean>(false)
  const [cursor, setCursor] = useState<number>(0)

  const isSpace = (str: string) => str.match(/^\s+$/) !== null
  const remapedTokens: Token[][] = useMemo(
    () =>
      tokens.map((line) => {
        const crtoken: Token = { content: '\n', types: ['cr'] }
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
        )
        .filter((val) => val.character.match(/[\n\x20-\x7e]/) !== null),
    [remapedTokens]
  )

  const forward = useCallback(() => {
    setGameOver(cursor === charMap.length - 1)
    setCursor(gameOver ? cursor : cursor + 1)
  }, [cursor, gameOver, charMap])

  const judge = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault()
      if (e.key === 'Escape') {
        stop()
      }
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

  return (
    <pre className={className + ' ' + classes.pre} style={style}>
      {remapedTokens.map((line, l) => {
        const lineProps = { ...getLineProps({ line, key: l }) }
        lineProps.className = lineProps.className + ' ' + classes.line
        return (
          <div key={l} {...lineProps}>
            <span className={classes.lineNo}>{l + 1}</span>
            <span className={classes.lineContonet}>
              <LineRenderer
                {...{ l, line, cursor, gameOver, charMap, getTokenProps }}
              />
            </span>
          </div>
        )
      })}
    </pre>
  )
}

type GetTokenProps = Highlight['getTokenProps']
type LineRendererProps = {
  line: Token[]
  l: number
  cursor: number
  charMap: CharMap
  getTokenProps: GetTokenProps
  gameOver: boolean
}

const LineRenderer: React.FC<LineRendererProps> = ({
  line,
  l,
  cursor,
  charMap,
  getTokenProps,
  gameOver,
}) => {
  return (
    <>
      {gameOver || l < charMap[cursor]?.l ? (
        <>
          {line.map((token, t) => (
            <Syntax key={t} {...{ getTokenProps, token, t }} />
          ))}
        </>
      ) : l === charMap[cursor]?.l ? (
        <>
          {line.map((token, t) =>
            t < charMap[cursor]?.t ? (
              <Syntax key={t} {...{ getTokenProps, token, t }} />
            ) : t === charMap[cursor]?.t ? (
              <span key={t}>
                {token?.content.split('').map((v, c) => {
                  return c < charMap[cursor]?.c ? (
                    <Normal key={c} value={v} />
                  ) : c === charMap[cursor]?.c ? (
                    <Yellow key={c} value={v} />
                  ) : (
                    <Gray key={c} value={v} />
                  )
                })}
              </span>
            ) : (
              <Gray key={t} value={token.content} />
            )
          )}
        </>
      ) : (
        <>
          {line.map((token, t) => (
            <Gray key={t} value={token.content} />
          ))}
        </>
      )}
    </>
  )
}

type SyntaxProps = {
  getTokenProps: GetTokenProps
  token: Token
  t: number
}
const Syntax: React.FC<SyntaxProps> = ({ getTokenProps, token, t }) => {
  return <span {...getTokenProps({ token, key: t })} />
}

type StringProps = {
  value: string
}
const Normal: React.FC<StringProps> = ({ value }) => <span>{value}</span>
const Yellow: React.FC<StringProps> = ({ value }) => (
  <span style={{ background: 'yellow', color: 'black' }}>
    {value === '\n' ? '↵' : value}
  </span>
)
const Gray: React.FC<StringProps> = ({ value }) => (
  <span style={{ color: 'gray' }}>{value}</span>
)
