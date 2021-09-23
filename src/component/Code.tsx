import React from 'react'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/vsDark'
import { CodeRenderer } from './CodeRenderer'

type Props = {
  code: string
  lang: string
}

export const Code: React.FC<Props> = ({ code, lang }) => {
  return (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={code}
      language={lang as Language}
    >
      {(props) => <CodeRenderer {...props} />}
    </Highlight>
  )
}
