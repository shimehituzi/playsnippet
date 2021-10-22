import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  colors,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import {
  Delete as DeleteIcon,
  ExpandLess,
  ExpandMore,
  MoreVert as MoreVertIcon,
  PlayArrow as PlayIcon,
  Stop as StopIcon,
} from '@mui/icons-material'
import { CodeTyping } from './CodeTyping'
import { Code } from './Code'
import { ConnectedPost } from '../state/postsState'
import dayjs, { OpUnitType } from 'dayjs'
import { useAuth } from '../utils/auth'
import { CommentForm } from './CommentForm'
import { CommentList } from './CommentList'
import { Avatar } from './Avatar'

const useStyle = makeStyles({
  card: {
    backgroundColor: colors.grey[500],
    padding: '1%',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  button: {
    textTransform: 'none',
  },
  expand: {
    marginLeft: 'auto',
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

  const { authenticated } = useAuth()

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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }
  const closeMenu = () => {
    setAnchorEl(null)
  }

  const [expandComment, setExpandComment] = useState<boolean>(false)

  const handleExpandCommnet = () => {
    setExpandComment((prev) => !prev)
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        title={<Typography variant="h5">{post.title}</Typography>}
        subheader={<SubHeader createdAt={post.createdAt} owner={post.owner} />}
        avatar={<Avatar username={post.owner} size={50} />}
        action={
          isOwner ? (
            <React.Fragment>
              <IconButton onClick={openMenu}>
                <MoreVertIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={closeMenu}>
                <MenuItem onClick={onDelete}>
                  <DeleteIcon />
                  DELETE
                </MenuItem>
              </Menu>
            </React.Fragment>
          ) : (
            <React.Fragment />
          )
        }
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
      </CardContent>
      <CardActions>
        <div className={classes.expand}>
          {expandComment ? 'Close' : 'Comment'}
          <IconButton onClick={handleExpandCommnet}>
            {expandComment ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </div>
      </CardActions>
      <Collapse in={expandComment} timeout="auto" unmountOnExit>
        <CardContent>
          <CommentList comments={post.comments} />
          {authenticated && <CommentForm postID={post.id} />}
        </CardContent>
      </Collapse>
    </Card>
  )
}

type SubHeaderProps = {
  createdAt: string
  owner: string
}

const SubHeader: React.FC<SubHeaderProps> = ({ createdAt, owner }) => {
  const calcDiff = (timestamp: string) => {
    const now = dayjs()
    const time = dayjs(timestamp)

    const scales: OpUnitType[] = ['y', 'M', 'w', 'd', 'h', 'm', 's']

    for (const scale of scales) {
      const diff = now.diff(time, scale)
      if (diff > 0) return diff + scale
    }

    return '0s'
  }

  const calcTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
  }

  const diffTimeHeader = calcDiff(createdAt)
  const timeHeader = calcTime(createdAt)
  const [timestamp, setTimeStamp] = useState<string>(diffTimeHeader)

  const hoverTimeStamp = () => {
    setTimeStamp(timeHeader)
  }

  const leaveTimeStame = () => {
    setTimeStamp(diffTimeHeader)
  }

  const ownerString = `@${owner} - `

  return (
    <Typography variant="body2" color="textSecondary">
      {ownerString}
      <span onMouseEnter={hoverTimeStamp} onMouseLeave={leaveTimeStame}>
        {timestamp}
      </span>
    </Typography>
  )
}
