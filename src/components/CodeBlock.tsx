import React from 'react'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/vsDark'
import { makeStyles } from '@mui/styles'

type Props = {
  code: string
  lang: string
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

export const CodeBlock: React.FC<Props> = ({ code, lang }) => {
  const classes = useStyle()

  return (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={code}
      language={lang as Language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className + ' ' + classes.pre} style={style}>
          {tokens.map((line, l) => {
            const lineProps = { ...getLineProps({ line, key: l }) }
            lineProps.className = lineProps.className + ' ' + classes.line
            return (
              <div key={l} {...lineProps}>
                <span className={classes.lineNo}>{l + 1}</span>
                <span className={classes.lineContonet}>
                  {line.map((token, t) => (
                    <span key={t} {...getTokenProps({ token, key: t })} />
                  ))}
                </span>
              </div>
            )
          })}
        </pre>
      )}
    </Highlight>
  )
}
