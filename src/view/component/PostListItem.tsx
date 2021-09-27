import React from 'react'
import ReactMarkdown from 'react-markdown'
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  colors,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core'
import {
  Delete as DeleteIcon,
  PlayArrow as PlayIcon,
  Stop as StopIcon,
} from '@material-ui/icons'
import { CodeTyping } from './CodeTyping'
import { Code } from './Code'
import { ConnectedPost } from '../../state/postsState'

const useStyle = makeStyles({
  avatar: {
    backgroundColor: colors.grey[300],
  },
  card: {
    backgroundColor: colors.grey[500],
    padding: '1%',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  button: {
    textTransform: 'none',
  },
})

type Props = {
  post: ConnectedPost
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

  const avatar = (
    <Avatar className={classes.avatar}>
      {post.owner.charAt(0).toUpperCase()}
    </Avatar>
  )

  const calcTime = (createdAt: string) => {
    const date = new Date(createdAt)
    return date.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
  }

  const subheader = `@${post.owner} - ${calcTime(post.createdAt)}`

  return (
    <Card className={classes.card}>
      <CardHeader
        title={<Typography variant="h5">{post.title}</Typography>}
        avatar={avatar}
        subheader={subheader}
      />
      <CardContent>
        <ReactMarkdown>{post.content}</ReactMarkdown>
        {post.codes &&
          post.codes.map((code, key) => (
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
                <CodeTyping code={code.content} lang={code.lang} stop={stop} />
              ) : (
                <Code code={code.content} lang={code.lang} />
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
      </CardContent>
    </Card>
  )
}
