import React, { useState } from 'react'
import Link from 'next/link'
import { useRecoilValue } from 'recoil'
import { postSelector } from '../state/apiState'
import * as APIt from '../API'
import * as query from '../graphql/queries'
import * as mutation from '../graphql/mutations'
import { gqlMutation, gqlQuery } from '../utils/graphql'
import { useAuth } from '../utils/auth'
import dayjs, { OpUnitType } from 'dayjs'
import ReactMarkdown from 'react-markdown'
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  colors,
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
} from '@mui/icons-material'
import { Codes } from './Codes'
import { Comments } from './Comments'
import { CommentForm } from './CommentForm'
import { Avatar } from './Avatar'
import { notNull } from '../utils/nullable'

const useStyle = makeStyles({
  card: {
    backgroundColor: colors.grey[500],
    padding: '1%',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  expand: {
    marginLeft: 'auto',
  },
})

type Props = {
  postID: string
}

export const Post: React.FC<Props> = ({ postID }) => {
  const post = useRecoilValue(postSelector(postID))
  const { authenticated, user } = useAuth()

  const deletePost = async () => {
    if (!authenticated) return

    const res = await gqlQuery<APIt.GetPostQueryVariables, APIt.GetPostQuery>({
      query: query.getPost,
      variables: {
        id: postID,
      },
    })

    const codeIds =
      res.data?.getPost?.codes?.items?.filter(notNull).map((v) => v.id) ?? []

    codeIds.forEach(async (id) => {
      gqlMutation<APIt.DeleteCodeMutationVariables>({
        query: mutation.deleteCode,
        variables: {
          input: {
            id: id,
          },
        },
      })
    })

    await gqlMutation<APIt.DeletePostMutationVariables>({
      query: mutation.deletePost,
      variables: {
        input: {
          id: postID,
        },
      },
    })
  }

  const onClick = async () => {
    if (window.confirm('Are you sure you want to delete it?')) {
      deletePost()
    }
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

  const classes = useStyle()

  return !post ? (
    <React.Fragment />
  ) : (
    <Card className={classes.card}>
      <CardHeader
        title={
          <Link href={`/posts/${post.owner}/${post.id}`}>
            <a>
              <Typography variant="h5">{post.title}</Typography>
            </a>
          </Link>
        }
        subheader={
          <SubHeader createdAt={post.createdAt} owner={post.owner ?? ''} />
        }
        avatar={
          <Link href={`/posts/${post.owner}`}>
            <IconButton size="small">
              <Avatar username={post.owner ?? ''} size={50} />
            </IconButton>
          </Link>
        }
        action={
          user?.username === post.owner ? (
            <React.Fragment>
              <IconButton onClick={openMenu}>
                <MoreVertIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={closeMenu}>
                <MenuItem onClick={onClick}>
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
        <Codes postID={post.id} />
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
          <Comments postID={post.id} />
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
