import styled from 'styled-components'

export const Wrapper = styled.div`
  font-size: 1.2em;
  text-align: center;
`

export const Pre = styled.pre`
  font-family: 'Ricty', 'Ricty Diminished', 'Ricty Diminished Discord',
    'Courier New', Consolas, monospace;
  text-align: left;
  margin: 1em 0;
  padding: 0.5em;
  overflow: scroll;

  & .token-line {
    line-height: 1.6em;
    height: 1.6em;
  }
`

export const Line = styled.div`
  display: table-row;
`

export const LineNo = styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 1em;
  user-select: none;
  opacity: 0.5;
`

export const LineContent = styled.span`
  display: table-cell;
`
