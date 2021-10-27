import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { codesSelector } from '../state/apiState'
import { typingIDState } from '../state/uiState'
import { Button, Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { PlayArrow as PlayIcon, Stop as StopIcon } from '@mui/icons-material'
import { CodeBlockTyping } from './CodeBlockTyping'
import { CodeBlock } from './CodeBlock'

type Props = {
  postID: string
}

const useStyle = makeStyles({
  button: {
    textTransform: 'none',
  },
})

export const Codes: React.FC<Props> = ({ postID }) => {
  const codes = useRecoilValue(codesSelector(postID))

  const [typingID, setTypingID] = useRecoilState(typingIDState)

  const play = (id: string) => () => {
    setTypingID(id)
  }

  const stop = () => {
    setTypingID(null)
  }

  const classes = useStyle()

  return (
    <>
      {codes.map((code, key) => (
        <React.Fragment key={key}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="body2" color="secondary">
                {code.title}
              </Typography>
            </Grid>
            {typingID === code.id ? (
              <Grid item>
                <Button
                  onClick={stop}
                  size="small"
                  color="secondary"
                  variant="contained"
                  startIcon={<StopIcon />}
                  className={classes.button}
                >
                  Stop Typing
                </Button>
              </Grid>
            ) : (
              <Grid item>
                <Button
                  onClick={play(code.id)}
                  size="small"
                  color="primary"
                  variant="contained"
                  startIcon={<PlayIcon />}
                  className={classes.button}
                >
                  Play Typing
                </Button>
              </Grid>
            )}
          </Grid>
          {typingID === code.id ? (
            <CodeBlockTyping code={code.content} lang={code.lang} stop={stop} />
          ) : (
            <CodeBlock code={code.content} lang={code.lang} />
          )}
        </React.Fragment>
      ))}
    </>
  )
}
