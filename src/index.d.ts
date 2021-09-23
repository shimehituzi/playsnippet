declare namespace App {
  type CodeToken = {
    types: string[]
    content: string
    empty?: boolean
  }

  type StyleObj = {
    [key: string]: string | number | null
  }

  type LineInputProps = {
    key?: React.Key
    style?: StyleObj
    className?: string
    line: CodeToken[]
    [otherProp: string]: any
  }

  type LineOutputProps = {
    key?: React.Key
    style?: StyleObj
    className: string
    [otherProps: string]: any
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

  type CodeRendererProps = {
    tokens: CodeToken[][]
    className: string
    style: StyleObj
    getLineProps: (input: LineInputProps) => LineOutputProps
    getTokenProps: (input: TokenInputProps) => TokenOutputProps
  }
}
