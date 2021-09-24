import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/vsDark'
import { makeStyles } from '@material-ui/core'

type Props = {
  code: string
  lang: string
  stop: () => void
}

const useStyle = makeStyles({
  pre: {
    fontFamily:
      'Ricty, Ricty Diminished, Ricty Diminished Discord, Courier New, Consolas, monospace',
    textAlign: 'left',
    margin: '1em 0',
    padding: '0.5em',
    overflow: 'scroll',
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

export const Typing: React.FC<Props> = ({ code, lang, stop }) => {
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

type GetTokenProps = Highlight['getTokenProps']
type Token = Parameters<Highlight['getTokenProps']>[0]['token']
type RenderProps = Parameters<Highlight['props']['children']>[0]

type CharMap = {
  l: number
  t: number
  c: number
  character: string
  token: Token
}[]

const isSpace = (str: string) => str.match(/^\s+$/) !== null

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

  const renderLine = (line: Token[], l: number): JSX.Element => {
    if (gameOver) return <Finished line={line} getTokenProps={getTokenProps} />
    if (l < charMap[cursor]?.l) {
      return <Finished line={line} getTokenProps={getTokenProps} />
    } else if (l === charMap[cursor]?.l) {
      return (
        <Progressing
          line={line}
          getTokenProps={getTokenProps}
          ct={charMap[cursor]?.t}
          cc={charMap[cursor]?.c}
        />
      )
    } else {
      return <UnFinished line={line} />
    }
  }

  return (
    <pre className={className + ' ' + classes.pre} style={style}>
      {tokens.map((line, l) => {
        const lineProps = { ...getLineProps({ line, key: l }) }
        lineProps.className = lineProps.className + ' ' + classes.line
        return (
          <div key={l} {...lineProps}>
            <span className={classes.lineNo}>{l + 1}</span>
            {renderLine(line, l)}
          </div>
        )
      })}
    </pre>
  )
}

type FinishedProps = {
  line: Token[]
  getTokenProps: GetTokenProps
}

export const Finished: React.FC<FinishedProps> = ({ line, getTokenProps }) => {
  const classes = useStyle()

  return (
    <span className={classes.lineContonet}>
      {line.map((token, t) => (
        <span key={t} {...getTokenProps({ token, key: t })} />
      ))}
    </span>
  )
}

type ProgreessingProps = {
  line: Token[]
  getTokenProps: GetTokenProps
  ct: number
  cc: number
}

type ProgressingChildProps = {
  token: Token
  cc: number
}

export const Progressing: React.FC<ProgreessingProps> = ({
  line,
  getTokenProps,
  ct,
  cc,
}) => {
  const classes = useStyle()

  const renderToken = (token: Token, t: number) => {
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
    <span className={classes.lineContonet}>
      {line.map((token, t) => renderToken(token, t))}
    </span>
  )
}

const ProgressingToken: React.FC<ProgressingChildProps> = ({ token, cc }) => {
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
  return <React.Fragment>{caracters}</React.Fragment>
}

type UnFinishedProps = {
  line: Token[]
}

export const UnFinished: React.FC<UnFinishedProps> = ({ line }) => {
  const classes = useStyle()

  return (
    <span className={classes.lineContonet}>
      {line.map((token, t) => (
        <span key={t} style={{ color: 'gray' }}>
          {token.content}
        </span>
      ))}
    </span>
  )
}
