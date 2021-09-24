import React from 'react'
import { Post } from '../API'
import ReactMarkdown from 'react-markdown'
import { Button, Grid, makeStyles, Typography } from '@material-ui/core'
import {
  Delete as DeleteIcon,
  PlayArrow as PlayIcon,
  Stop as StopIcon,
} from '@material-ui/icons'
import { Typing } from './Typing'
import { Code } from './Code'

const useStyle = makeStyles({
  button: {
    textTransform: 'none',
  },
})

type Props = {
  post: Post
  isOwner: boolean
  handleDeletePost: (postId: string) => Promise<void>
  typingID: string
  setTypingID: React.Dispatch<React.SetStateAction<string>>
}

export const PostListItem: React.FC<Props> = ({
  post,
  isOwner,
  handleDeletePost,
  typingID,
  setTypingID,
}) => {
  const classes = useStyle()

  const onDelete = () => {
    if (window.confirm('Are you sure you want to delete it?')) {
      handleDeletePost(post.id)
    }
  }

  const play = (id: string) => () => {
    setTypingID(id)
  }

  const stop = () => {
    setTypingID('')
  }

  return (
    <React.Fragment>
      <ReactMarkdown>{post.content}</ReactMarkdown>
      {post.codes.items &&
        post.codes.items.map((code, key) => (
          <React.Fragment key={key}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="body2" color="secondary">
                  {code.name}
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
              <Typing code={code.code} lang={code.lang} stop={stop} />
            ) : (
              <Code code={code.code} lang={code.lang} />
            )}
          </React.Fragment>
        ))}
      {isOwner && (
        <Button
          onClick={onDelete}
          size="small"
          color="default"
          variant="contained"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      )}
    </React.Fragment>
  )
}
