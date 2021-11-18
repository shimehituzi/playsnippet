import React, { useEffect, useRef, useState } from 'react'
import { Collapse, Grid, IconButton, Paper, Stack } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  accuracySelector,
  typingIDState,
  typingScoreState,
} from '../state/typingState'
import { StackItem } from './Styled'

const useStyle = makeStyles({
  paper: {
    position: 'fixed',
    top: 'auto',
    margin: '0.2%',
    zIndex: 9999,
  },
})

export const TypingScore: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [{ correct }, setTypingScore] = useRecoilState(typingScoreState)
  const accuracy = useRecoilValue(accuracySelector)
  const typingID = useRecoilValue(typingIDState)
  const { time, stop } = useTimer()

  const close = () => {
    setTypingScore({
      startTime: 0,
      typed: 0,
      correct: 0,
    })
    setOpen(false)
  }

  const cps = time !== 0 ? correct / time : 0

  const formatTime = (time: number) => {
    const getSeconds = `0${time % 60}`.slice(-2)
    const getMinutes = `0${Math.floor(time / 60) % 60}`.slice(-2)
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2)

    return `${getHours} : ${getMinutes} : ${getSeconds}`
  }

  useEffect(() => {
    if (typingID !== null) setOpen(true)
  }, [typingID])

  useEffect(() => {
    if (typingID === null) stop()
  }, [typingID])

  const classes = useStyle()

  return (
    <Grid item xs={12} sx={{ paddingX: '2%' }}>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Paper className={classes.paper} elevation={24}>
          <Stack direction="row" spacing={2}>
            <StackItem>Time: {formatTime(time)}</StackItem>
            <StackItem>Character/Second: {cps.toFixed(2)}</StackItem>
            <StackItem>Accuracy: {accuracy.toFixed(2)}%</StackItem>
            {typingID === null && (
              <StackItem>
                <IconButton onClick={close} sx={{ width: 15, height: 15 }}>
                  <CloseIcon />
                </IconButton>
              </StackItem>
            )}
          </Stack>
        </Paper>
      </Collapse>
    </Grid>
  )
}

const useTimer = () => {
  const [time, setTime] = useState<number>(0)
  const { startTime } = useRecoilValue(typingScoreState)
  const ref: { current: NodeJS.Timeout | null } = useRef(null)

  const stop = () => {
    if (ref.current !== null) {
      clearInterval(ref.current)
    }
  }

  useEffect(() => {
    stop()
    ref.current = setInterval(() => {
      const now = Date.now()
      const diff = Math.floor((now - startTime) / 1000)
      setTime(diff)
    }, 1000)
    return () => {
      if (ref.current !== null) clearInterval(ref.current)
    }
  }, [startTime])

  return { time, stop }
}
